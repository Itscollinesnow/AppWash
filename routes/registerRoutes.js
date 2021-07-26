const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Manager = require('../models/Manager')
const Car = require('../models/Car')
const Washer = require('../models/Washer')
const Expense = require('../models/Expense')

// Manager Registration
router.get('/',(req,res)=>{
    res.render('register', {title:" Register",
    alert: req.query.alert })
})

router.post("/", async (req, res) => {
    
    const manager = new Manager(req.body);
    await Manager.register(manager, req.body.password, (err) => {
        if (err) {
            res.status(400).render('register', { title: "Register Manager", alert: 'error' })
            console.log(err)
        } else {
            res.redirect('register?alert=success')
        }
    })
})

// Car Registration

washPackages = {
    smallcars: { washerFee: 3000, packagePrice: 10000 },
    medium: { washerFee: 4000, packagePrice: 15000 },
    fullwash: { washerFee: 5000, packagePrice: 20000 },
    bodaboda: { washerFee: 1500, packagePrice: 5000 },
    engine: { washerFee: 2000, packagePrice: 10000 }
}

router.get('/car', async(req, res) => {
    let washerlist = await Washer.find();
    res.render('registerCar', { washers: washerlist,
        title: "Register Car", alert: req.query.alert })
})
router.post("/car", async(req, res) => {
    try {
        // combine the date and time
        let data = req.body
        let datetimeArrival = Date.parse(data.doa + 'T' + data.toa)
        data.datetimeArrival = datetimeArrival

    // derive the package price and the washer fee        
        let packageDetails = washPackages[data.package]
        data.packagePrice = packageDetails['packagePrice']
        data.washerFee = packageDetails['washerFee']

    // create a model of data and save to db
        const car = new Car(data);
        console.log('car')
        console.log(car)
        await car.save()
        res.redirect('car?alert=success')
    }
    catch (err) {
        res.status(400).render('registerCar', { title: "Register car", alert: 'error' })
        console.log(err)
    }
})

// Washer Registration
router.get('/washer', (req, res) => {
    res.render('registerWasher', { title: "Register Car Washer" , alert: req.query.alert })
})

router.post("/washer", async(req, res) => {
    try {
        const washer = new Washer(req.body);
        await washer.save()
        res.redirect('washer?alert=success')
    }
    catch (err) {
        res.status(400).render('registerWasher', { title: "Register Washer", alert: 'error' })
        console.log(err)
    }
})

router.get("/expenses", (req, res) => {
    res.render('registerExpenses', { title: "Register Expenses", alert: req.query.alert})
})

router.post("/expenses", async(req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save()
        res.redirect('expenses?alert=success')
    }
    catch (err) {
        res.status(400).render('registerExpenses', { title: "Register Expenses", alert: 'error' })
        console.log(err)
    }
})

module.exports = router;