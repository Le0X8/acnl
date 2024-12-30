import { parsePersonalId } from './personalid';
import { parseItem } from './item';

export function parseLetter(buffer: Buffer) {
  return {
    receiver: parsePersonalId(buffer.subarray(0x00000, 0x0002e)),
    padding0x0002e: buffer.readUint16LE(0x0002e),
    unknown0x00030: buffer.readUint16LE(0x00030),
    padding0x00032: Array.from(buffer.subarray(0x00032, 0x00064)),
    unknown0x00064: buffer.readUint16LE(0x00064),
    padding0x00066: buffer.readUint16LE(0x00066),
    header: buffer.toString('utf16le', 0x00068, 0x000a8),
    padding0x000a8: buffer.readUint16LE(0x000a8),
    body: buffer.toString('utf16le', 0x000aa, 0x0022a),
    padding0x0022a: buffer.readUint16LE(0x0022a),
    footer: buffer.toString('utf16le', 0x0022c, 0x0026c),
    padding0x0026c: buffer.readUint16LE(0x0026c),
    receiverNamePos: buffer.readUint8(0x0026e),
    paperType: buffer.readUint8(0x0026f),
    unknown0x00270: buffer.readUint8(0x00270),
    unknown0x00271: buffer.readUint8(0x00271),
    type: buffer.readUint8(0x00272),
    unknown0x00273: buffer.readUint8(0x00273),
    present: parseItem(buffer.subarray(0x00274, 0x00278)),
    unknown0x00278: Array.from(buffer.subarray(0x00278, 0x00280)),
  };
};