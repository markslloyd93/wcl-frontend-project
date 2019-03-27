//DOM elements
let menuIcon = document.querySelector('#open');
let closeIcon = document.querySelector('.btn-close-nav');
let mobileMenu = document.querySelector('.wcl-header-mobile');
// testing DOM
//console.log(menuIcon);
//console.log(closeIcon);
//console.log(mobileMenu);


/*menuIcon.addEventListener('click', event =>{
  mobileMenu.style.cssText = "display:block; height:100vh;";
});

closeIcon.addEventListener('click', event =>{
  mobileMenu.style.cssText = "display:none; height:100vh;";
});*/


// open/close function
function openClose(trigger,close,element){
  trigger.addEventListener('click', event =>{
    element.style.cssText = "display: block; height: 100vh;";
  });
  close.addEventListener('click', event =>{
    element.style.cssText = "display: none;"
  });
};


function toggle(trigger,element){
  trigger.addEventListener('click', event =>{
    element.style.display == "none" ? element.style.display = "block" : element.style.display = "none";
  });
};

toggle(menuIcon, mobileMenu)
