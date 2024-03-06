import React, {useEffect, useState} from 'react';
import {DeleteTaskRequest, ListTaskRequest} from "../Services/apiRequest.js";
import {toast, Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

const TaskList = () => {
    const [data, setData] = useState([])
    const [change, setChange] = useState(0)

     useEffect(()=>{
         (async ()=>{
           const res = await ListTaskRequest();
           setData(res)
         })()
     },[change])

    const onDelete = async (id)=>{
         const res = await DeleteTaskRequest(id)
        if(res){
           toast.success('Delete completed!')
            setChange(change+1)
        }else{
            toast.error('Delete fail')
        }

    }


    if(data.length === 0){
        return <h2>Loading......</h2>
    }else{
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className='table'>
                            <thead>
                               <tr>
                                   <th>Email</th>
                                   <th>Title</th>
                                   <th>Description</th>
                                   <th>Status</th>
                                   <th>Action</th>
                               </tr>
                            </thead>
                            <tbody>
                            {
                              data.map((item)=>(
                                  <tr>
                                      <td>{item['email']}</td>
                                      <td>{item['title']}</td>
                                      <td>{item['description']}</td>
                                      <td>{item['status']}</td>
                                      <td>
                                          <button onClick={()=>onDelete(item['_id'])} className='btn btn-danger'>Delete</button>
                                          <Link to={'/save?id='+item['_id']} className='btn btn-success ms-2'>Edite</Link>
                                      </td>
                                  </tr>
                              ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Toaster position='bottom-center'/>
            </div>
        );
    }
};

export default TaskList;