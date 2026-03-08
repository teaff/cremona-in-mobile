import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPublicEvents, Event } from '@/services/events';
import { supabase } from '@/utils/supabase';

export const usePublicEvents = () => {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchPublicEvents,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  // Realtime subscription
  useEffect(() => {
    console.log('🔌 Setting up Supabase Realtime subscription for events...');
    const channel = supabase
      .channel('public:events_feed')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'events',
        },
        (payload) => {
          console.log('⚡️ Realtime change detected:', payload);
          // Invalidate cache to trigger refetch
          queryClient.invalidateQueries({ queryKey: ['events'] });
        }
      )
      .subscribe((status, err) => {
        console.log('🔌 Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Successfully subscribed to events changes');
        }
        if (status === 'CHANNEL_ERROR') {
          console.log('⚠️ Realtime channel error:', err || 'Unknown error');
        }
        if (status === 'TIMED_OUT') {
          console.log('⚠️ Realtime subscription timed out');
        }
      });

    return () => {
      console.log('🔌 Unsubscribing from events feed...');
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { events, loading, error, refetch };
};
