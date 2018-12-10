fetch('./checkLogin').then((response) =>{
  return response.json();
}).then((json) =>{
  if(json.status === 0){
    document.getElementById('login').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
  }
  else{
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
  }
});

// Navi valikko avaa/sulkeutuu samasta napista
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
    document.getElementById("mySidenav").style.width = "20%";
    //muista lisätä tähän siirrettävä kontentti ID
    //document.getElementById("content").style.marginLeft = "14%";
  }
  console.log(menu);
};

document.getElementById('avaa').addEventListener('click',toggle);
document.getElementById('menuu').addEventListener('click',toggle);



// Get the modal
let modal = document.getElementById('myModal');



// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
};

// / When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



display = () =>{
  document.getElementById('id01').style.display='block';

};
nodis = () => {
  document.getElementById('id01').style.display='none';
};

nodis2 = () => {
  document.getElementById('id02').style.display='none';
};

display2 = () =>{

  document.getElementById('id02').style.display='block';
  document.getElementById('id01').style.display='none';
};

document.getElementById('kys').addEventListener('click', display);
document.getElementById('canb').addEventListener('click', nodis);
document.getElementById('crea').addEventListener('click', display2);
document.getElementById('canb2').addEventListener('click', nodis2);
