const Teacher = require('../../connection').Teacher
const route = require('express').Router()


route.get('/', (req,res) => {
    Teacher.findAll()
        .then( (teacher) => {
            res.status(200).send(teacher)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teachers"
            })
        })
})

route.get("/:id/batches", (req, res) => {
    Teacher.findAll({
      where: {
        id:req.params.id
      },
      include: [{ all: true}]
    }).then(teacherBatches => {
      res.status(200).send(teacherBatches);
    });
  }
);

route.get('/:id', (req,res) => {
   Teacher.findOne({
    where: {
        id:req.params.id
      }
   })
        .then((teacher) => {
            res.status(200).send(teacher)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teacher"
            })
        })
})

route.post('/', (req,res) => {
   Teacher.create({
        name:req.body.name,
        subjectId:req.body.subjectId,
    }).then((teacher)=>{
        if (teacher) {
            res.status(200).send(teacher)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Teacher.destroy({
     where: {
         id:req.params.id
       }
    }) .then(() => {
        res.sendStatus(201)
    }).catch(error=>{
      res.sendStatus(400)   
   })   
})

route.put('/:id',(req,res)=>{
    Teacher.update(
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