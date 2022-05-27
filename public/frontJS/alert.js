export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  
  // type is 'success' or 'error'
  export const showAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.site-nav').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };

  export const logAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.login-form').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };

 
  export const signAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.form-signup').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };
  

  export const createAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.form-create').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };


  export const updatePostAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.update-post-form').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };

  
  export const reviewAlert = (type, msg, time = 7) => { 
    hideAlert();
    const markup = `<div class="alert alert-${type}" style="text-align: center">${msg}</div>`; 
    document.querySelector('.review-form').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };


  