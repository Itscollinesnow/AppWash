const express = require('express');
const router = express.Router()
const Car = require('../models/Car')
const Washer = require('../models/Washer')
const Expense = require('../models/Expense')
const moment = require('moment');


router.get('/payout', async (req, res) => {
    try {
        // use moment to get selected date and default date
        let selectedDate = moment().format('YYYY-MM-DD')
        console.log(selectedDate)

        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')
            console.log(selectedDate)


        // based on selected date , query to get the count of Cars per washer,
        //  &  payout per washer.
        let washedCars = await Car.aggregate(
            [ {$match: { doa: new Date(selectedDate) }},
            { $group: { _id: '$washer', count: { $sum: 1 }, totalPayout: { $sum: '$washerFee' } } },
            { $lookup: { from: 'washers', localField: '_id', foreignField: '_id', as: "details" } }
            ])
            console.log('washedCars >>>>')
            console.log(washedCars)

        // get the total payout for all the washers based on the selected date
        let totalPayoutPerDay = await Car.aggregate([
                { $match: { doa: new Date(selectedDate) } },
                { $group: { _id: '$doa', totalPayoutPerDay: { $sum: '$washerFee' } } }
            ])
            console.log('totalPayoutPerDay>>>>>>>>')
            console.log(totalPayoutPerDay)
        // pass the all the relevant data as you render the payout report
        res.render("payoutReport", { washers: washedCars, 
            title: "List of Car Washers", defaultDate: selectedDate ,
            sumPayout:totalPayoutPerDay[0]})    }
    catch (err) {
        console.log(err)
        res.send('Failed to retrive payout details');
    }
})

router.get('/expenses', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day
        let expenseDetails = await Expense.find({ doe: selectedDate })

        // query for total expense on a day
        let totalExpense = await Expense.aggregate([
            { $match: { doe: new Date(selectedDate) } },
            { $group: { _id: '$doe', totalExpense: { $sum: '$amount' } } }
        ])

        res.render("expenses", {
            expenses: expenseDetails, total: totalExpense[0],
            title: "Expenses", defaultDate: selectedDate
        })
    } catch (err) {
        console.log(err)
        res.send('Failed to retrive Expense details');
    }
})


router.get('/collection', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day

        let collectionDetails = await Car.find({ doa: selectedDate })

        // query for total expense on a day
        let totalCollection = await Car.aggregate([
            { $match: { doa: new Date(selectedDate) } },
            { $group: { _id: '$doa', totalCollection: { $sum: '$packagePrice' } } }
        ])

        res.render("collections", {
            collections: collectionDetails, total: totalCollection[0],
            title: "Collections", defaultDate: selectedDate
        })

    } catch (err) {
        console.log(err)
        res.send('Failed to retrive collections details');
    }
})


// router.get('/',(req,res)=>{
//     res.render('reports', {title:"Reports"})
// })

router.get('/washers', async (req, res) => {

    let washedCars = await Car.aggregate(
    [ {$group: { _id: '$washer', count: { $sum: 1 }, totalPayout: { $sum: '$washerFee' }} },
      {$lookup: { from:'washers', localField:'_id', foreignField:'_id', as:"details"}}
    ])
    res.render("washerList" , {washers: washedCars, title:"List of Car Washers"})
})

// router.post('/delete-washer', async (req, res) => {
//     try {
//         await Washer.deleteOne({ _id: req.body.id })
//         res.redirect('back')
//     } catch (err) {
//         res.status(400).send("Unable to delete item in the database");
//     }
// })

module.exports = router;