const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String
    }
});

UserSchema.pre('validate', function(next) {
    if(this.username && !this.email){
        this.email = this.username;
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);