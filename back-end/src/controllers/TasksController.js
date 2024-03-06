const TaskModel = require('../models/TaskModel');

// Create
exports.CreateTask = async (req,res)=>{
    const reqBody = req.body;

    try {
        const result = await TaskModel.create(reqBody);
        res.status(200).json({status:'success',data:result})

    }catch (e){
        res.status(200).json({status:'fail',data:e})
    }
}

// Read
exports.ReadTask = async (req,res)=>{
    try {
        const result = await TaskModel.find();
        res.status(200).json({status:'success',data:result})

    }catch (e){
        res.status(200).json({status:'fail',data:e})
    }
}

// Update
exports.UpdateTask = async (req,res)=>{
    const reqBody = req.body;
    const id = req.params.id;
    const query = {_id:id}

    try {
        const result = await TaskModel.updateOne(query,reqBody);
        res.status(200).json({status:'success',data:result})

    }catch (e){
        res.status(200).json({status:'fail',data:e})
    }
}

// Delete
exports.DeleteTask = async (req,res)=>{
    const id = req.params.id;
    const query = {_id:id}

    try {
        const result = await TaskModel.deleteOne(query);
        res.status(200).json({status:'success',data:result})

    }catch (e){
        res.status(200).json({status:'fail',data:e})
    }
}

// Particular id Read
exports.TaskById = async (req,res)=>{
    const id = req.params.id;


    try {
        const result = await TaskModel.findOne({_id: id});
        res.status(200).json({status:'success',data:result})

    }catch (e){
        res.status(200).json({status:'fail',data:e})
    }
}
