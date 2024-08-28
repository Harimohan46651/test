import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    
    let navigate = useNavigate();
    let handleSubmit= async(e)=>{
        const {name,email,password}= credentials
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})
          }
            const response = await fetch("http://localhost:5000/api/auth/createuser",options)
          const json = await response.json()
          console.log(json)
        if(json.success)
        {
            localStorage.setItem('token', json.authToken); 
            navigate('/');
            props.showAlert("Success","user created successfully")
        }
        else{
          props.showAlert("Danger","enter correct credentials")
        }
    }

    const handleOnChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})    // it means whatever change will be target that will be update here
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name </label>
                <input type="text" className="form-control" name="name" id="name"  aria-describedby="emailHelp" onChange={handleOnChange}/>    
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="email"  aria-describedby="emailHelp" onChange={handleOnChange}/>    
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password"  onChange={handleOnChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword"  onChange={handleOnChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
    </div>
  )
}

export default Signup