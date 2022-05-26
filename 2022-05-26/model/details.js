import mongoose from 'mongoose'

const detailsSchema = new mongoose.Schema({
    task: {
        type: String
    },
    date: {
        type: String
    },
    done: {
        type: Boolean
    }
})

export default mongoose.model('details', detailsSchema)