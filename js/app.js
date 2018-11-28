
let menu = 0;
toggle= ()=>{
  if(menu === 1){
      menu = 0;
      document.getElementById("mySidenav").style.width = "0";
      //muista lisätä tähän siirrettävä kontentti ID
      //document.getElementById("content").style.marginLeft= "0";
  }
  else{
      menu = 1;
      document.getElementById("mySidenav").style.width = "14%";
      //muista lisätä tähän siirrettävä kontentti ID
      //document.getElementById("content").style.marginLeft = "14%";
  }
  console.log(menu);
};

document.getElementById('avaa').addEventListener('click',toggle);
document.getElementById('menuu').addEventListener('click',toggle);





// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = () => {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};