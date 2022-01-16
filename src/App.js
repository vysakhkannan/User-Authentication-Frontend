import './App.css';
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import UserList from './Components/UserList'
import APIService from './Components/APIService'
import {useCookies} from 'react-cookie'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'



function App() {
  
  const [users, setUser]= useState([])
  const [editUsers, setEditUser] = useState(null)
  const [token,setToken, removeToken] = useCookies(['mytoken'])
  const Navigation = useNavigate()



  useEffect(() => {

    console.log(token)

    axios({
      method: 'get',
      url : 'http://127.0.0.1:8000/users/',
      headers: {

          'Content-Type': 'appication/json',
          'Authorization':`Token ${token['mytoken']}`

      }
    })
    .then(resp =>setUser(resp.data))
    .catch(error =>{
      console.log(error)
    })

    
  }, [])

  const userStatus = (id) =>{

    axios({
      method: 'get',
      url : `http://127.0.0.1:8000/users/${id}`,
      headers: {

          'Content-Type': 'appication/json',
          'Authorization': `Token ${token['mytoken']}`

      }
    })
    .then((resp) =>{

      if(resp.data.is_active ===true){

        APIService.UpdateUser(id, {is_active:false}, token['mytoken'])
        .then((resp) =>{

          updateUserInfo(resp.data)

        })
  

      }
      else{

        APIService.UpdateUser(id, {is_active:true}, token['mytoken'])
        .then((resp) =>{

          updateUserInfo(resp.data)

        })



      }



   })


  }
  const editUser = (user)=>{

    setEditUser(user)

  }

  const deleteUser = (newUser) =>{

    const newUsers = users.filter((user) =>{

      if(user.id === newUser.id){

        return false

      }

      return true;
      
    })

    setUser(newUsers)



  }
  
  const updateUserInfo = (userUpdate) =>{

    const new_update = users.map(user=>{
      
      console.log(userUpdate.id)

      if(user.id === userUpdate.id){

        
        return userUpdate

      }
      else{

        return user

      }

    })

    setUser(new_update)

  }
  useEffect(() => {
    if(!token['mytoken']){

      Navigation('/')

    }

  }, [token])

  const logout = () =>{
    removeToken(['mytoken'])
  }



  return (
    <div className="container">
       <div className='row mt-5'>
            <div className="col-12 d-flex justify-content-end">
              <Button onClick={() => logout()} variant="primary">Logout</Button>
            </div>
            <div className="col-12 text-center">
            <h1>Admin Home</h1>

                <UserList users = {users} editUser ={editUser} updateUserInfo={updateUserInfo} userStatus={userStatus} deleteUser = {deleteUser}/>
                
            </div>
        </div>
    </div>
  );
}

export default App;
