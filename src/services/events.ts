import { supabase } from '@/utils/supabase';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  image_path?: string;
  price?: number;
  drink_included?: boolean;
  category?: string;
  created_at: string;
}

export const fetchPublicEvents = async () => {
  try {
    // La funzione accetta solo GET.
    // Dobbiamo specificare method: 'GET' e NON passare alcun body.
    
    const { data, error } = await supabase.functions.invoke('public-events-app', {
      method: 'GET',
    });

    if (error) {
      console.error('Error fetching public events:', error);
      throw error;
    }
    // La edge function ritorna { events: [...] }
    return (data?.events || []) as Event[];
  } catch (error) {
    console.error('Unexpected error fetching public events:', error);
    throw error;
  }
};
