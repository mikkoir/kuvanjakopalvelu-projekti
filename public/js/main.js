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
        kuva.src = polku + item.ufile;
        li.appendChild(kuva);
      }
      lista.appendChild(li);
    });
  });
};


const getImages222 = () => {
  const fd = new FormData(lomake);
  const asetukset2 = {
    method: 'post',
    body: fd,
  };
  fetch('/upload',asetukset2).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
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

lomake.addEventListener('submit', lahetaLomake);
