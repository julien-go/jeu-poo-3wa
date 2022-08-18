import Game from "./modules/game.js";

let inputName = document.getElementById('name_input');

let toucanDOM = document.getElementById('fighter1');
let loupDOM = document.getElementById('fighter2');
let escargotDOM = document.getElementById('fighter3');



let buttonValidate = document.getElementById('validate');
let selectedCharacter = window.localStorage.getItem('characterType');
let selectedPseudo = window.localStorage.getItem('characterPseudo');

document.addEventListener('DOMContentLoaded', function() {


    buttonValidate.addEventListener('click', function() {

        window.localStorage.setItem('characterPseudo', inputName.value);
        window.localStorage.setItem('characterType', Game.selectedType(toucanDOM, loupDOM, escargotDOM));
        console.log(window.localStorage.getItem('characterType'));


        let choice = window.localStorage.getItem('characterType');

        if (choice === undefined) {
            console.log('Veuillez choisir un perso !')
        }
        else {
            window.location.href = "battle.html";
        }

    });


});
