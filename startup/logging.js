const winston = require('winston');
require('winston-mongodb')
require('express-async-errors');

module.exports = function(){
//     process.on('uncaughtException', (ex) =>{
//         winston.error(ex.message, ex);
//         process.exit(1);
//     });
    
    process.on('unhandledRejection', (ex) =>{
        throw ex;
    })
    
    winston.handleExceptions(
      new winston.transports.Console({colorize: true, prettyPrint: true}),
      new winston.transports.File({filename: 'unhandleReject.log'}));
    
    winston.add( new winston.transports.File ({filename: 'logfile.log'}));
    winston.add(new winston.transports.MongoDB(
        {db: 'mongodb://localhost:27017/vidly', level: 'error'}))
    
    // const p = Promise.reject(new Error('Something failed miserably!'))
    // throw new Error("Something went wrong in indexjs")
    
    // p.then(() => console.log("Done"))
  
}