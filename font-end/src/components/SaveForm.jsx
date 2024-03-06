import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import {CreateTaskRequest, TaskByIdRequest, UpdateTaskRequest} from "../Services/apiRequest.js";
import {Link, useNavigate} from "react-router-dom";

const SaveForm = () => {
    const [formValue, setFormValue] = useState({
        email:"",
        title:"",
        description:"",
        status:""
    })
    const [updateId, setUpdateId] = useState(null)
    const [filupForm, setFillForm] = useState()
    const navigate = useNavigate();


    useEffect(()=>{
      const id =   new URLSearchParams(window.location.search).get('id')
        setUpdateId(id)
        if(id){
            (async ()=>{
                const res = await TaskByIdRequest(id)
                 setFormValue((prev)=>({
                     email: res['email'],
                     title: res['title'],
                     description: res['description'],
                     status: res['status']
                 }))
            })()
        }
    },[])
    console.log(filupForm)



    const inputOnChange = (key, value)=>{
             setFormValue((prev)=>({
                 ...prev,
                 [key]:value
             }))
    };

    const save = async ()=>{
            if(formValue.email.length === 0){
              toast.error('Email Required')
            } else if(formValue.title.length === 0){
                toast.error('Title Required')
             }
            else if(formValue.description.length === 0){
                toast.error('Description Required')
            }
            else if(formValue.status.length === 0){
                toast.error('Status Required')
            }else{
                  if(updateId === null){
                      const res = await CreateTaskRequest(formValue)
                      if(res){
                          toast.success('successful created')
                          navigate('/')
                      }else{
                          toast.error('fail to create!')
                      }
                  }else{
                      const res = await UpdateTaskRequest(formValue,updateId)
                      if(res){
                          toast.success('successful updated')
                          navigate('/')
                      }else{
                          toast.error('fail to update')
                      }

                  }
            }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-md-6 bg-body-secondary p-5'>
                     <div className='row'>

                         <div className='col-md-12'>
                             <label className='form-label'>Your Email Address</label><br/>
                             <input type='text'  value={formValue['email']}  onChange={(e)=> inputOnChange('email',e.target.value)} className='form-control' placeholder='email'/>
                         </div>
                         <div className='col-md-12'>
                             <label className='form-label'>Your Title Address</label><br/>
                             <input type='text' value={formValue['title']}  onChange={(e)=>inputOnChange('title',e.target.value)} className='form-control' placeholder='Title'/>
                         </div>
                         <div className='col-md-12'>
                             <label className='form-label'>Your Description Address</label><br/>
                             <input type='text' value={formValue['description']}  onChange={(e)=>inputOnChange('description',e.target.value)} className='form-control' placeholder='Description'/>
                         </div>
                         <div className='col-md-12'>
                             <label className='form-label'>Your Status Address</label><br/>
                             <input type='text' value={formValue['status']}  onChange={(e)=>inputOnChange('status',e.target.value)} className='form-control' placeholder='Status'/>
                         </div>
                         <div className='col-md-12'>
                             <label className='form-label'>Save Change</label><br/>
                             {updateId===null?( <button onClick={save} className='btn btn-success w-100'>Submit</button>):( <button onClick={save} className='btn btn-primary w-100'>Update</button>)}
                         </div>

                     </div>
                </div>
            </div>
            <Toaster position='bottom-center'/>
        </div>
    );
};

export default SaveForm;