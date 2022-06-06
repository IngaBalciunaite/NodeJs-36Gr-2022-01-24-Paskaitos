import mongoose from 'mongoose'
import tasks from '../models/tasks.js'

mongoose.connect('mongodb://localhost:27017/ToDoList', (error) => {
    if(error) {
        console.log('Nepavyko prisijungti prie duomenų bazės: ' + error)
        return
    }
})

export const Tasks = mongoose.model('Tasks', tasks)