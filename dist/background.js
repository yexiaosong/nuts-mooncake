document.addEventListener('DOMContentLoaded', function() {
  console.log('load====1111')
  let count = 0;
  const timer = setInterval(() => {
    console.log('++++');
    count++;
    if(count > 10) {
      clearInterval(timer);
    }
  }, 1000)
  
});