'use strict';
const lomake = document.querySelector('#lomake');
const lista = document.querySelector('#result');
const list = document.querySelector('#imagelist');

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
        kuva.src = thumbs + item.uthumb;
        li.appendChild(kuva);
      }
      lista.appendChild(li);
    });
  });
};

const getImages = () => {
  let n = 0;
  let rat = 0;
  fetch('/images').then((response) => {
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


        nappi.id = 'rate';
        fav.id = 'fav';
        divi.id = 'napit';
        comm.id = 'comm';
        h1.innerHTML = 'OTSIKKO'
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

        comm.style.backgroundColor ='orange';
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


getImages();
lomake.addEventListener('submit', lahetaLomake);
