import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import APIService from './APIService'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router'
 

function UserLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token,setToken] = useCookies(['usertoken'])
  const Navigation = useNavigate()
    useEffect(() => {
      if(token['usertoken']){

        Navigation('/userHome')

      }

    }, [token],[Navigation])


  const loginUser = (e) =>{

    e.preventDefault()
    APIService.LoginUser({username,password})
    .then((resp) => setToken('usertoken',resp.data.token))
    .catch(error => console.log(error))

  
  }

  const RegisterPage = ()=>{

    Navigation('/userregister')
  }


    return (
        <div className="container">
          <div className='row d-flex justify-content-around mt-5'>

            <div className="col-6">
              <h2>User Login</h2>
            <Form onSubmit={loginUser}>
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
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
              </Form>

            </div>
              
          </div>
          <div className="row d-flex justify-content-around mt-5">
            <div className="col-6">
              <h4>Not Registered <Button onClick={RegisterPage} variant="primary" type="submit">Register Here</Button></h4>
            </div>
          </div>
      
        </div>
    )
}

export default UserLogin
