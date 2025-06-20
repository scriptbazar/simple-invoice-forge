
import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidth?: boolean;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidth = false,
  responsive = true,
  style = {},
  className = ''
}) => {
  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Push ad to AdSense queue
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Generic Ad Network Component for other networks
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
  useEffect(() => {
    // Load network-specific scripts
    switch (network) {
      case 'media.net':
        if (!document.querySelector('script[src*="media.net"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://contextual.media.net/dmedianet.js?cid=8CU2W4S2Q';
          document.head.appendChild(script);
        }
        break;
      case 'propeller':
        if (!document.querySelector('script[src*="propellerads"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.propellerads.com/js/link.js';
          document.head.appendChild(script);
        }
        break;
    }
  }, [network]);

  if (network === 'custom' && adCode) {
    return (
      <div 
        className={`ad-container ${className}`}
        style={{ width, height, ...style }}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    );
  }

  return (
    <div 
      className={`ad-container ${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600`}
      style={{ width, height, ...style }}
    >
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">{network.toUpperCase()} Ad</p>
        <p className="text-xs">{width} x {height}</p>
      </div>
    </div>
  );
};

// Ad placement hook for managing ad positions
export const useAdPlacements = () => {
  const placements = {
    header: 'ca-pub-XXXXXXXXXX_header',
    sidebar: 'ca-pub-XXXXXXXXXX_sidebar',
    footer: 'ca-pub-XXXXXXXXXX_footer',
    article: 'ca-pub-XXXXXXXXXX_article',
    mobile: 'ca-pub-XXXXXXXXXX_mobile'
  };

  return placements;
};

// Declare global types for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
