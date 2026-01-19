import { Buffer } from 'buffer/';

export function parseTownId(buffer: Buffer) {
  return {
    id: buffer.readUInt16LE(0x00000),
    name: buffer.toString('utf16le', 0x00002, 0x00014),
    unknown0x14: buffer.readUInt8(0x00014),
    unknown0x15: buffer.readUInt8(0x00015),
  };
}
