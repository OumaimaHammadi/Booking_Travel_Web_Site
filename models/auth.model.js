const mongoose =require('mongoose')
const bcrypt =require('bcryptjs')
require("dotenv").config();

const DB_URL = process.env.MONGO_URI;



const userSchema =mongoose.Schema({
    username: String,
    email:String,
    password: String ,
    isAdmin:{           //login
        type:Boolean,
        default:false
    }

})
const User = mongoose.model('user',userSchema)
exports.createNewUser = (username,email,password) =>{
    return new Promise((resolve ,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if(user){
            mongoose.disconnect()
            
             reject ('email is used')
        } else {
return bcrypt.hash(password,10)
        }

    }).then(hashedpassword =>{
        let user =new User ({
            username: username,
            email: email,
            password: hashedpassword
        })
        return user.save()
    }).then(()=>{
        mongoose.disconnect()
        resolve()
    }).catch(err => 
        {mongoose.disconnect() 
            reject(err)    
         }) 

    })
 
}


exports.login =(email,password)=>{
    //check email
    //no ===> err
    // yes ===> check password
    // no ===> err
    //yes ===> set session

    return new Promise((resolve ,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
            return User.findOne({email:email})
        }).then(user => {
            if(!user){
            mongoose.disconnect()
             reject ('there is no user matches this email')
        } else {
bcrypt.compare(password,user.password).then(same =>{ 
    if(!same){
        mongoose.disconnect()
        reject('password is incorrect')
    }
    else {
        mongoose.disconnect()
        resolve({
            id:user._id ,
            username: user.username,
            isAdmin:user.isAdmin
        })

    }
    })
        }
    }).catch(err =>{
        mongoose.disconnect()
        reject(err)

    })

    })
}


exports.findUserById = (id) => {
  return mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    return User.findById(id)
  })
}