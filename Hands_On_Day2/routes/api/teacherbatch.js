const TeacherBatches = require('../../connection').TeacherBatches
const route = require('express').Router()


route.get('/', (req,res) => {
    TeacherBatches.findAll()
        .then( (teachbatches) => {
            res.status(200).send(teachbatches)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive TeacherBatches"
            })
        })
})

route.post('/', (req,res) => {
  TeacherBatches.create({
        batchId:req.body.batchId,
        teacherId:req.body.teacherId,
    }).then((teachbatches)=>{
        if (teachbatches) {
            res.status(200).send(teachbatches)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})



exports = module.exports = route 