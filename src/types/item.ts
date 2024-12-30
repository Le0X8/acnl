export function parseItem(buffer: Buffer) {
  return {
    id: buffer.readUint16LE(0x00000),
    flag1: buffer.readUint8(0x00002),
    flag2: buffer.readUint8(0x00003),
  };
}