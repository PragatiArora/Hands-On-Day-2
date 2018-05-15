const Course = require('../../connection').Course
const Batch = require('../../connection').Batch
const Lecture = require('../../connection').Lecture
const Teacher = require('../../connection').Teacher
const Student = require('../../connection').Student
const route = require('express').Router()


route.get('/', (req,res) => {
    Course.findAll()
        .then((course) => {
            res.status(200).send(course)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Courses"
            })
        })
})


route.get('/:id', (req,res) => {
   Course.findOne({
    where: {
        id:req.params.id
      }
   })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Course"
            })
        })
})

route.get('/:id/batches', (req,res) => {
    Batch.findAll({
     where: {
         courseId:req.params.id
       }
    })
         .then((batch) => {
             res.status(200).send(batch)
         })
         .catch( (err) => {
             res.status(500).send({
                 error: "Could not retrive Batches corresponding to courses"
             })
         })
 })

 route.get('/:id/batches/:bid', (req,res) => {
    Batch.findAll({
     where: {
         courseId:req.params.id,
         id:req.params.bid
       }
    })
         .then((batch) => {
             res.status(200).send(batch)
         })
         .catch( (err) => {
             res.status(500).send({
                 error: "Could not retrive Batches corresponding to courses"
             })
         })
 })

 route.get("/:courseId/batches/:batchId/students", (req, res) => {
      let courseId = parseInt(req.params.courseId);
      let batchId = parseInt(req.params.batchId);
  
      if (isNaN(courseId)) {
        return res.status(403).send({
          error: "Course Id is not a valid number"
        });
      }
  
      if (isNaN(batchId)) {
        return res.status(403).send({
          error: "Batch Id is not a valid number"
        });
      }
  
      Batch.findAll({
        where: {
          id: batchId,
          courseId: courseId
        },
  
        include: [{ model: Student }]
      }).then(studentBatches => {
        res.status(200).send(studentBatches);
      });
    }
  );
  

  route.get("/:courseId/batches/:batchId/teachers", (req, res) => {
    let courseId = parseInt(req.params.courseId);
    let batchId = parseInt(req.params.batchId);

    if (isNaN(courseId)) {
      return res.status(403).send({
        error: "Course Id is not a valid number"
      });
    }

    if (isNaN(batchId)) {
      return res.status(403).send({
        error: "Batch Id is not a valid number"
      });
    }

    Batch.findAll({
      where: {
        id: batchId,
        courseId: courseId
      },

      include: [{ model: Teacher }]
    }).then(teacherBatches => {
      res.status(200).send(teacherBatches);
    });
  }
);


route.get("/:courseId/batches/:batchId/lectures",(req,res)=>{
    let courseId = parseInt(req.params.courseId);
    let batchId = parseInt(req.params.batchId);
  
    if (isNaN(courseId)) {
      return res.status(403).send({
        error: "Course Id is not a valid number"
      });
    }
  
    if (isNaN(batchId)) {
      return res.status(403).send({
        error: "Batch Id is not a valid number"
      });
    }
  
    Batch.find({
      where:{
        id:batchId,
        courseId:courseId
      }
    })
      .then(batches=>{
            if(!batches)
              return res.status(500).send('There are no such batches with id '+ batchId)
  
              Lecture.findAll({
                where:{
                  batchId:batchId
                }
              }).then(lectures=>{
                res.status(200).send(lectures)
              })
              .catch(error=>{
                res.status(500).send('Error in finding lectures')
              })
          })
  })
  
  route.get("/:courseId/batches/:batchId/lectures/:lectureId",(req,res)=>{
    let courseId = parseInt(req.params.courseId);
    let batchId = parseInt(req.params.batchId);
    let lectureId=parseInt(req.params.lectureId);
  
    if (isNaN(courseId)) {
      return res.status(403).send({
        error: "Course Id is not a valid number"
      });
    }
  
    if (isNaN(batchId)) {
      return res.status(403).send({
        error: "Batch Id is not a valid number"
      });
    }
  
    if (isNaN(lectureId)) {
      return res.status(403).send({
        error: "Lecture Id is not a valid number"
      });
    }
  
    Course.findById(courseId).then(course=>{
      if(!course){
        return res.send({
          error:'There is no such course with id'+courseId
        })
      }
  
      Lecture.findOne({
        where:{
          id:lectureId,
          batchId:batchId
        }
      }).then(lecture=>{
        res.status(200).send(lecture)
      })
      .catch(error=>{
        res.status(500).send('Error in finding lecture')
      })
  
    }) 
  
  })
  

route.post('/', (req,res) => {
   Course.create({
        name:req.body.name,
    }).then((course)=>{
        if (course) {
            res.status(200).send(course)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
   Course.destroy({
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
   Course.update(
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