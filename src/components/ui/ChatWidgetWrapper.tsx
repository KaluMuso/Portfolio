"use client";

import dynamic from 'next/dynamic';

export const ChatWidget = dynamic(
  () => import('@/components/ui/ChatWidget').then(m => ({ default: m.ChatWidget })),
  { ssr: false }
);
