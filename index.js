const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to db
const dbConfig = require('./config/db.js');

// import models
const toDoModel = require('./models/tasks.js');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Use middleware to enable CORS
app.use(cors());

app.get('/', (req,res)=> {
    res.send('server run successfully')
})

app.get('/tasks' , async (req,res) => {
    const tasks = await toDoModel.find();
    res.send(tasks);
});

app.get('/test', (req,res) => {
    const ip = 
    req.headers['cf-connecting-ip'] ||  
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress || '';
    res.send(ip)
})

app.post('/createTask' , async (req,res) => {
    const createTask = await new toDoModel({
        taskName : req.body.task
}); 
    await createTask.save();
    res.send(createTask);
});

app.post('/deleteTask' , async (req,res) => {
    const deletedTask = await toDoModel.findByIdAndDelete(req.body.id);
    const tasks = await toDoModel.find();
    res.send(tasks);
});

app.post('/updateTask' , async (req,res) => {
    const updateTask = await toDoModel.findByIdAndUpdate(req.body.id, {taskName : req.body.task}, { new: true });
    const task = await toDoModel.find();
    res.send(task);
});

app.listen('3000');