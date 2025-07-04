const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }  
    ],
    username: {
        type: String,
        required: true,
        unique: true, // ensures the username is unique
        minlength: 3
    },
    name: String,
    passwordHash: String,
    
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

 
