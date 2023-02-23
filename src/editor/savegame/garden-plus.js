const OFFSETS = require('../../consts/offsets/garden-plus');
const playtime = require('../../datatype/playtime');
const Item = require('../../datatype/item');
class GardenPlus {
    _binaries;
    town = {};

    /**
     * Creates a new garden_plus.dat editor
     * @param {Buffer} savegame - The garden_plus.dat as NodeBuffer
     * @param {Object} [config] - Configuration of the editor
     * @returns {GardenPlus} A garden_plus.dat editor
     */
    constructor (savegame, config) {
        this.town = {
            treeSize: savegame.readUInt8(OFFSETS.TOWN_TREESIZE),
            playtime: playtime.get(savegame.readUintLE(OFFSETS.TOWN_PLAYTIME, 4)),
            fruit: new Item(savegame.readUintLE(OFFSETS.TOWN_NATIVEFRUIT, 2))
        };
    }
    
};
module.exports = GardenPlus;