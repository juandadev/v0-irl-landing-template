import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Simple obfuscation for usernames in URLs (base64 with a twist)
const OBFUSCATION_KEY = "v0gdl";

export function encryptUsername(username: string): string {
  if (!username) return "";
  // Add key prefix, encode to base64, then make URL-safe
  const combined = `${OBFUSCATION_KEY}:${username}`;
  const encoded = btoa(combined);
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decryptUsername(encrypted: string): string | null {
  if (!encrypted) return null;
  try {
    // Restore base64 padding and characters
    let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padding);
    
    const decoded = atob(base64);
    // Verify and extract username
    if (decoded.startsWith(`${OBFUSCATION_KEY}:`)) {
      return decoded.slice(OBFUSCATION_KEY.length + 1);
    }
    return null;
  } catch {
    return null;
  }
}

export const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}
