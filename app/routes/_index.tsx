import { json, type MetaFunction } from '@remix-run/cloudflare';
import { useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import UserPooling from '~/components/chat/UserPooling';
import OnlyDesktopMessage from '~/components/common/OnlyDesktopMessage';
import Footer from '~/components/footer/Footer.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'AImpact' },
    { name: 'description', content: 'Talk with AImpact, an AI assistant for generating web3 projects' },
  ];
};

export const loader = () => json({});

/**
 * Landing page component for Bolt
 * Note: Settings functionality should ONLY be accessed through the sidebar menu.
 * Do not add settings button/panel to this landing page as it was intentionally removed
 * to keep the UI clean and consistent with the design system.
 */
export default function Index() {
  const [isMobile, setIsMobile] = useState(false);
  const detectMobileScreen = () => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const mobile = detectMobileScreen();
    setIsMobile(mobile);
  }, [])
  
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <UserPooling />
      {isMobile && <OnlyDesktopMessage />}
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
