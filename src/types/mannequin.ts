import { Buffer } from 'buffer/';
import { parseItem } from './item';

export function parseMannequin(buffer: Buffer) {
  return {
    hat: parseItem(buffer.subarray(0x00000, 0x00004) as Buffer),
    accessory: parseItem(buffer.subarray(0x00004, 0x00008) as Buffer),
    topWear: parseItem(buffer.subarray(0x00008, 0x0000c) as Buffer),
    bottomWear: parseItem(buffer.subarray(0x0000c, 0x00010) as Buffer),
    socks: parseItem(buffer.subarray(0x00010, 0x00014) as Buffer),
    shoes: parseItem(buffer.subarray(0x00014, 0x00018) as Buffer),
  };
}
