const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tags: [
        {
            name: {
                type: String,
            }
        }
    ],
    books: {
        ref: "books",
        type: Schema.Types.ObjectId
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("users", usersSchema);