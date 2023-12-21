const express = require('express');
const bodyParser = require('body-parser');
const getClientIp = require("get-client-ip");
const cors = require('cors');

// connect to db
const dbConfig = require('./config/db.js');

// import models
const toDoModel = require('./models/tasks.js');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Use middleware to enable CORS
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.get('/', (req,res)=> {
    res.send('server run successfully')
})

app.get('/tasks' , async (req,res) => {
    const tasks = await toDoModel.find();
    res.send({tasks, ip: req.ip});
});

app.get('/test', (req,res) => {
    const ip = getClientIp(req);
    res.send(ip)
})

app.post('/createTask' , async (req,res) => {
    const ip = getClientIp(req);
    const ipExist = toDoModel.find({clientIp : ip});
    if(!ipExist){
        const createTask = await new toDoModel({ taskName : req.body.task, clientIp : ip});       
        await createTask.save();
        res.send(createTask);
    }
    else{
        res.send({taskName : ipExist})
    }
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