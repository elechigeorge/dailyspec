// initialize express router
const router = require('express').Router()
//import todos model
const TodoModel = require('../model/Todos');


// GET ALL TODO'S
router.route('/').get(async (req, res) => {
    try {
        const todos = await TodoModel.find({})
        res.status(200).json(todos)
    } catch (error) {
        console.error('Error Fetching Data' + error.message)
    }
})

// GET SINGLE TODO
router.route('/:id').get(async (req, res) => {
    try {
        const todo = await TodoModel.findById({ _id: req.params.id });

        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: "Server Error" + error })
    }
})

// ADD A TODO
router.route('/').post(async (req, res) => {
    try {
        const newTodo = {
            name: req.body.name,
            completed: req.body.completed
        }

        const result = await TodoModel.create(newTodo)

        res.status(201).send(result)
    } catch (error) {
        res.send({ message: 'Error Posting Data' + error.message })
    }
})

// DELETE / REMOVE A TODO
router.route('/:id').delete(async (req, res) => {
    try {
        await TodoModel.deleteOne({ _id: req.params.id })

        res.status(202).json({ message: "Deleted Successful..." })
    } catch (error) {
        res.status(400).json({ message: "Failed to Delete", response: error })
    }
})


// UPDATE AN EXISTING TODO
router.route('/:id').put(async (req, res) => {
    try {
        const updated = await TodoModel.updateOne({ _id: req.params.id },
            { $set: { name: req.body.name, start: req.body.completed } },
            { multi: true }
        );

        res.status(200).json({ message: "Successful Update" })
    } catch (error) {
        res.status(400).json({ message: "Failed", response: error })
    }
})

// export router 
module.exports = router;

