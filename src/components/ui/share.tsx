import { Button, ButtonProps } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Share as LucideShare } from 'lucide-react-native';
import React from 'react';
import { Share, View } from 'react-native';

export interface ShareButtonProps extends Omit<ButtonProps, 'onPress'> {
  content: {
    message: string;
    url?: string;
    title?: string;
  };
  onShareError?: (error: any) => void;
  onShareSuccess?: () => void;
}

export function ShareButton({
  content,
  children,
  onShareError,
  onShareSuccess,
  ...props
}: ShareButtonProps) {
  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          message: content.message + (content.url ? `\n\n${content.url}` : ''),
          url: content.url, // iOS only
          title: content.title, // Android only
        },
        {
          dialogTitle: content.title, // Android only
          subject: content.title, // iOS only
        },
      );

      if (result.action === Share.sharedAction) {
        onShareSuccess?.();
      }
    } catch (error: any) {
      onShareError?.(error);
    }
  };

  return (
    <Button onPress={handleShare} {...props}>
      {children || (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <LucideShare size={20} color="currentColor" />
          <Text>Share</Text>
        </View>
      )}
    </Button>
  );
}
