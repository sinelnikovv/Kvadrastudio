//onview

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

//counters

const box = document.querySelector('#counters');
let started = false;

function counter() {
  let numbers = document.querySelectorAll('.number');

      function interval(max, num, time) {
        return setInterval(function () {
          if (num.textContent < +max) {
            num.textContent++;
          } else {
            clearInterval();
          }
        }, time
        )
      }    

      for (let num of numbers) {  
        if (num.textContent.includes(",")) {    
          let numArr = num.textContent.split(",");
          for (let n of numArr) {      
            let max = n;
            n = 0;      
            if (max < 20) {            
              interval(max, n,  400);
            } else if( max < 50) {
              interval(max, n, 300);
            } else if( max < 100) {
            interval(max, n, 200);
            }else {
            interval(max, n, 100);
            }
          }
        } else {
            let max = num.textContent;
            num.textContent = 0;
            if (max < 20) {
              interval(max, num,  200);
            } else if( max < 50) {
              interval(max, num, 100);
            } else if( max < 100) {
              interval(max, num, 50);
            }else {
              interval(max, num, 1);
            }
          }
      }
}

function watchCounter() {  
  if (isInViewport(box)) { 
    if (started == false) {
      counter()  
      started = true;
    }         
  } else {
    started = false;
    }
}
document.addEventListener('scroll', watchCounter);

//splide

var splide = new Splide('.splide', {
  gap: "20px",
} );
splide.mount();

//animate letters

const inViewport = (entries, observer) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});