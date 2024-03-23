import mongoose from "mongoose";


const modelsSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        select: true
    },
    __v: {
        type: Number,
        select: false
    },
}, { timestamps: true, strict: false });

const modelsModel = mongoose.model('Models', modelsSchema, 'models');

const aggregatedModel = modelsModel.aggregate([
    {
        $lookup: {
            from: 'models.configs',
            localField: 'modelConfigId',
            foreignField: '_id',
            as: 'configs'
        }
    },
    {
        $lookup: {
            from: 'models.layers',
            localField: 'modelLayersIds',
            foreignField: '_id',
            as: 'layers'
        }
    }
]);


export default modelsModel;
export {
    aggregatedModel
};
