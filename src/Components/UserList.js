import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import APIService from './APIService'
import {useCookies} from 'react-cookie'



function UserList(props) {
  const [show, setShow] = useState(false);
  const [editUsers, setEditUser] = useState([])
  const [updateUsername, setUpdateUsername] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [token] = useCookies(['mytoken'])




  const editUser = (user)=>{

    props.editUser(user)
    setShow(true)
    setEditUser(user)
    setUpdateUsername(user.username)
    setUpdateEmail(user.email)

  }
  const handleClose = () => setShow(false);

  const updateUser = ()=>{

    APIService.UpdateUser(editUsers.id, {username :updateUsername,email:updateEmail},token['mytoken'])
    .then((resp) => {
      props.updateUserInfo(resp.data)

    })

  }
  const userStatus = (userId) =>{

    props.userStatus(userId)

  }

  const deleteUser = (user) =>{
    console.log(user)
    APIService.DeleteUser(user.id, token['mytoken'])
    .then(() =>{props.deleteUser(user)


    })

    props.deleteUser(user)

  }

    return (
        <>
        <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th width="170">Username</th>
                      <th width="170">Email</th>
                      <th width="170">Is Active</th>
                      <th width="170">Block</th>
                      <th width="170">Edit</th>
                      <th width="170">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                      {props.users && props.users.map((user)=>{
                        return(
                          <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.is_active && user.is_active ? 'Active': 'not Active'}</td>
                          <td>{user.is_active && user.is_active ?    <Button onClick={(e) => props.userStatus(user.id)} variant="primary">Block</Button> : <Button onClick={(e) => props.userStatus(user.id)} variant="danger">Unblock</Button>}</td>
                          <td><Button onClick={() => editUser(user)} variant="primary">Edit</Button></td>
                          <td><Button onClick={() => deleteUser(user)} variant="danger">Delete</Button></td>


                        </tr>

                        )

                      })}

                  </tbody>
                </Table>


                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <input type="text" className='form-control' onChange={(e)=> setUpdateUsername(e.target.value)} value={updateUsername} />
                    <input type="text" className='form-control' onChange={(e)=> setUpdateEmail(e.target.value)} value={updateEmail} />

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={updateUser}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
        </>
    )
}

export default UserList
