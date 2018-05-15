const Subject = require('../../connection').Subject
const route = require('express').Router()


route.get('/', (req,res) => {
    Subject.findAll()
        .then( (sub) => {
            res.status(200).send(sub)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Subjects"
            })
        })
})


route.get('/:id', (req,res) => {
   Subject.findOne({
    where: {
        id:req.params.id
      }
   })
        .then( (sub) => {
            res.status(200).send(sub)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Subject"
            })
        })
})

route.get('/:id/teachers', (req,res) => {
    Teacher.findAll({
     where: {
         subjedtId:req.params.id
       }
    })
         .then( (sub) => {
             res.status(200).send(sub)
         })
         .catch( (err) => {
             res.status(500).send({
                 error: "Could not retrive Subjects corresponding to Teacher"
             })
         })
 })

route.post('/', (req,res) => {
   Subject.create({
        name:req.body.name,
        courseId:req.body.courseId,
    }).then((sub)=>{
        if (sub) {
            res.status(200).send(sub)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Subject.destroy({
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
    Subject.update(
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