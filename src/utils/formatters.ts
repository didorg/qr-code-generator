import { ContactInfo } from '../types/qr-types';

export const formatUrl = (url: string): string => {
  if (!url.trim()) return '';

  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
};

export const generateVCard = (contact: ContactInfo): string => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
  return vcard;
};

export const hasContactData = (contact: ContactInfo): boolean => {
  return !!(
    contact.firstName ||
    contact.lastName ||
    contact.phone ||
    contact.email
  );
};
