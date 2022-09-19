const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//create movie
router.post('/create', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        showtimes: req.body.showtimes
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all movies
router.get('/get_movies', async (req, res) => {
    try {
        const data = await Model.find({}, { _id: 1, name: 1, });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get movie by ID
router.get('/get_movie/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//book movie by ID Method
router.patch('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const numOfTickets = req.body.number_of_tickets;
        const slotId = req.body.slot_id;
        const arrayIndex = slotId - 1;
        const options = { new: true };

        const movie = await Model.findById(id)
        if (slotId > 6 || slotId < 1) {
            res.status(406).send("Slot id is wrong")
        }
        else {
            movieShowtimes = movie.showtimes[arrayIndex]
            if (movieShowtimes.capacity < numOfTickets) {
                res.status(406).send(`Only ${movieShowtimes.capacity} seats available!!`)
            }
            else {
                movie.showtimes[arrayIndex].capacity = movieShowtimes.capacity - numOfTickets;
                const result = await Model.findByIdAndUpdate(movie.id, movie, options)
                res.send(result)
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete movie by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Movie with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;