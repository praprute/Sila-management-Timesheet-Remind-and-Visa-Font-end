import {
    API
} from './../../config'
import axios from 'axios'

export const Signin = user => {
    // console.log(user)
    return axios
        .post(`${API}/signin`, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            return response.data
        })
}

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sila-management-user", JSON.stringify(data));
    // console.log(data.user.name)
    next();
  }
};  //function สำหรับจัดเก็บ token และ response data ลงใน localStorage ของ Browser

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sila-management-user");
    return axios
      .get(`${API}/signout`, {
    })
    .then(response => {
      // console.log("signout", response)
      return response
    }) 
    .catch(err => {
      console.log(err)
    })
  }
};  //function logout และ Clear localStorage ของ Browser
 

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
      return false
    }
    if(localStorage.getItem('sila-management-user')){
      return JSON.parse(localStorage.getItem('sila-management-user'))
    }else{
      return false
    }
  };


// .post(
//     "http://128.199.179.127:3021/regisIndex",
//     {
//       idUser: this.$store.state.store_userId,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     }
//   )