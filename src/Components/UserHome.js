import React,{useEffect,} from 'react'
import {Badge, Button, } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {useCookies} from 'react-cookie'




function UserHome() {
    const [token,setToken, removeToken] = useCookies(['usertoken'])
    let Navigation = useNavigate()

    useEffect(() => {
        if(!token['usertoken']){
    
          Navigation('/')
    
        }
    
      }, [token],[Navigation])
    
      const logout = () =>{
        removeToken(['usertoken'])
      }
    
    return (
        <div className='container'>
            <div className="row">


                <div className="col-12 d-flex justify-content-end mt-5">
                    <Button onClick={() => logout()} variant="primary">Logout</Button>
                </div>
            </div>
            <div className="row">
            <div className="col-12 d-flex justify-content-center mt-5">
                <h1>Wecome <Badge bg="secondary">User</Badge></h1>
                </div>
            </div>
        
            

        </div>
    )
}

export default UserHome
