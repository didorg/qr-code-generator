import { Link, MessageSquare, User } from 'lucide-react';
import { TabConfig } from '../types/qr-types';

export const TAB_CONFIGS: TabConfig[] = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Text', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: User },
];

export const DEFAULT_COLORS = {
  foreground: '#000000',
  background: '#ffffff',
};

export const QR_CONFIG = {
  size: 300,
  level: 'M' as const,
};
