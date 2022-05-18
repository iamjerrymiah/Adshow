import '@babel/polyfill';
import { showAlert } from './alert';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { createProd } from './createProd';
import { updatePost } from './updatePost';
import { reviewProd } from './review';
import { liking } from './like';
// import { searchPost } from './search';
import { postBill } from './stripe';
import { addBillboard } from './billboard';
import { reverseBillboard } from './reverseBillboard';



//DOM Elements
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.form-signup');
const userDataForm = document.querySelector('.form-user-data');
const userDataPhoto = document.querySelector('.form-user-photo');
const userPasswordForm = document.querySelector('.form-password');
const createPostForm = document.querySelector('.form-create');
const updatePostForm = document.querySelector('.update-post-form');
const reviewForm = document.querySelector('.review-form');
// const searchForm = document.querySelector('.search-form');
const likeBtn = document.getElementById('like-btn');
const logOutBtn = document.getElementById('logout-btn');
const billBtn = document.getElementById('stripe-post');
const addBillBtn = document.getElementById('add-bill');
const reverseBillBtn = document.getElementById('admin-reverse-bill');
 





//DELEGATION
if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;

    login(email, password);
});


if (signupForm)
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('sig-name').value;
      const username = document.getElementById('sig-username').value;
      const phoneNumber = document.getElementById('sig-phoneNumber').value;
      const email = document.getElementById('sig-email').value;
      const password = document.getElementById('sig-password').value;
      const passwordConfirm = document.getElementById('sig-passwordConfirm').value;
  
    signup(name, username, phoneNumber, email, password, passwordConfirm);
});

if (logOutBtn) logOutBtn.addEventListener('click', logout);


if(createPostForm)
createPostForm.addEventListener('submit', e => {
  e.preventDefault();
  const headline = document.getElementById('postHeadline').value;
  const description = document.getElementById('postDescript').value;
  const category = document.getElementById('postCategory').value;

  createProd(headline, description, category);
});


if(updatePostForm)
updatePostForm.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData();
  form.append('photo', document.getElementById('photo').files[0]);
  const { postId } = e.target.dataset;

  updatePost(form, postId);
});


 
if(userDataPhoto)
userDataPhoto.addEventListener('submit', e=> {
    e.preventDefault();
    const form = new FormData();
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
});


if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('bio', document.getElementById('bio').value);
    form.append('companyName', document.getElementById('companyName').value);
    form.append('website', document.getElementById('website').value);
    form.append('address', document.getElementById('address').value);

    updateSettings(form, 'data');
  });



if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

  });


  if(reviewForm)
  reviewForm.addEventListener('submit', e =>{
    const review = document.getElementById('review-input').value; 
    const postId = e.target.dataset.postId;
  
    reviewProd(postId, review);
  });


  // if(searchForm)
  // searchForm.addEventListener('submit', e =>{
  //   const data = document.getElementById('search-input').value;

  //   searchPost(data);
  // });
  

  if(likeBtn)
  likeBtn.addEventListener('click', e =>{
    e.target.textContent = '...';
    const { postId } = e.target.dataset;

    liking(postId);

    e.target.textContent = 'successfully liked';
    
  });

  
  if(billBtn)
  billBtn.addEventListener('click', e =>{
    e.target.textContent = 'Processing...';
  const { stripepostId } = e.target.dataset;

    postBill(stripepostId);
  });


  if(addBillBtn)
  addBillBtn.addEventListener('click', e =>{
    const { postId } = e.target.dataset;

    addBillboard(postId);
  });

  if(reverseBillBtn)
  reverseBillBtn.addEventListener('click', e =>{
    const { adminbillId } = e.target.dataset;

    reverseBillboard(adminbillId);
  });
  

  const alertMessage = document.querySelector('body').dataset.alert;
  if (alertMessage) showAlert('success', alertMessage, 20);

  // const billReload = document.querySelectorAll('posts-slide-wrap');
  // const billReloader = billReload.reload();

  // // if(billReload) setInterval(billReloader, 500);
  
  

  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function(input){
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener('change', function( e ){
		var fileName = '';

		if( this.files && this.files.length >= 1 ){
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace('{count}', this.files.length);
    }

		if( fileName ){
			label.querySelector( 'span' ).innerHTML = fileName;
    }else{
			label.innerHTML = labelVal;
    }
	});
});
