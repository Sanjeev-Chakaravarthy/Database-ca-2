const express = require('express')

const router = express.Router()

const Movie = require('../models/movieModel')

router.post('/',async(req,res)=>{
    try{
        const movie = new Movie(req.body)
        res.status(201).json(movie)
    }
    catch(error){
        if(error.name=='ValidationError'){
            res.status(400).json({error:error.message})
        }else{
            console.error(error)
            res.status(500).json({error:"Internal server error"})
        }
    }
})

router.get('/',async(req,res)=>{
    try{
        if(req.query.id){
            const movie = await Movie.findById(req.query.id)
            if(!movie){
                return res.status(400).json({error:"Movie not found"})
            }
            res.json(movie)
        }
        else{
            const movie = await Movie.find()
            res.json(movie)
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,newValidators:true})
        if(!movie){
            return res.status(400).json({error:"Movie not found"})
        }
    }
    catch(error){
        if(error.name=='ValidationError'){
            res.status(400).json({error:error.message})
        }else{
            console.error(error)
            res.status(500).json({error:"Internal server error"})
        }
    }
})

router.delete('/id',async (req,res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id)
        if(!movie){
            return res.status(400).json({error:"Movie not found"})
        }
    }
    catch(error){
        res.status(400).send(error)
    }

    
})

module.exports = router