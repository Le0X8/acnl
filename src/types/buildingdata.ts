import { Buffer } from 'buffer/';
import { parseBuilding } from './building';
import { parseDesignStandPattern } from './designstandpattern';

export function parseBuildingData(buffer: Buffer) {
  return {
    crc32: buffer.readUInt32LE(0x00000),
    normalBuildingCount: buffer.readUInt8(0x00004),
    eventBuildingCount: buffer.readUInt8(0x00005),
    townTreeSize: buffer.readUInt8(0x00006),
    padding0x00007: buffer.readUInt8(0x00007),
    buildings: Array.from({ length: 56 }, (_, i) =>
      parseBuilding(
        buffer.subarray(0x00008 + i * 4, 0x000e8 + i * 4) as Buffer,
      ),
    ),
    eventBuildings: Array.from({ length: 2 }, (_, i) =>
      parseBuilding(
        buffer.subarray(0x000e8 + i * 4, 0x000f0 + i * 4) as Buffer,
      ),
    ),
    designStandPatterns: Array.from({ length: 8 }, (_, i) =>
      parseDesignStandPattern(
        buffer.subarray(0x000f0 + i * 0x787, 0x044b0 + i * 0x787) as Buffer,
      ),
    ),
    unlockedBuildings: Array.from(buffer.subarray(0x044b0, 0x044bc) as Buffer),
  };
}
