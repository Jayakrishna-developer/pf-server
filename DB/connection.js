const mongoose=require('mongoose')
const connection_string=process.env.connection_string
mongoose.connect(connection_string).then(()=>{
    console.log('Project-Fair Application connected sucessfully to MongoDb-Atlas' );
    
}).catch((err)=>{
    console.log('MongoDb Connection Failed',err);
    
})