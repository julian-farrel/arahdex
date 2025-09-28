// components/TradingViewWidget.tsx

import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "IDX:BBCA",
          "theme": "dark",
          "timezone": "Asia/Jakarta",
          "backgroundColor": "rgba(2, 1, 35, 0.41)",
          "gridColor": "rgba(225, 204, 204, 0.06)",
          "width": "100%",
          "height": "100%"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  // --- THIS IS THE PART TO CHANGE ---
  // Simplify the return to be only a single div.
  // The script will build everything it needs inside this one container.
  return (
    <div className="h-[625px]" ref={container} />
  );
};

export default memo(TradingViewWidget);