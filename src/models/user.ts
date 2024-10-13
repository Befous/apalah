import mongoose, { models, Schema } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            require: true,
        }
    },
    {
        collection:'users',
        versionKey: false
    }
)

const User = models.User || mongoose.model('User', userSchema)

export default User