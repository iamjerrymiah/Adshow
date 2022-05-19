import axios from 'axios';
import { showAlert } from './alert';
import { createAlert } from './alert';

export const createProd = async (headline, category) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/posts',
            data: {
              headline,
              category 
            }
            
        });
        if (res.data.status === 'success') {
            createAlert('success', 'Select a video or image from next page');
            window.setTimeout(() =>{
                location.assign('/create-img-vid');
            }, 1000); 
          }
    } catch (err) {
        createAlert('error', 'Something went wrong! Try again');
    }
}
