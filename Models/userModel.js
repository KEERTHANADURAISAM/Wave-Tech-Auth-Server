const mongoose = require ('mongoose')

// create user model schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        trim:true,
        minlength:[3,'Name must be atleast 3 characters'],
        maxlength:[50,'Name can be max 50 characters']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        trim:true, 
        unique:true,
        lowercase:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
          ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [1024, 'Password too long'],
        match: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          'Password must include uppercase, lowercase, number, and symbol'
        ]
      }
      

}, { timestamps: true });


const User = mongoose.model('User',userSchema)
module.exports = User;