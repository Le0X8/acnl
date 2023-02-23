class Item {
    id = 0;
    flags = 0;

    /**
     * This class can be used to parse ITEM integers and convert them back
     * @param {Number} int - The ITEM integer
     */
    constructor(int) {
        var tmp = Buffer.from(new Uint32Array([int]).buffer);
        this.id = tmp.readUint16LE(0);
        this.flags = tmp.readUint16LE(1);
    }
};
module.exports = Item;