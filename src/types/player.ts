import { Buffer } from 'buffer/';
import { parseItem } from './item';
import { parsePattern } from './pattern';
import { parseMiiData } from './miidata';
import { parseMannequin } from './mannequin';
import { parsePersonalId } from './personalid';
import { parsePlayerBadges } from './playerbadges';
import { parseHhaHouseInfo } from './hhahouseinfo';
import { parseDreamAddress } from './dreamaddress';
import { parseLetter } from './letter';
import { parseEncryptedValue } from './encryptedvalue';
import { parseTownId } from './townid';

// See https://github.com/Le0X8/acnl-research/blob/main/binaries/garden_plus.dat.md#player
export function parsePlayer(buffer: Buffer) {
  return {
    crc32: buffer.readUInt32LE(0x00000),
    hairStyle: buffer.readUInt8(0x00004),
    hairColor: buffer.readUInt8(0x00005),
    face: buffer.readUInt8(0x00006),
    eyeColor: buffer.readUInt8(0x00007),
    tan: buffer.readUInt16LE(0x00008),
    hat: parseItem(buffer.subarray(0x0000a, 0x0000e) as Buffer),
    accessory: parseItem(buffer.subarray(0x0000e, 0x00012) as Buffer),
    topWear: parseItem(buffer.subarray(0x00012, 0x00016) as Buffer),
    underTopWear: parseItem(buffer.subarray(0x00016, 0x0001a) as Buffer),
    bottomWear: parseItem(buffer.subarray(0x0001a, 0x0001e) as Buffer),
    socks: parseItem(buffer.subarray(0x0001e, 0x00022) as Buffer),
    shoes: parseItem(buffer.subarray(0x00022, 0x00026) as Buffer),
    equippedItem: parseItem(buffer.subarray(0x00026, 0x0002a) as Buffer),
    unknown0x0002a: buffer.readUInt8(0x0002a),
    padding0x0002b: buffer.readUInt8(0x0002b),
    patterns: Array.from({ length: 10 }, (_, i) =>
      parsePattern(
        buffer.subarray(
          0x0002c + i * 0x870,
          0x0002c + (i + 1) * 0x870,
        ) as Buffer,
      ),
    ),
    patternOrder: Array.from(buffer.subarray(0x0548c, 0x05496)),
    padding0x05496: buffer.readUInt16LE(0x05496),
    miiData: parseMiiData(buffer.subarray(0x05498, 0x05540) as Buffer),
    hasMii: buffer.readUInt8(0x05540),
    unknown0x05541: buffer.readUInt8(0x05541),
    unknown0x05542: buffer.readUInt16LE(0x05542),
    mannequins: Array.from({ length: 4 }, (_, i) =>
      parseMannequin(
        buffer.subarray(0x05544 + i * 0x18, 0x05544 + (i + 1) * 0x18) as Buffer,
      ),
    ),
    padding0x055a4: buffer.readUInt16LE(0x055a4),
    personalId: parsePersonalId(buffer.subarray(0x055a6, 0x055d4) as Buffer),
    birthMonth: buffer.readUInt8(0x055d4),
    birthDay: buffer.readUInt8(0x055d5),
    registrationYear: buffer.readUInt16LE(0x055d6),
    registrationMonth: buffer.readUInt8(0x055d8),
    registrationDay: buffer.readUInt8(0x055d9),
    padding0x055da: buffer.readUInt16LE(0x055da),
    playerBadges: parsePlayerBadges(
      buffer.subarray(0x055dc, 0x056c4) as Buffer,
    ),
    hhaHouseInfo: parseHhaHouseInfo(
      buffer.subarray(0x056c4, 0x056f0) as Buffer,
    ),
    dreamAddress: parseDreamAddress(
      buffer.subarray(0x056f0, 0x056fc) as Buffer,
    ),
    padding0x056fc: buffer.readUInt32LE(0x056fc),
    unknown0x05700: Array.from(buffer.subarray(0x05700, 0x05734)),
    hasTpcPic: buffer.readUInt32LE(0x05734),
    tpcPic: Array.from(buffer.subarray(0x05738, 0x06b38)),
    tpcText: buffer.toString('utf16le', 0x06b38, 0x06b7a),
    unknown0x06b7a: buffer.readUInt8(0x06b7a),
    unknown0x06b7b: buffer.readUInt8(0x06b7b),
    unknown0x06b7c: buffer.readUInt32LE(0x06b7c),
    unknown0x06b80: buffer.readUInt32LE(0x06b80),
    padding0x06b84: buffer.readUInt32LE(0x06b84),
    crc32_2: buffer.readUInt32LE(0x06b88),
    bank: parseEncryptedValue(buffer.subarray(0x06b8c, 0x06b94) as Buffer),
    debt: parseEncryptedValue(buffer.subarray(0x06b94, 0x06b9c) as Buffer),
    medals: parseEncryptedValue(buffer.subarray(0x06b9c, 0x06ba4) as Buffer),
    bellsFromReese: parseEncryptedValue(
      buffer.subarray(0x06ba4, 0x06bac) as Buffer,
    ),
    padding0x06ba4: buffer.readUInt32LE(0x06bac),
    playtime: [buffer.readUInt32LE(0x06bb0), buffer.readUInt32LE(0x06bb4)],
    townId: parseTownId(buffer.subarray(0x06bb8, 0x06bce) as Buffer),
    padding0x06bc6: buffer.readUInt16LE(0x06bce),
    inventory: Array.from({ length: 16 }, (_, i) =>
      parseItem(
        buffer.subarray(0x06bd0 + i * 0x04, 0x06bd0 + (i + 1) * 0x04) as Buffer,
      ),
    ),
    inventoryLocks: Array.from(buffer.subarray(0x06c10, 0x06c20)),
    unlockedItems: Array.from(buffer.subarray(0x06c20, 0x06f08)),
    wallet: parseEncryptedValue(buffer.subarray(0x06f08, 0x06f10) as Buffer),
    islandBox: Array.from({ length: 40 }, (_, i) =>
      parseItem(
        buffer.subarray(0x06f10 + i * 0x04, 0x06f10 + (i + 1) * 0x04) as Buffer,
      ),
    ),
    islandInventory: Array.from({ length: 16 }, (_, i) =>
      parseItem(
        buffer.subarray(0x06fb0 + i * 0x04, 0x06fb0 + (i + 1) * 0x04) as Buffer,
      ),
    ),
    unknown0x06ff0: Array.from(buffer.subarray(0x06ff0, 0x07000)),
    unknown0x07000: parseItem(buffer.subarray(0x07000, 0x07004) as Buffer),
    unknown0x07004: parseItem(buffer.subarray(0x07004, 0x07008) as Buffer),
    playerLetters: Array.from({ length: 10 }, (_, i) =>
      parseLetter(
        buffer.subarray(
          0x07008 + i * 0x280,
          0x07008 + (i + 1) * 0x280,
        ) as Buffer,
      ),
    ),
    lastLetterHeader: buffer.toString('utf16le', 0x08908, 0x08948),
    padding0x08948: buffer.readUInt16LE(0x08948),
    lastFutureMe: buffer.toString('utf16le', 0x0894a, 0x0898a),
    padding0x0898a: buffer.readUInt16LE(0x0898a),
    lastLetterFooter: buffer.toString('utf16le', 0x0898c, 0x089cc),
    lastReceiverPos: buffer.readUInt8(0x089ce),
    lastFutureMePos: buffer.readUInt8(0x089cf),
    emotes: Array.from(buffer.subarray(0x089d0, 0x089f8)),
    emotePage: buffer.readInt8(0x089f8),
    padding0x089f9: buffer.readUInt8(0x089f9),
    unknown0x089fa: Array.from({ length: 32 }, (_, i) =>
      buffer.readUInt16LE(0x089fa + i * 0x02),
    ),
    padding0x08a3a: buffer.readUInt16LE(0x08a3a),
    unknown0x08a3c: Array.from(buffer.subarray(0x08a3c, 0x08a3c + 0x80)),
    padding0x08abc: buffer.readUInt16LE(0x08abc),
    lyleFlags: buffer.readUInt8(0x08abe),
    unknown0x08abf: Array.from(buffer.subarray(0x08abf, 0x08d1c)),
    meowCoupons: parseEncryptedValue(
      buffer.subarray(0x08d1c, 0x08d24) as Buffer,
    ),
    unknown0x08d24: parseEncryptedValue(
      buffer.subarray(0x08d24, 0x08d2c) as Buffer,
    ),
    unknown0x08d2c: parseEncryptedValue(
      buffer.subarray(0x08d2c, 0x08d34) as Buffer,
    ),
    unknown0x08d34: parseEncryptedValue(
      buffer.subarray(0x08d34, 0x08d3c) as Buffer,
    ),
    unknown0x08d3c: parseEncryptedValue(
      buffer.subarray(0x08d3c, 0x08d44) as Buffer,
    ),
    unknown0x08d44: parseEncryptedValue(
      buffer.subarray(0x08d44, 0x08d4c) as Buffer,
    ),
    unknown0x08d4c: Array.from(buffer.subarray(0x08d4c, 0x08f08)),
    santaBag: Array.from({ length: 10 }, (_, i) =>
      parseItem(
        buffer.subarray(0x08fa8 + i * 0x4, 0x08fa8 + (i + 1) * 0x4) as Buffer,
      ),
    ),
    unknown0x08fd0: Array.from(buffer.subarray(0x08fd0, 0x08fd0 + 0x320)),
    dressers: Array.from({ length: 180 }, (_, i) =>
      parseItem(
        buffer.subarray(0x092f0 + i * 0x4, 0x092f0 + (i + 1) * 0x4) as Buffer,
      ),
    ),
    birthdayWish: buffer.toString('utf16le', 0x095c0, 0x09604),
    unknown0x09604: Array.from({ length: 5 }, (_, i) =>
      parseLetter(
        buffer.subarray(
          0x09604 + i * 0x280,
          0x09604 + (i + 1) * 0x280,
        ) as Buffer,
      ),
    ),
    unknown0x0a284: Array.from(buffer.subarray(0x0a284, 0x0a284 + 0x1fc)),
  };
}
