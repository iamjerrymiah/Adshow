import axios from 'axios';
import { showAlert } from './alert';
import { signAlert } from './alert';

export const signup = async (name, username, phoneNumber, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                username,
                phoneNumber,
                email,
                password,
                passwordConfirm
            }
        })

        if (res.data.status === 'success') {
            signAlert('success', 'Welcome, You are successfully signed up');
            window.setTimeout(() => {
              location.assign('/');
            }, 1000);
          }

    } catch (err) {
        let usernameError = err.response.data.message;
        const usernameErr = usernameError.startsWith('E11000 duplicate key error');
        
       if(usernameErr) {
            signAlert('error', `Please provide a different username! ${username} is already taken!`);
       }else{
            signAlert('error', err.response.data.message);
       }
    }
};
