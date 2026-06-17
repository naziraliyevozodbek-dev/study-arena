"use client";

import { useEffect, useRef, useState } from "react";
import { useTelegram } from "./TelegramProvider";
import { Button } from "@/components/ui/button";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
}

interface TelegramLoginProps {
  botName: string;
  onAuth: (user: TelegramUser) => void;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: "write" | "read";
  usePic?: boolean;
}

export function TelegramLogin({
  botName,
  onAuth,
  buttonSize = "large",
  cornerRadius = 16,
  requestAccess = "write",
  usePic = true,
}: TelegramLoginProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isTelegramApp, webApp, user } = useTelegram();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we are inside Telegram Mini App, we auto-authenticate
    if (isTelegramApp && webApp?.initData) {
      setLoading(true);
      fetch('/api/auth/twa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: webApp.initData })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && user) {
          onAuth({ ...user, auth_date: Math.floor(Date.now() / 1000) });
        } else {
          // Fallback if TWA validation fails for some reason
          console.error("TWA Auth failed", data.error);
        }
      })
      .catch(err => console.error("TWA Auth request failed", err))
      .finally(() => setLoading(false));
      return;
    }

    // If outside Telegram, render the standard Login Widget
    if (!containerRef.current || isTelegramApp) return;

    (window as any).onTelegramAuth = (authUser: TelegramUser) => {
      onAuth(authUser);
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", cornerRadius.toString());
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-userpic", usePic.toString());
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && script.parentNode) {
        containerRef.current.removeChild(script);
      }
      delete (window as any).onTelegramAuth;
    };
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, onAuth, isTelegramApp, webApp, user]);

  if (isTelegramApp) {
    return (
      <div className="flex flex-col items-center gap-4">
        {loading ? (
          <p className="text-muted-foreground animate-pulse">Authenticating securely inside Telegram...</p>
        ) : (
          <Button disabled className="gamified-btn-primary">
            Logged in via Telegram Web App
          </Button>
        )}
      </div>
    );
  }

  return <div ref={containerRef} className="flex justify-center min-h-[40px]" />;
}
