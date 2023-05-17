const express = require('express')
const router = express.Router()
const Admin = require('../Models/Admin')

router.post("/adminSignup",async(req,res)=>{
    const data = new Admin({
        email:req.body.email,
        password:req.body.password
    })
    await data.save().then((data) => {
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

module.exports = router