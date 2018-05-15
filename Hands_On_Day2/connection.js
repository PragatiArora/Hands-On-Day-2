//Pragati Arora
const Sequelize =require('sequelize')

const db=new Sequelize('coursedb','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        min:0,
        max:2
    }
})

const Course =db.define('course',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Batch =db.define('batch',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    },
    startDate:{
        type:Sequelize.DATE,
        allowNull: false,
    }
})

const Teacher =db.define('teacher',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Student =db.define('student',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Lecture =db.define('lecture',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Subject =db.define('subject',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const StudentBatches =db.define('studentbatches',{
    
})
const TeacherBatches =db.define('teacherbatches',{
   
})

Course.hasMany(Batch)
Batch.belongsTo(Course)//batch me course id

Course.hasOne(Subject)
Subject.belongsTo(Course)//subject me courseid 

Batch.hasMany(Lecture)
Lecture.belongsTo(Batch)//lecture has batch id

Subject.hasMany(Teacher)
Teacher.belongsTo(Subject)//teacher has subject id

Subject.hasMany(Lecture)
Lecture.belongsTo(Subject)//Lecture has subject id

Teacher.hasMany(Lecture)
Lecture.belongsTo(Teacher)//Lecture has teacher id

Batch.belongsToMany(Student, {through: 'StudentBatches'});
Student.belongsToMany(Batch, {through: 'StudentBatches'});

Batch.belongsToMany(Teacher, {through: 'TeacherBatches'});
Teacher.belongsToMany(Batch, {through: 'TeacherBatches'});



db.sync().then(() => console.log("Database created"))
.catch(error => {
    console.log(error)
})
//{force:true,alter:true}

module.exports={
    db,Course,Batch,Teacher,Student,Lecture,Subject,StudentBatches,TeacherBatches
}