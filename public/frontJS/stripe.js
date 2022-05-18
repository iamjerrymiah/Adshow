import axios from 'axios';
import { showAlert } from './alert'; 


export const postBill = async postId => {
  await axios.post(`/api/v1/posts/checkout-session/${postId}`)
        .then(res =>{
          return res.data
        }).then(({url}) =>{
          window.location = url
        }).catch(err => {
          console.log(err) 
        })    
};

