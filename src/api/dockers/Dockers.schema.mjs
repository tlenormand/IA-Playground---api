import mongoose from "mongoose";


const dockersSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        select: true
    },
    __v: {
        type: Number,
        select: false
    },
    id: {
        type: String,
        select: true,
        required: true
    },
}, { timestamps: true, strict: false });

const dockersModel = mongoose.model('Dockers', dockersSchema, 'dockers');


export default dockersModel;
