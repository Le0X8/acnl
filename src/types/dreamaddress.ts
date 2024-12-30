export function parseDreamAddress(buffer: Buffer) {
  return {
    dreamCode1: buffer.readUint32LE(0x00000),
    dreamCode2: buffer.readUint32LE(0x00004),
    unknown0x0008: buffer.readUint8(0x00008),
    dreamCode3: buffer.readUint8(0x00009),
    padding0x000a: buffer.readUint16LE(0x0000a),
  };
}
