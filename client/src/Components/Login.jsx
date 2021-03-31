import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

const Login=({setAuth})=> {
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })
    const {email, password} = inputs;
    const onChange = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
    }
    const onSubmitForm=async e=>{
        e.preventDefault();
        const body = {email, password};
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

            const data = await response.json();
            if (data.token){
                localStorage.setItem("token", data.token);
                setAuth(true);
                toast.success("SuccessFully Login")
                
            }else{
                setAuth(false);
                toast.error(data);
            }
            
            console.log("login token: ", data);
        } catch (error) {
            console.error("Action Failed")
        }
    }
    return (
        <div className="mx-auto">
            
        <form className="my-3 text-center" onSubmit={onSubmitForm}>
            <h1 className="text-center m-2">LOGIN</h1>
            <input className="form-control my-3 w-75 m-auto" type="email" name="email" placeholder="Email..." value={email} onChange={(e)=> onChange(e)}/>
            <input className="form-control my-3 w-75 m-auto" type="password" name="password" placeholder="Password..." value={password} onChange={(e)=> onChange(e)}/>
            <button className="btn btn-success w-75">Submit</button>
            <br/>
             <Link to="/register" className="mx-5 text-decoration-none">Register Here</Link>
        </form>
    </div>
    )
}

export default Login
