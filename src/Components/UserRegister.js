import React from 'react'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import APIService from './APIService'


function UserRegister() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    let navigation = useNavigate()
  
    const registerUser = (e) =>{
  
      e.preventDefault()
      APIService.RegisterUser({username:username,password:password, email:email, is_active : true})
      .then(() => navigation('/'))
      .catch(error => console.log(error))
  
    
    } 

    const userLogin = () =>{

        navigation('/')

    }
  
    return (
        <div className="container">
        <div className='row d-flex justify-content-around mt-5'>

          <div className="col-6">
            <h2>User Login</h2>
          <Form onSubmit={registerUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>username</Form.Label>
                  <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>

          </div>
            
        </div>
        <div className="row d-flex justify-content-around mt-5">
          <div className="col-6">
            <h4>Already Registered <Button onClick={userLogin} variant="primary" type="submit">Click Here</Button></h4>
          </div>
        </div>
    
      </div>
    )
}

export default UserRegister
