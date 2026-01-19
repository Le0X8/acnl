import { Buffer } from 'buffer/';

export function parseItem(buffer: Buffer) {
  return {
    id: buffer.readUInt16LE(0x00000),
    flag1: buffer.readUInt8(0x00002),
    flag2: buffer.readUInt8(0x00003),
  };
}
