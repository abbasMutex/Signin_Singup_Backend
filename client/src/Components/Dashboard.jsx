import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

const Dashboard=({setAuth})=> {

    const [name, setName]=useState();
    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers:{token: localStorage.token}
            })

            const data = await response.json();
            console.log("The name of login user: ", data);
            setName(data.user_name);
        } catch (error) {
            console.error("failed action in dashboard");
        }
    }

    const logout=e=>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("You're Logged Out");
    }
    useEffect(() => {
        getName();
        }, [])

    return (
        <div>
           <h1>DASHBOARD {name}</h1> 
           <button className="btn btn-primary mx-2" onClick={(e)=> logout(e)}>Logout</button>
        </div>
    )
}

export default Dashboard
