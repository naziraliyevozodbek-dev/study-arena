"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Extend window object for Telegram
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
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isTelegramApp: false,
});

export const useTelegram = () => useContext(TelegramContext);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check if running inside Telegram Web App
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const app = window.Telegram.WebApp;
      app.ready();
      app.expand(); // Expand to full screen
      setWebApp(app);

      // Telegram sets initDataUnsafe with user info if running in a bot
      if (app.initDataUnsafe && app.initDataUnsafe.user) {
        setUser(app.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp, user, isTelegramApp: !!webApp?.initData }}>
      {children}
    </TelegramContext.Provider>
  );
}
