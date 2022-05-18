const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');


const userSchema = new mongoose.Schema({
    name: {  
        type: String,
        required: [true, 'Please tell us your name!']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username!'],
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: [20, 'Username must be less or equal than 20 characters'],
        minlength: [3, 'Username must equal 3 characters or more than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your valid email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide a contact number!']
    },
    photo: {
        type: String,
        default: 'icon1.png'
    },
    bio: {
        type: String
    },
    companyName: {
        type: String
    },
    address: {
        type: String,
        trim: true,
        lowercase: true
    },
    website: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    slug: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
        message: 'Passwords are not the same!'
    }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: { //setting user to false, not delete
        type: Boolean,
        default: true,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        select:false 
    }
});

userSchema.index({ slug: 1 });

userSchema.pre('save', function(next) {
    this.slug = slugify(this.username, { lower: true });
    next();
});

// userSchema.pre(/^find/, function(next) {
//     this.populate({
//       path: 'post',
//       select: 'headline id photo category createdAt'
//     });
//     next();
//   });


//middleware hashing the password before been stored
userSchema.pre('save', async function(next) { 
    // Only run this function if password was actually modified 
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next) { ///^find/ is used to find any req that starts with find
    // this points to the current query
    this.find({ active: { $ne: false } }); //checking if the user is set to false{delete} b4 running the query
    next();
});


//checking the correctly typed password and the hashed one in the DB, if its the same
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


//checking the correctly typed password and the hashed one in the DB, if its the same
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    //console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //time till when token expires(10mins)
  
    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;