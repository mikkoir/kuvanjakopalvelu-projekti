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
    document.getElementById("mySidenav").style.width = "14%";
    //muista lisätä tähän siirrettävä kontentti ID
    //document.getElementById("content").style.marginLeft = "14%";
  }
  console.log(menu);
};


document.getElementById('avaa').addEventListener('click',toggle);
document.getElementById('menuu').addEventListener('click',toggle);





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

