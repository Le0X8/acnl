import { parseItem } from './item';

export function parseMannequin(buffer: Buffer) {
  return {
    hat: parseItem(buffer.subarray(0x00000, 0x00004)),
    accessory: parseItem(buffer.subarray(0x00004, 0x00008)),
    topWear: parseItem(buffer.subarray(0x00008, 0x0000c)),
    bottomWear: parseItem(buffer.subarray(0x0000c, 0x00010)),
    socks: parseItem(buffer.subarray(0x00010, 0x00014)),
    shoes: parseItem(buffer.subarray(0x00014, 0x00018)),
  };
}
