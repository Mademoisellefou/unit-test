let mongoose = require('mongoose')
var Schema= mongoose.Schema;
let UserSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    username:{type:String,required:true},
},{versionKey:false})

UserSchema.pre('save',next=>{
    now=new Date();
    if(!this.createdAt){
        this.createdAt=now;
    }
    next();
})

module.exports=mongoose.model('user',UserSchema)