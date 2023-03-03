const OFFSETS = require('../../consts/offsets/garden-plus');
const playtime = require('../../datatype/playtime');
const Item = require('../../datatype/item');
const Pattern = require('../../datatype/pattern');
const updateChecksums = require('../../datatype/checksum');
class GardenPlus {
    _binaries;
    _cfg = {};

    /**
     * Creates a new garden_plus.dat editor
     * @param {Buffer} savegame - The garden_plus.dat as NodeBuffer
     * @param {Object} [config] - Configuration of the editor
     * @returns {GardenPlus} A garden_plus.dat editor
     */
    constructor (savegame, config) {
        this._binaries = savegame;
        this._cfg = config ? config : this._cfg;

        this.secureValue = '0x';
        for (var i = 0; i < 8; i++) {
            this.secureValue += this._binaries.readUInt8(OFFSETS.SVH_SECURE_VALUE + i).toString(16);
        };
        this.secureValue = BigInt(this.secureValue);
        this.saveInitalised = this._binaries.readUInt32LE(OFFSETS.SVH_SAVE_INITALISED);
        
        this.saveHeaderChecksum = this._binaries.readUInt32LE(OFFSETS.ASH_HEADER_CHECKSUM);
        this.saveVerifier1 = this._binaries.readUInt16LE(OFFSETS.ASH_SAVE_VERIFIER_1);
        this.saveVerifier2 = this._binaries.readUInt8(OFFSETS.ASH_SAVE_VERIFIER_2);

        this.player1Checksum = this._binaries.readUInt32LE(OFFSETS.PLAYERS);
        this.player1HairStyle = this._binaries.readUInt8(OFFSETS.PLAYERS + OFFSETS.PLAYER_HAIRSTYLE);
        this.player1HairColor = this._binaries.readUInt8(OFFSETS.PLAYERS + OFFSETS.PLAYER_HAIRCOLOR);
        this.player1Face = this._binaries.readUInt8(OFFSETS.PLAYERS + OFFSETS.PLAYER_FACE);
        this.player1EyeColor = this._binaries.readUInt8(OFFSETS.PLAYERS + OFFSETS.PLAYER_EYECOLOR);
        this.player1Tan = this._binaries.readUInt16LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_TAN);
        this.player1Hat = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_HAT));
        this.player1Accessory = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_ACCESSORY));
        this.player1TopWear = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_TOPWEAR));
        this.player1Wetsuit = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_WETSUIT));
        this.player1BottomWear = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_BOTTOMWEAR));
        this.player1Socks = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_SOCKS));
        this.player1Shoes = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_SHOES));
        this.player1HeldItem = new Item(this._binaries.readUint32LE(OFFSETS.PLAYERS + OFFSETS.PLAYER_HELDITEM));
        this.player1Pattern1 = '';
        for (var i = 0; i < 0x26b; i++) {
            this.player1Pattern1 += this._binaries.readUint8(OFFSETS.PLAYERS + OFFSETS.PLAYER_PATTERNS + i);
        }
        this.player1Pattern1 = new Pattern(Buffer.from(this.player1Pattern1, 'hex'));

        this.townTreeSize = this._binaries.readUInt8(OFFSETS.TOWN_TREESIZE);
        this.townPlaytime = playtime.get(this._binaries.readUintLE(OFFSETS.TOWN_PLAYTIME, 4));
        this.townFruit = new Item(this._binaries.readUint32LE(OFFSETS.TOWN_NATIVEFRUIT));
    }

    toBinary () { // TODO
        updateChecksums(this._binaries);
        return this._binaries;
    }

    getSavegameData () { // TODO
        return {
            players: [
                {
                    
                }
            ]
        };
    }
};
module.exports = GardenPlus;