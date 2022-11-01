const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events=[]

app.post('/events',(req,res)=>{
    try {
        const event = req.body;
        events.push(event)
        try {
            axios.post('http://posts-clusterip-srv:4000/events',event)    
        } catch (error) {
            throw error
        }
        try {
            axios.post('http://comments-clusterip-srv:4001/events',event)
        } catch (error) {
            throw error
        }
        try {
            axios.post('http://query-clusterip-srv:4002/events',event)
        }
         catch (error) {
            throw error
        }
        try {
            axios.post('http://moderation-clusterip-srv:4003/events',event)
        }
         catch (error) {
            throw error
        }
        
        
        
        res.send({status:'OK'});   
    } catch (error) { 
        res.status(400).send(error)
    }
})

app.get('/events',(req,res)=>{
    res.send(events)
})


app.listen(4005,()=>{
    console.log('Listening on port 4005')
})