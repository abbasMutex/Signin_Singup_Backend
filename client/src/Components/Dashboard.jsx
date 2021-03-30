import React from 'react'

const Dashboard=({setAuth})=> {
    return (
        <div>
           <h1>DASHBOARD</h1> 
           <button onClick={()=>setAuth(false)}>Logout</button>
        </div>
    )
}

export default Dashboard
