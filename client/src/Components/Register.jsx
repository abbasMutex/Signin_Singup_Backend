import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
const Register=({setAuth})=>{
    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
    })

    const onChange=(e)=>{
        setInputs({...inputs, [e.target.name] : e.target.value })
    }
    const {email, password, name} = inputs;

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {email, password, name}
            const response= await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(body)
            });
            const data= await response.json();
            if (data.token){
                localStorage.setItem("token", data.token);
                setAuth(true);
                toast.success("User SuccessFully Registered")
                
            }else{
                setAuth(false);
                toast.error(data);
            }
            console.log("token is here: ",data)
        } catch (error) {
            console.error("Data not Found!!")
        }
    }

    return (
        <div className="mx-auto">
            
            <form className="my-3 text-center" onSubmit={onSubmitForm}>
                <h1 className="text-center m-2">REGISTER</h1>
                <input className="form-control my-3 w-75 m-auto" type="email" name="email" placeholder="Email..." value={email} onChange={(e)=> onChange(e)}/>
                <input className="form-control my-3 w-75 m-auto" type="password" name="password" placeholder="Password..." value={password}  onChange={(e)=> onChange(e)}/>
                <input className="form-control my-3 w-75 m-auto" type="text" name="name" placeholder="Name..." value={name} onChange={(e)=> onChange(e)}/>
                <button className="btn btn-success w-75">Submit</button>
                <br/>
                <Link to="/login" className="mx-5 text-decoration-none">Login Here</Link>
            </form>
            
        </div>
    )
}

export default Register
