openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("").style.marginLeft = "250px";

};

closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("").style.marginLeft= "0";
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

document.getElementById('avaa').addEventListener('click',openNav);
document.getElementById('kys').addEventListener('click', display);
document.getElementById('canb').addEventListener('click', nodis);
document.getElementById('crea').addEventListener('click', display2);
document.getElementById('canb2').addEventListener('click', nodis2);