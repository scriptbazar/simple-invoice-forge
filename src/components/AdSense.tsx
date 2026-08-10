import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidth?: boolean;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  adClient?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  responsive = true,
  style = {},
  className = '',
  adClient = ''
}) => {
  useEffect(() => {
    // Only attempt AdSense injection if a real valid client ID is provided
    if (!adClient || adClient.includes('XXXXXXXXXX')) return;

    try {
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adClient]);

  // Hide container completely when no valid AdSense client ID is set
  if (!adClient || adClient.includes('XXXXXXXXXX')) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

interface GenericAdProps {
  network: 'media.net' | 'propeller' | 'adsense' | 'custom';
  adCode?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GenericAd: React.FC<GenericAdProps> = ({
  network,
  adCode,
  width = 300,
  height = 250,
  className = '',
  style = {}
}) => {
  if (network === 'custom' && adCode) {
    return (
      <div 
        className={`ad-container ${className}`}
        style={{ width, height, ...style }}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    );
  }

  // Hide placeholder ads in production unless explicitly custom
  return null;
};

// Global types for AdSense
declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}
