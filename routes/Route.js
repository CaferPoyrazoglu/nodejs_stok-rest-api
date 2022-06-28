const express = require("express");
const router = express.Router();
const UrunlerModel = require("../models/UrunlerModel");


//TÜM HABERLERİ LİSTELER
router.get("/urunler", async (req, res) => {
    try {
        const data = await UrunlerModel.find();
        res.json(data);
    } catch (err) {
        res.json({
            message: err,
        });
    }
});

//YENİ HABER EKLEME
router.post('/urun-ekle', function (req, res) {
    UrunlerModel.update({ _id: "62bae92508df5b0718053fec" }, {
        $push:
        {
            urunler: [{
                marka: req.body.marka,
                urunAd: req.body.urunAd,
                barkod: req.body.barkod,
                stok: req.body.stok
            }]
        }
    }, { upsert: true }, function (err, docs) {
        res.json(docs);
        console.log(docs);
    });
});

//URUN UPDATE
router.post('/urun-update', function (req, res) {
    UrunlerModel.update({ _id: "62bae92508df5b0718053fec", "urunler.barkod": req.body.barkod }, {
      $set: {
        "urunler.$.marka": req.body.marka,
        "urunler.$.urunAd": req.body.urunAd,
        "urunler.$.barkod": req.body.barkod,
        "urunler.$.stok": req.body.stok
      }
    }, { upsert: true }, function (err, docs) {
      res.json(docs);
      console.log(docs);
    });
  });

//URUN SATIS
router.post('/urun-satis', function (req, res) {
    var yeniStok = parseInt(req.body.stok) - parseInt(req.body.satis);
    console.log(yeniStok);
    UrunlerModel.update({ _id: "62bae92508df5b0718053fec", "urunler.barkod": req.body.barkod }, {
      $set: {
        "urunler.$.stok": yeniStok
      }
    }, { upsert: true }, function (err, docs) {
      res.json(docs);
      console.log(docs);
    });
  });

//Aktif Siparis Sil : Basarili
router.post('/urun-sil', function (req, res) {
    UrunlerModel.update({ _id: "62bae92508df5b0718053fec" }, {
      $pull:
      {
        urunler: {
            barkod: req.body.barkod
        }
      }
    }, { upsert: true }, function (err, docs) {
      res.json(docs);
      console.log(docs);
    });
  });

module.exports = router;