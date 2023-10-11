
const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    pimage: String,
    pimage2: String,
    addedBy: mongoose.Schema.Types.ObjectId,
    pLoc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }
})

schema.index({ pLoc: '2dsphere' });

const Products = mongoose.model('Products', schema);


module.exports.search = (req, res) => {

    console.log(req.query)

    let latitude = req.query.loc.split(',')[0]
    let longitude = req.query.loc.split(',')[1]

    let search = req.query.search;
    Products.find({
        $or: [
            { pname: { $regex: search } },
            { pdesc: { $regex: search } },
            { price: { $regex: search } },
        ],
        pLoc: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                $maxDistance: 500 * 1000,
            }

        }
    })
        .then((results) => {
            res.send({ message: 'success', products: results })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}

module.exports.addProduct = (req, res) => {

    console.log(req.files);
    console.log(req.body);


    const plat = req.body.plat;
    const plong = req.body.plong;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addedBy = req.body.userId;

    const product = new Products({
        pname, pdesc, price, category, pimage, pimage2, addedBy, pLoc: {
            type: 'Point', coordinates: [plat, plong]
        }
    });
    product.save()
        .then(() => {
            res.send({ message: 'saved success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}


module.exports.getProducts = (req, res) => {

    const catName = req.query.catName;
    let _f = {}

    if (catName) {
        _f = { category: catName }
    }

    Products.find(_f)
        .then((result) => {
            res.send({ message: 'success', products: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

module.exports.getProductsById = (req, res) => {
    console.log(req.params);

    Products.findOne({ _id: req.params.pId })
        .then((result) => {
            res.send({ message: 'success', product: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

module.exports.myProducts = (req, res) => {

    const userId = req.body.userId;

    Products.find({ addedBy: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

