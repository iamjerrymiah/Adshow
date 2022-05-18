import axios from 'axios';
import { showAlert } from './alert';

export const createProd = async (headline, description, category) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/posts',
            data: {
              headline,
              description,
              category 
            }
            
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Select a video or image from next page');
            window.setTimeout(() =>{
                location.assign('/create-img-vid');
            }, 1000); 
          }
    } catch (err) {
        showAlert('error', 'Something went wrong! Try again');
    }
}