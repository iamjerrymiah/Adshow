import '@babel/polyfill';
import { showAlert } from './alert';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { createProd } from './createProd';
import { updatePost } from './updatePost';
import { reviewProd } from './review';
import { liking } from './like';
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
  const category = document.getElementById('postCategory').value;

  createProd(headline, category);
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




//lazy loading functionality
const container = document.getElementById('lazyLoadID');
const loading = document.querySelector('.loading');

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
    showLoading();
	}
});


function showLoading() {
	loading.classList.add('show');
	
	// load more data
	setTimeout(getPost, 500)
};


async function getPost() {
  try {
    //Fetch the total amount of post in the database  
  let rangeResponse = await fetch('/api/v1/posts/post-length');
  let rangePost = await rangeResponse.json();
  const num = parseInt(rangePost.length);//transfrom the length to Integer
  
  const postResponse = await fetch(`/api/v1/posts/lazyLoad/${getRandomNr(num)}`);
  const postData = await postResponse.json();

  const data = {post: postData};
 
  
  addDataToDOM(data);
  } catch (err) {
    console.log(err);
    
    loading.classList.add('show');
  }
};


function getRandomNr(num) {
    return Math.floor(Math.random() * num);
};


function addDataToDOM(data) {
	const postElement = document.createElement('div');
  postElement.classList.add('container')

      let imgLoop = data.post.posts[0].photo;
      let photoLoop = imgLoop.split('.').pop();

      function imageDiv() {
        if(photoLoop === 'MP4'|| photoLoop === 'mp4' || photoLoop === 'MP2' || photoLoop === 'mp2' || photoLoop === 'WEBM' || photoLoop === 'webm' || photoLoop === 'AVI' || photoLoop === 'avi' || photoLoop === 'ogg' || photoLoop === 'wmv' || photoLoop === 'MOV' || photoLoop === 'mov') { 
        return `<video src="images/posts/${data.post.posts[0].photo}" 
          style="max-width: 100%; height: 300px;" autoplay muted></video>	`
        }else if(photoLoop === 'jpg' || photoLoop === 'JPG'|| photoLoop === 'PNG' || photoLoop === 'png' || photoLoop === 'JPEG' || photoLoop === 'jpeg' || photoLoop === 'GIF' || photoLoop === 'gif' || photoLoop === 'tiff' || photoLoop === 'psd' || photoLoop === 'PDF' || photoLoop === 'pdf') {
        return `<img src="images/posts/${data.post.posts[0].photo}" alt="" 
        class="img-fluid">`
        }
      };
      

    if(data.post.posts[0].photo !== 'vitualpost.jpg') {
	postElement.innerHTML = `
  <div class="row g-5" style="margin-top: 5px;">
			
				<div class="col-lg-10" style="margin-bottom: -40px;">
					<div class="post-entry d-block small-post-entry-v">
						<div class="content">
						
							<a href="${data.post.posts[0].slug}" class="post-author d-flex align-items-center">
								<div class="author-pic" style="margin-top: 5px;">
									<img src="images/users/${data.post.posts[0].user.photo}" alt="Image">
								</div>
								<div class="text">
									<strong style="color: #000;"> @${data.post.posts[0].user.username}</strong>
								</div>
								</a>
							</div>
							

							<div class="post-meta mb-1">
								<span class="category">${data.post.posts[0].category}</span> &mdash;

								<span class="date" style="font-size: smaller;">${data.post.posts[0].createdAt.split('T').shift()}</span>
								
							</div>

							<h6><a href="/${data.post.posts[0].slug}">${data.post.posts[0].headline.split('-_-_-_').shift()}</a></h6>
							
						</div>
						<div class="thumbnail" style="background-color: #000; text-align: center;">
						
              	<a href="/${data.post.posts[0].slug}">
								${imageDiv()}
								</a>
						

							<ul class="admin-list blog-sing" style="height: 60px; background-color: rgb(32, 32, 32);">     
								<li style="margin-top: 15px;"><a href="/<%= post.slug %>"><span class="icon-heart" aria-hidden="true"></span>
                ${data.post.posts[0].likes.length} Likes</a></li>
								<li style="margin-top: 15px;"><a href="/<%= post.slug %>"><span class="icon-commenting" aria-hidden="true"></span>
									${data.post.posts[0].reviews.length} Comments</a></li>
							</ul>
						</div>

					</div>

			</div>
		</div>
  `
    }

  container.appendChild(postElement);

  loading.classList.remove('show');
};
