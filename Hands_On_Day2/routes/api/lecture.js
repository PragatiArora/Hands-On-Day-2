const Lecture = require('../../connection').Lecture
const route = require('express').Router()


route.get('/', (req,res) => {
    Lecture.findAll()
        .then( (lectures) => {
            res.status(200).send(lectures)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Lectures"
            })
        })
})


route.get('/:id', (req,res) => {
   Lecture.findOne({
    where: {
        id:req.params.id
      }
   })
        .then( (lec) => {
            res.status(200).send(lec)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Lecture"
            })
        })
})

route.post('/', (req,res) => {
   Lecture.create({
        name:req.body.name,
        batchId:req.body.batchId,
        subjectId:req.body.subjectId,
        teacherId:req.body.teacherId
    }).then((lec)=>{
        if (lec) {
            res.status(200).send(lec)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Lecture.destroy({
     where: {
         id:req.params.id
       }
    }) .then(() => {
          res.sendStatus(200)
      }).catch(error=>{
        res.sendStatus(400)
         
     })  
})

route.put('/:id',(req,res)=>{
    Lecture.update(
         {name:req.body.name},
        {
            where:{
                id:req.params.id
                  }
        }) .then(() => {
        res.sendStatus(201)
    }).catch(error=>{
      res.sendStatus(400)   
   })   
})

exports = module.exports = route 