const Student = require('../../connection').Student
const route = require('express').Router()


route.get('/', (req,res) => {
    Student.findAll()
        .then( (stu) => {
            res.status(200).send(stu)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Students"
            })
        })
})

route.post("/:studentId/batches/:batchId",(req,resnse)=>{  
    let studentId=parseInt(req.params.studentId);
    let batchId = parseInt(req.params.batchId)
  
    if(isNaN(studentId)){
  
        return res.status(403).send({
          error: "Student Id is not a valid number"
        });
      
    }
    if(isNaN(batchId)){
  
      return res.status(403).send({
        error: "Student Id is not a valid number"
      });
    
    }
  
    Student.findById(studentId).then((student)=>{
      student.setBatches(batchId).then((studentbatch)=>{
          console.log(studentbatch)
          res.sendStatus(200)
      })
    })
  
  })
  
route.get('/:id', (req,res) => {
   Student.findOne({
    where: {
        id:req.params.id
      }
   })
        .then( (stu) => {
            res.status(200).send(stu)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Students"
            })
        })
})

route.get("/:id/batches", (req, res) => {
    Student.findAll({
      where: {
        id:req.params.id
      },
      include: [{ all: true}]
    }).then(studentBatches => {
      res.status(200).send(studentBatches);
    });
  }
);

route.post("/:id/batches", (req, res) => {
    Student.findAll({
      where: {
        id:req.params.id
      },
      include: [{ all: true}]
    }).then(studentBatches => {
      res.status(200).send(studentBatches);
    });
  }
);

route.post('/', (req,res) => {
   Student.create({
        name:req.body.name,
    }).then((stu)=>{
        if (stu) {
            res.status(200).send(stu)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Student.destroy({
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
    Student.update(
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