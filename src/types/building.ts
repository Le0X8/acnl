import { Buffer } from 'buffer/';

export function parseBuilding(buffer: Buffer) {
  return {
    id: buffer.readUInt16LE(0x00000),
    x: buffer.readUInt8(0x00002),
    y: buffer.readUInt8(0x00003),
  };
}