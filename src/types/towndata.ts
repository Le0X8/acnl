import { Buffer } from 'buffer/';

export function parseTownData(buffer: Buffer) {
  return {
    unknown0x00000: Array.from(buffer.subarray(0x00000, 0x028f4)),
  };
}
