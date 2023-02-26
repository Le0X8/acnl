class Pattern {
    title = '';

    /**
     * This class can be used to parse PATTERN binaries and convert them back
     * @param {Buffer} buf - The PATTERN binary
     */
    constructor(buf) {
        this._binary = buf;
        for (var i = 0; i < 42; i++) {
            if (buf.readUint8(i) != 0) this.title += String.fromCharCode(buf.readUint16LE(i));
        };
    }
};
module.exports = Pattern;