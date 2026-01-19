import { Buffer } from 'buffer/';

export function parseHhaHouseInfo(buffer: Buffer) {
  return {
    hhaHousePoints: buffer.readInt32LE(0x00000),
    hhaItems: [
      buffer.readUInt16LE(0x00004),
      buffer.readUInt16LE(0x00006),
      buffer.readUInt16LE(0x00008),
      buffer.readUInt16LE(0x0000a),
      buffer.readUInt16LE(0x0000c),
    ],
    exteriorItem: buffer.readUInt16LE(0x0000e),
    interiorItem: buffer.readUInt16LE(0x00010),
    hhaItem: buffer.readUInt16LE(0x00012),
    currentHouseTheme: buffer.readUInt8(0x00014),
    evaluationType: buffer.readUInt8(0x00015),
    unknown0x00016: buffer.readUInt8(0x00016),
    unknown0x00017: buffer.readUInt8(0x00017),
    unknown0x00018: buffer.readUInt8(0x00018),
    unknown0x00019: buffer.readUInt8(0x00019),
    unknown0x0001a: buffer.readUInt8(0x0001a),
    unknown0x0001b: buffer.readUInt8(0x0001b),
    exteriorObeyingTheme: buffer.readUInt8(0x00021),
    interiorObeyingTheme: buffer.readUInt8(0x00022),
    impressiveFloor: buffer.readUInt8(0x00023),
    unknown0x00024: buffer.readUInt16LE(0x00024),
    futureAdvice: buffer.readUInt8(0x00026),
    hhaAwardsUnlocked: buffer.readUInt8(0x00027),
    hhaAwardsReceived: buffer.readUInt8(0x00028),
    goldExteriorsUnlocked: buffer.readUInt8(0x00029),
    goldExteriorsApplied: buffer.readUInt8(0x0002a),
    unknown0x0002b: buffer.readUInt8(0x0002b),
  };
}
