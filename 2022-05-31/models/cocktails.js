import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Cocktails = new Schema({
    title: String,
    instructions: String,
    thumbnail: String
})

export default mongoose.model('Cocktails', Cocktails)