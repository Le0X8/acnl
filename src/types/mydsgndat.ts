import { Buffer } from 'buffer/';

export function parseMydsgnDat(buffer: Buffer) {
  return {
    crc32: buffer.readUInt32LE(0x000000),
    patterns: Array.from({ length: 72 }, (_, i) => buffer.subarray(0x000004 + i * 0x00870, 0x000004 + (i + 1) * 0x00870)),
    padding: buffer.subarray(0x25f84, 0x25f84 + 0x0000c),
  }
};