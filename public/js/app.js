fetch('./checkLogin').then((response) =>{
  return response.json();
}).then((json) =>{
  if(json.status === 0){
    document.getElementById('login').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('username').style.display= 'none';
  }
  else{
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('username').style.display= 'block';
  }
});

// Navi valikko avaa/sulkeutuu samasta napista
let menu = 0;
toggle= ()=>{
  if(menu === 1){
      menu = 0;
      document.getElementById("mySidenav").style.width = "0";

  }
  else{
      menu = 1;
      document.getElementById("mySidenav").style.width = "20%";

  }
  console.log(menu);
};


document.getElementById('avaa').addEventListener('click',toggle);
document.getElementById('menuu').addEventListener('click',toggle);

let sub = document.getElementById('sub1');

// Get the modal
let modal = document.getElementById('myModal11');

// Get the button that opens the modal
let btn = document.getElementById("uppi");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = () => {
   modal.style.display = "block";
};

sub.onclick = () =>{
  modal.style.display = "none";
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

