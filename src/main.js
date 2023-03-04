module.exports = {
    editor: {
        Garden: require('./editor/savegame/garden'),
        GardenPlus: require('./editor/savegame/garden-plus')
    },
    dataType: {
        Item: require('./datatype/item'),
        Pattern: require('./datatype/pattern'),
        playtime: require('./datatype/playtime'),
        checksum: require('./datatype/checksum'),
        encrypted: require('./datatype/encrypted'),
    }
};
