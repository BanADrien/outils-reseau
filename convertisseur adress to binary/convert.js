let ordre = document.getElementById('ordre');
let resultbox = document.getElementById('resultbox');
let result = document.getElementById('resultat');
let val = document.getElementById('val');
let valider = document.getElementById('valider');
let isopen = false;
let cidr = document.getElementById('cidr');
let resultcidr = document.getElementById('resultcidr');


function formatInput(input) {
  // Supprimer tous les caractères non numériques et non points
  let value = input.value.replace(/[^\d.]/g, '');

  // Supprimer les points excédentaires
  value = value.replace(/\.{2,}/g, '.');

  // Insérer un point après chaque groupe de trois chiffres
  value = value.replace(/(\d{3})(?=\d)/g, '$1.');

  // Limiter à quatre groupes de trois chiffres
  let groups = value.split('.');
  groups = groups.slice(0, 4);

  if (groups.length === 4 && groups[3].charAt(0) === '0') {
    groups[3] = '0';
  }

  // Ajouter un point après un '0' si c'est le premier caractère du groupe
  value = groups.join('.').replace(/(?<=^|\.)0(?=\d)/g, '0.');

  // Limiter à quinze caractères (quatre groupes de trois chiffres et trois points)
  value = value.substring(0, 15);

  // Si la longueur de la valeur dépasse 12 (quatre groupes de trois chiffres)
  // et si le dernier caractère est un point, supprimez-le
  if (value.length > 12 && value.charAt(value.length - 1) === '.') {
    value = value.substring(0, value.length - 1);
  }
  input.value = value;
}
val.addEventListener('input', function () {
  formatInput(val);
});

function cidrtobinary(ordreValue) {

  if (ordreValue == 'binaire') {
    let cidrvalue = cidr.value.split('/')[1];
    if (cidrvalue !== '') {

      let cidrbinaire = '';
      for (let i = 0; i < cidrvalue; i++) {
        cidrbinaire += '1';
      }
      for (let i = cidrvalue; i < 32; i++) {
        cidrbinaire += '0';
      }
      cidrbinaire = cidrbinaire.match(/.{1,8}/g);
      resultcidr.innerHTML = "CIDR : " + cidrbinaire.join('.');
    }
  }
}
function calcul(value, ordreValue) {

  if (ordreValue == 'binaire') {
    let completeoctet = 0;
    completeoctet = value.map(function (val) {
      return parseInt(val, 10).toString(2);


    })


    for (let i = 0; i < 4; i++) {
      if (completeoctet[i].length < 8) {
        completeoctet[i] = completeoctet[i].padStart(8, '0');
      }
    }
    result.innerHTML = "Adresse : " + completeoctet.join('.');



  } else if (ordreValue == 'adresse') {
    result.innerHTML = value.map(function (val) {
      return parseInt(val, 2);
    }).join('.');
  } else {
    result.innerHTML = 'Veuillez entrer une valeur valide';
  }

}
cidr.addEventListener('input', () => {

  // Remplacer tous les caractères non numériques ou "/" par une chaîne vide
  cidr.value = cidr.value.replace(/[^0-9/]/g, '');

  // Mettre à jour la valeur de l'entrée avec la valeur filtrée

  if (cidr.value.length > 3) {
    cidr.value = cidr.value.substring(0, 3);
  }
  if (cidr.value[1] + cidr.value[2] > '32' || cidr.value[2] === '/') {
    cidr.value = '/' + cidr.value[1];
  }
  if (cidr.value.length === 0 || cidr.value[0] != '/' || cidr.value[1] === '0' || cidr.value[1] === '/') {
    cidr.value = '/';
  }
});
ordre.addEventListener('change', function () {
  if (ordre.value == 'binaire') {
    val.placeholder = 'ex : 192.168.0.0';
    cidr.style.display = 'block';
    cidr.value = '/';
    resultcidr.style.display = 'block';
  } else {
    val.placeholder = 'ex : 11000000.10101000.00000000.00000000';
    cidr.style.display = 'none';
    resultcidr.style.display = 'none';
  }
  resultbox.style.height = '0';





  setTimeout(() => {
    isopen = false;
    val.value = '';
    result.innerHTML = '';
    resultcidr.value = '';
  }, 200);
});


valider.addEventListener('click', function () {
  let value = val.value.split('.');
  let ordreValue = ordre.value;

  if (isopen) {
    resultbox.style.height = '0';
    setTimeout(() => {
      resultbox.style.height = '150px';
      calcul(value, ordreValue);
        cidrtobinary(ordreValue);
    }, 500);
  } else {
    resultbox.style.height = '150px';
    calcul(value, ordreValue);
    cidrtobinary(ordreValue);
  }
  isopen = true;
});
