"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

interface TelegramContextType {
  webApp: any | null;
  user: any | null;
  isTelegramApp: boolean;
  haptic: {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    success: () => void;
    warning: () => void;
    error: () => void;
    selection: () => void;
  };
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isTelegramApp: false,
  haptic: {
    impact: () => {},
    success: () => {},
    warning: () => {},
    error: () => {},
    selection: () => {},
  }
});

export const useTelegram = () => useContext(TelegramContext);

// Helper to convert HEX to HSL values for Tailwind CSS (format: "H S% L%")
function hexToHslString(hex: string): string {
  if (!hex) return "";
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const app = window.Telegram.WebApp;
      app.ready();
      app.expand();
      setWebApp(app);

      if (app.initDataUnsafe && app.initDataUnsafe.user) {
        setUser(app.initDataUnsafe.user);
      }

      // 1. Theme Colors injection to CSS variables
      if (app.themeParams) {
        const root = document.documentElement;
        if (app.themeParams.bg_color) {
          root.style.setProperty('--background', hexToHslString(app.themeParams.bg_color));
          root.style.setProperty('--card', hexToHslString(app.themeParams.bg_color));
        }
        if (app.themeParams.text_color) {
          root.style.setProperty('--foreground', hexToHslString(app.themeParams.text_color));
          root.style.setProperty('--card-foreground', hexToHslString(app.themeParams.text_color));
        }
        if (app.themeParams.button_color) {
          root.style.setProperty('--primary', hexToHslString(app.themeParams.button_color));
        }
        if (app.themeParams.button_text_color) {
          root.style.setProperty('--primary-foreground', hexToHslString(app.themeParams.button_text_color));
        }
        if (app.themeParams.secondary_bg_color) {
          root.style.setProperty('--secondary', hexToHslString(app.themeParams.secondary_bg_color));
          root.style.setProperty('--muted', hexToHslString(app.themeParams.secondary_bg_color));
        }
      }
    }
  }, []);

  // 2. Native Back Button Routing
  useEffect(() => {
    if (webApp && webApp.BackButton) {
      // Show back button only if we are deep in the app (e.g. not root and not main dashboard)
      const isRootOrMainDashboard = pathname === '/' || pathname === '/en/login' || pathname === '/en/dashboard/student';
      
      if (!isRootOrMainDashboard) {
        webApp.BackButton.show();
      } else {
        webApp.BackButton.hide();
      }

      const handleBack = () => router.back();
      webApp.BackButton.onClick(handleBack);
      
      return () => {
        webApp.BackButton.offClick(handleBack);
      };
    }
  }, [pathname, webApp, router]);

  const haptic = {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
      webApp?.HapticFeedback?.impactOccurred(style);
    },
    success: () => {
      webApp?.HapticFeedback?.notificationOccurred('success');
    },
    warning: () => {
      webApp?.HapticFeedback?.notificationOccurred('warning');
    },
    error: () => {
      webApp?.HapticFeedback?.notificationOccurred('error');
    },
    selection: () => {
      webApp?.HapticFeedback?.selectionChanged();
    }
  };

  return (
    <TelegramContext.Provider value={{ webApp, user, isTelegramApp: !!webApp?.initData, haptic }}>
      {children}
    </TelegramContext.Provider>
  );
}
