import { Buffer } from 'buffer/';
import { parseEncryptedValue } from './encryptedvalue';

export function parsePlayerBadges(buffer: Buffer) {
  return {
    badgeValues: Array.from({ length: 24 }, (_, i) => parseEncryptedValue(buffer.subarray(i * 8, 8 + i * 8))),
    badges: Array.from(buffer.subarray(0x000c0, 0x000d8)),
    unknown0x000d8: parseEncryptedValue(buffer.subarray(0x000d8, 0x000e0)),
    unknown0x000e0: parseEncryptedValue(buffer.subarray(0x000e0, 0x000e8)),
  };
}