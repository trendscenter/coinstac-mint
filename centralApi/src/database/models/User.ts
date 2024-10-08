import mongoose, { Schema, Document, Model } from 'mongoose'

// Define an interface for the User document
interface IUser extends Document {
  username: string
  hash: string // Typically used to store the hashed password
  roles: string[] // An array of roles
}

// Create the schema
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true }, // Storing password hashes, not plain passwords
  roles: { type: [String], required: true, default: ['user'] }, // Default role is 'user'
})

// Create the model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User
