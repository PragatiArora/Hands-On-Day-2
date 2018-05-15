const route=require('express').Router()

route.use('/student',require('./student'))
route.use('/teacher',require('./teacher'))
route.use('/course',require('./course'))
route.use('/batch',require('./batch'))
route.use('/lecture',require('./lecture'))
route.use('/subject',require('./subject'))
route.use('/studentbatch',require('./studentbatch'))
route.use('/teacherbatch',require('./teacherbatch'))

module.exports=route  