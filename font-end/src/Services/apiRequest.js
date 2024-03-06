import axios from "axios";

const baseUrl = 'http://localhost:5010/api/v1';

export async function ListTaskRequest(){

    try{
        const res =await axios.get(`${baseUrl}/list-task-by-status`);
        return res.data['data']
    }catch (e){
        return []
    }
}

// Create task Request
export async function CreateTaskRequest(postBody){

    try{
        const res = await axios.post(`${baseUrl}/create-task`,postBody);
       if(res.status === 200){
           return  true
       }else{
           return false
       }
    }catch (e){
        return false
    }
}

// Update Task Request
export async function UpdateTaskRequest(postBody,id){

    try{
        const res = await axios.post(`${baseUrl}/update-task/${id}`,postBody);
        if(res.status === 200){
            return  true
        }else{
            return false
        }
    }catch (e){
        return false
    }
}

// Delete Task Request
export async function DeleteTaskRequest(id){

    try{
        const res = await axios.get(`${baseUrl}/delete-task/${id}`);

        if(res.data['status'] === 'success'){
            return  true
        }else{
            return false
        }
    }catch (e){
        return false
    }
}

// Delete Task Request
export async function TaskByIdRequest(id){

    try{
        const res = await axios.get(`${baseUrl}/list-by-id/${id}`);
        return  res.data['data']
    }catch (e){
        return []
    }
}