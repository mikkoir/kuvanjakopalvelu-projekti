'use strict';
const lomake = document.querySelector('#lomake');
const lista = document.querySelector('#result');
const list = document.querySelector('#imagelist');

console.log(document.cookie);
const user_ID = document.cookie.split('=')[1];
console.log('user_ID is', user_ID);


const lahetaLomake = (evt) => {
  evt.preventDefault();
  const fd = new FormData(lomake);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', asetukset).then((response) => {
    return response.json();
  }).then((json) => {
    const polku = 'files/';
    const thumbs = 'thumbs/';
    lista.innerHTML = '';
    json.forEach(item => {
      const li = document.createElement('li');
      if (item.mimetype.includes('image')) {
        const kuva = document.createElement('img');
        kuva.src = polku + item.ufile;
        li.appendChild(kuva);
      }
      lista.appendChild(li);
    });
  });
};

const getImages2 = () => {

  let n = 0;
  let rat = 0;
  fetch('/uimg').then((response) => {
    return response.json();
  }).then((json) => {
    const polku = 'files/';
    const thumbs = 'thumbs/';
    lista.innerHTML = '';
    json.forEach((item) => {
      n++;
      const h1 = document.createElement('h1');
      const li = document.createElement('li');
      const nappi = document.createElement('button');
      const fav = document.createElement('button');
      const divi = document.createElement('div');
      const comm = document.createElement('button');
      const rateyht = document.createElement('p');
      if (item.mimetype.includes('image')) {
        const kuva = document.createElement('img');
        kuva.className = 'kuvat';
        kuva.src = polku + item.ufile;

        kuva.id = n;

        h1.innerHTML = item.title;
        nappi.id = 'rate';
        fav.id = 'fav';
        divi.id = 'napit';
        comm.id = 'comm';
        comm.innerHTML = 'Comments';
        nappi.innerHTML = 'Rating';
        fav.innerHTML = 'tykkää';


        li.appendChild(h1);
        li.appendChild(kuva);
        li.appendChild(divi);
        divi.appendChild(comm);
        divi.appendChild(rateyht);
        divi.appendChild(nappi);
        divi.appendChild(fav);

        comm.style.backgroundColor ='dimgray';
        comm.style.color = 'white';
        comm.style.fontSize = '100%';
        comm.style.borderStyle = 'none';
        comm.style.width = '100%';

        comm.onclick = () =>{
          modal.style.display = "block";
        };
      }
      lista.appendChild(li);
    });
  });
};


getImages2();
lomake.addEventListener('submit', lahetaLomake);
