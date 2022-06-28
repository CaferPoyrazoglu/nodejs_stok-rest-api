const mongoose = require("mongoose");

const altUrunlerSchema = mongoose.Schema({
    "marka": {
        "type": "String"
    },
    "urunAd": {
        "type": "String"
    },
    "barkod": {
        "type": "String"
    },
    "stok": {
        "type": "Number"
    }
});

const urunlerSchema = mongoose.Schema({
    "urunler": [altUrunlerSchema]
});


module.exports = mongoose.model('urunlers', urunlerSchema, "urunler");