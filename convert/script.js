let hexa = document.getElementById('hexa');
let decimal = document.getElementById('decimal');
let binaire = document.getElementById('binaire');
let octale = document.getElementById('octale');
let listinput = [hexa, decimal, binaire, octale];


function complete2() {
    let testlastoctet = binaire.value.split('.');
    
    if (testlastoctet[testlastoctet.length - 1].length < 8) {
        testlastoctet[testlastoctet.length - 1] = testlastoctet[testlastoctet.length - 1].padStart(8, '0');
        testlastoctet = testlastoctet.join('.');
        binaire.value = testlastoctet;
    }
}

function testlistinput(inputval, base) {
    if (isNaN(parseInt(inputval.value[inputval.value.length - 1], base))) {
            inputval.value = inputval.value.slice(0, -1);
        }
            listinput.forEach((element) => {
                if (listinput.value = hexa ) {
                    base = 16;
                } else if (listinput.value = decimal) {
                    base = 10;
                } else if (listinput.value = binaire) {
                    base = 2;
                } else {
                    base = 8;
                }
                if ((isNaN(parseInt(element.value, base))) || element.value === '00000NaN' ) {
                    element.value = '';
                    console.log(isNaN(parseInt(element.value, base)));
                }
            });
}


hexa.addEventListener('input', function() {
    let value = hexa.value;
    value = value.replace(/\:/g, ''); 
    value = value.replace(/(.{4})(?=.)/g, '$1:'); 
    value = value.toUpperCase();
    hexa.value = value;
    value = value.replace(/\:/g, '');
    decimal.value = parseInt(value, 16);
    binaire.value = parseInt(value, 16).toString(2);
    binaire.value = binaire.value.replace(/(\d{8})(?=\d)/g, '$1.');
    complete2();
    octale.value = parseInt(value, 16).toString(8);

    testlistinput(hexa, 16);
}); 
decimal.addEventListener('input', function() {
    let value = decimal.value;
    hexa.value = parseInt(value).toString(16);
    hexa.value = hexa.value.replace(/(.{4})(?=.)/g, '$1:'); 
    hexa.value = hexa.value.toUpperCase();
    binaire.value = parseInt(value).toString(2);
    binaire.value = binaire.value.replace(/(\d{8})(?=\d)/g, '$1.');
    complete2();
    octale.value = parseInt(value).toString(8);
    testlistinput(decimal, 10);
});
binaire.addEventListener('input', function() {
    let value = binaire.value;
    value = value.replace(/(\d{8})(?=\d)/g, '$1.');
    complete2();
    binaire.value = value;
    value = value.replace(/\./g, '');
    decimal.value = parseInt(value, 2);
    hexa.value = parseInt(value, 2).toString(16);
    hexa.value = hexa.value.replace(/(.{4})(?=.)/g, '$1:'); 
    hexa.value = hexa.value.toUpperCase();
    octale.value = parseInt(value, 2).toString(8);

    if (value[value.length-1] !== '1' && value[value.length-1] !== '0') {
        binaire.value = value.slice(0, value.length-1);
    }

    testlistinput(binaire, 8);


});
octale.addEventListener('input', function() {
    let value = octale.value;
    decimal.value = parseInt(value, 8);
    hexa.value = parseInt(value, 8).toString(16);
    hexa.value = hexa.value.replace(/(.{4})(?=.)/g, '$1:'); 
    hexa.value = hexa.value.toUpperCase();
    binaire.value = parseInt(value, 8).toString(2);
    binaire.value = binaire.value.replace(/(\d{8})(?=\d)/g, '$1.');
    complete2();

    testlistinput(octale, 8);
});
