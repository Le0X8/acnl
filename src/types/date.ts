import { Buffer } from 'buffer/';

export function parseDate(data: Buffer) {
  return {
    year: data.readUInt16LE(0x00000),
    month: data.readUInt8(0x00002),
    day: data.readUInt8(0x00003),
  };
}
