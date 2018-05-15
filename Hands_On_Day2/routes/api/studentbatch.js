const StudentBatches = require('../../connection').StudentBatches
const route = require('express').Router()


route.get('/', (req,res) => {
        StudentBatches.findAll()
        .then( (stubatch) => {
            res.status(200).send(stubatch)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive StudentBatches"
            })
        })
})

route.post('/', (req,res) => {
   StudentBatches.create({
        batchId:req.body.batchId,
        studentId:req.body.studentId,
    }).then((stubatches)=>{
        if (stubatches) {
            res.status(200).send(stubatches)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})



exports = module.exports = route 