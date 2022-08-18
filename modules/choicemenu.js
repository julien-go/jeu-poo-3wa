// Selection du personnage au clique et déselection si on en choisi un autre
let buttonValidate = document.getElementById('validate');
// buttonValidate.style.display = 'none';
let fighter1 = document.getElementById('fighter1');
let fighter2 = document.getElementById('fighter2');
let fighter3 = document.getElementById('fighter3');
let fighter1isSelected = false;
let fighter2isSelected = false;
let fighter3isSelected = false;

fighter1.addEventListener('click', function() {

    if (fighter1isSelected == false) {
        fighter1.classList.add('selected');
        fighter1isSelected = true;
        // window.setTimeout(buttonValidate.style.display = 'initial'), 2000;
        fighter2.classList.remove('selected');
        fighter2isSelected = false;
        fighter3.classList.remove('selected');
        fighter3isSelected = false;
    }
    else {
        fighter1.classList.remove('selected');
        fighter1isSelected = false;
        // buttonValidate.style.display = 'none';
    }
})

fighter2.addEventListener('click', function() {
    if (fighter2isSelected == false) {
        fighter2.classList.add('selected');
        fighter2isSelected = true;
        // window.setTimeout(buttonValidate.style.display = 'initial'), 2000;
        fighter1.classList.remove('selected');
        fighter1isSelected = false;
        fighter3.classList.remove('selected');
        fighter3isSelected = false;
    }
    else {
        fighter2.classList.remove('selected');
        fighter2isSelected = false;
        // buttonValidate.style.display = 'none';
    }

})
fighter3.addEventListener('click', function() {
    if (fighter3isSelected == false) {
        fighter3.classList.add('selected');
        fighter3isSelected = true;
        // window.setTimeout(buttonValidate.style.display = 'initial'), 2000;
        fighter1.classList.remove('selected');
        fighter1isSelected = false;
        fighter2.classList.remove('selected');
        fighter2isSelected = false;

    }
    else {
        fighter3.classList.remove('selected');
        fighter3isSelected = false;
        // buttonValidate.style.display = 'none';

    }
})
