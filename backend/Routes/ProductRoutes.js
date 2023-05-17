const express = require('express')
const router = express.Router()
const Product = require('../Models/Products')
const Admin = require('../Models/Admin')


router.post('/admin', async (req, res) => {
    const productData = new Product({
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        title: req.body.title,
        rate: req.body.rate,
        original: req.body.original,
        offer: req.body.offer,
        description: req.body.description,
        category: req.body.category,
        subcategory:req.body.subcategory,
        requirement:req.body.requirement,
        point1:req.body.point1,
        point2:req.body.point2,
        point3:req.body.point3,
        point4:req.body.point4,
        point5:req.body.point5,
        point6:req.body.point6,
    })
    await productData.save().then((data) => {
        res.status(200).send({
            status: true,
            data: data
        })
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: "Error while adding Product"
        })
    })
})
router.post('/adminlogin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const admin = await Admin.find()
    if(admin[0].email==email && admin[0].password==password){
        res.status(200).send({
            status: true,
            email:email
        })
    }else{
        res.status(400).send({
            status: false,
        })
    }
    
   
})
router.get('/lights', async (req, res) => {
    try{
        const product = await Product.find({category:"light"})
        res.send(product)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
   
})

router.get('/gifts', async (req, res) => {
    try{
        const product = await Product.find({category:"gift"})
        res.send(product)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
   
})

router.get('/category/:category', async (req, res) => {
    try {
        const product = await Product.find({ subcategory: req.params.category });
        const data = product.map((e)=>{
            return({image:e.image1,title:e.title,rate:e.rate,original:e.original,offer:e.offer,id:e._id})
        })
        if (product.length==0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.send({
            data
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/product/:id',async(req,res)=>{
    try{
        const product = await Product.find({ _id: req.params.id });
        if(product){
            res.send(product[0])
        }else{
            res.send("Product not find")
        }
    } catch (err) {
        res.status(500).send("Error from backend")
    }
})

module.exports = router