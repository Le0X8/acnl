import { Buffer } from 'buffer/';

export function parseMiiData(buffer: Buffer) {
  return {
    faceData: Array.from(buffer.subarray(0x00000, 0x0005c)),
    padding0x0005c: Array.from(buffer.subarray(0x0005c, 0x0005e)),
    faceDataCrc16: buffer.readUInt16LE(0x0005e),
    aesCcmMac: [
      buffer.readUInt32LE(0x00060),
      buffer.readUInt32LE(0x00064),
      buffer.readUInt32LE(0x00068),
      buffer.readUInt32LE(0x0006c),
    ],
    unknownData: Array.from(buffer.subarray(0x00070, 0x00088)),
    padding0x00088: Array.from(buffer.subarray(0x00088, 0x000a6)),
    padding0x000a6: buffer.readUInt16LE(0x000a6),
  };
}
