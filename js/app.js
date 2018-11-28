openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("").style.marginLeft = "250px";

};

closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("").style.marginLeft= "0";
};


document.getElementById('avaa').addEventListener('click',openNav);
document.getElementById('sulje').addEventListener('click',closeNav);
