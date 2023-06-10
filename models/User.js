const {Schema, model } = require('mongoose'); 


const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/], // using regex to match email address
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],

},
{
    toJSON: {
        // this allows virtual properties to be displayed in JSON format
        virtuals: true,
    },
    id: false,
});

// define virtual 'friendCount' that get the length of the user's friends array.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema)

module.exports = User;