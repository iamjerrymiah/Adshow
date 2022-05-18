import axios from 'axios';
import { showAlert } from './alert';
import { logAlert } from './alert';

export const login = async (email, password) => { 
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',  
        data: { 
          email,
          password
        }
      });
  
      if (res.data.status === 'success') {
        logAlert('success', 'You are successfully logged in!'); 
        window.setTimeout(() => {
          location.assign('/');
        }, 1000);
      }
    } catch (err) {
      logAlert('error', err.response.data.message);
    }
  };


export const logout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logout'
      });
      if (res.data.status === 'success'){
        window.setTimeout(()=> {
          location.assign('/');
        }, 1000);
      }
    } catch (err) {
      showAlert('error', 'Error logging out! Try again.');
    }
};  