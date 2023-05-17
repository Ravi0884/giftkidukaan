const express = require('express')
const router = express.Router()
const User = require('../Models/User')

router.post('/userRegistration', async (req, res) => {
    const userData = new User({
        username:req.body.name,
        email:req.body.email,
        password:req.body.password,
        mobile:req.body.mobile,
    })
        await userData.save().then((data) => {
            res.status(200).send({
                status: true,
                data: data,
            })
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Error while adding Product"
            })
        })
})

router.post('/userlogin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const admin = await User.find({email:email})
    if(admin[0].email===email && admin[0].password===password){
        res.status(200).send({
            status: true,
            email:email,
            name:admin[0].username,
            id:admin[0]._id
        })
    }else{
        res.status(400).send({
            status: false,
            message:"User not find"
        })
    }
})

router.post('/user-cart-add/:user',async(req,res)=>{
    const parsedData = {
        id:req.body.id,
        image:req.body.image,
        qty:req.body.qty,
        rate:req.body.rate,
        title:req.body.title,
    }
    const user = await User.findById(req.params.user)
    user.cart.push(parsedData)
    await user.save().then((data) => {
        res.status(200).send({
            status: true,
            data: data,
        })
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: "Error while adding to cart"
        })
    })
})
router.get('/user-cart/:user',async(req,res)=>{
    const user =await User.findById(req.params.user)
    if (user!==null){
        res.send(user.cart)
    }
})
router.post('/user-cart-remove/:user',async(req,res)=>{
    const id = req.body.id
    const user =await User.findById(req.params.user)
    user.cart = user.cart.filter(item => item.id !== id);
    await user.save().then((data) => {
        res.status(200).send({
            status: true,
            data: data,
        })
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: "Error removing from cart"
        })
    })
})

// router.post('/user-cart-plus/:user', async (req, res) => {
//     const { id} = req.body;
//     try {
//       var user = await User.findById(req.params.user);
//       user.cart = user.cart.map((item)=>{
//         if(item.id===id){
//             return { ...item,rate:(item.rate/item.qty)*(item.qty+1), qty:item.qty + 1 };
//         }
//       })
//       user.save().then(
//         res.status(200).send({
//             status: true,
//             user
//           })
//       )
  
      
//     } catch (err) {
//       res.status(400).send({
//         status: false,
//         message: "Error while updating cart",
//         error: err.message,
//       });
//     }
//   });

router.post('/user-cart-plus/:user', async (req, res) => {
    const { id } = req.body;
    try {
      const user = await User.findById(req.params.user);
      const updatedCart = user.cart.map((item) => {
        if (item.id === id) {
          return { ...item, rate: (item.rate / item.qty) * (item.qty + 1), qty: item.qty + 1 };
        }
        return item;
      });
      user.cart = updatedCart;
      const savedUser = await user.save();
      res.status(200).send({
        status: true,
        user: savedUser,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: "Error while updating cart",
        error: err.message,
      });
    }
  });
  router.post('/user-cart-minus/:user', async (req, res) => {
    const { id } = req.body;
    try {
      const user = await User.findById(req.params.user);
      const updatedCart = user.cart.map((item) => {
        if (item.id === id) {
          const updatedQty = item.qty - 1;
          const updatedRate = (item.rate / item.qty) * updatedQty;
          return { ...item, rate: updatedRate, qty: updatedQty };
        }
        return item;
      });
      user.cart = updatedCart;
      const savedUser = await user.save();
      res.status(200).send({
        status: true,
        user: savedUser,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: "Error while updating cart",
        error: err.message,
      });
    }
  });
  

module.exports = router