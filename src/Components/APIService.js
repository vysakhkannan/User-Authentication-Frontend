import axios from 'axios'


export default class APIService {

    static UpdateUser(user_id, body, token){
        console.log("body :"+body)

        return(
            axios({
                method: 'patch',
                url : `http://127.0.0.1:8000/users/${user_id}/`,
                headers: {
                    
                    'Authorization': `Token ${token}`
          
                },
                data:body
              })
              .catch(error =>{
                console.log(error)
              })
        )


    }
    static DeleteUser(user_id, token){
        console.log(user_id)

        return(
            axios({
                method: 'delete',
                url : `http://127.0.0.1:8000/users/${user_id}/`,
                headers: {
                    
                    'Authorization': `Token ${token}`
          
                },
              })
              .catch(error =>{
                console.log(error)
              })
        )


    }
    static LoginUser(body){

        console.log(body)

        return(
            axios({
                method: 'POST',
                url : `http://127.0.0.1:8000/auth/`,

                data:body
              })
              .catch(error =>{
                console.log(error)
              })
        )


    }
    static RegisterUser(body){
      console.log("body :"+body)

      return(
          axios({
              method: 'POST',
              url : 'http://127.0.0.1:8000/users/',
              headers: {
                  
                  'Authorization': 'Token 644a6221179fae5f8eceadae2da7cb95b1d918ad'
        
              },
              data:body
            })
            .catch(error =>{
              console.log(error)
            })
      )


  }
  
    
}
