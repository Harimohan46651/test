import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    let handleLogin= async(e)=>{
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          }
            const response = await fetch("http://localhost:5000/api/auth/login",options)
          const json = await response.json()
          console.log(json)
        if(json.success)
        {
            localStorage.setItem('token', json.authToken); // saving token in local
            navigate('/');
            props.showAlert("Success","loged in successfully")
        }
        else{
          props.showAlert("Danger","invalid credentials")
            console.log('false')
        }
    }

    const handleOnChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})    // it means whatever change will be target that will be update here
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Name or Email address</label>
                <input type="email" className="form-control" name="email" id="email" value={credentials.email} aria-describedby="emailHelp" onChange={handleOnChange}/>    
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={handleOnChange}/>
            </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      
    </div>
  )
}

export default Login