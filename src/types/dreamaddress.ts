import { Buffer } from 'buffer/';

export function parseDreamAddress(buffer: Buffer) {
  return {
    dreamCode1: buffer.readUInt32LE(0x00000),
    dreamCode2: buffer.readUInt32LE(0x00004),
    unknown0x0008: buffer.readUInt8(0x00008),
    dreamCode3: buffer.readUInt8(0x00009),
    padding0x000a: buffer.readUInt16LE(0x0000a),
  };
}
