// IMPORT DES MODULES JS NECESSAIRES
import Game from "./modules/game.js";
import Character from "./modules/character.js";
import Toucan from "./modules/toucan.js";
import Loup from "./modules/loup.js";
import Escargot from "./modules/escargot.js";


// DECLARATIONS DE VARIABLES

// Déclaration des personnages et leurs paramètres
let toucan = new Toucan('Méchant Toucan', 'toucan', 10, 100, 1, 10, 15);
let loup = new Loup('Loup agressif', 'loup', 12, 90, 1, 10, 4);
let escargot = new Escargot('Escargot malfaisant', 'escargot', 8, 110, 1, 10, 20);
let characterTable = [toucan, loup, escargot];

// On pointe sur les DIV qui correspondent aux persos
let myNameDOM = document.getElementById("player1_name");
let enemyNameDOM = document.getElementById("player2_name");
let myFighterDOM = document.getElementById('myFighter');
let enemyFighterDOM = document.getElementById('enemyFighter');

// On pointe sur la DIV qui doit afficher les infos
let displayInfos = document.getElementById('display_infos');

// On compte le nombre d'infos affichées sur l'écran
let counterInfos = 0;

// On garde en mémoire le nombre de points de vie au début du combat
let myMaxHealth;
let enemyMaxHealth;

// On garde en mémoire le nombre d'énergie au début 
let myMaxEnergy;
let enemyMaxEnergy;

// On pointe sur les barres de vies dans le DOM
let myHealthBar = document.getElementById('my_health_bar');
let enemyHealthBar = document.getElementById('enemy_health_bar');

// On pointe sur les barres d'énergie
let myEnergyBar = document.getElementById('my_special_bar');
let enemyEnergyBar = document.getElementById('enemy_special_bar');

// On compte le nombre de tours du saignement
let myCounterBleeding = 0;
let enemyCounterBleeding = 0;

// On pointe sur les différents button qui appellent les actions
let buttonReturnToMenu = document.getElementById('return_menu');
let buttonAttack = document.getElementById('attack1');
let buttonSpecialAttack = document.getElementById('special_attack1');
buttonSpecialAttack.style.display = "none";
let testEnemyAttack = document.getElementById('enemyattack');
let buttonNextTurn = document.getElementById('next_turn');
buttonNextTurn.style.display = 'none';

// On récupère le type et le pseudo choisi dans le local storage
let selectedCharacter = window.localStorage.getItem('characterType');
let selectedPseudo = window.localStorage.getItem('characterPseudo');

// Initialisation de variables modifiables par la suite
let myFighter;
let enemyFighter;
let timeOutID;
let turnCount = 1;
let gameIsOver = false;


// ON ATTENDS QUE LE DOCUMENT SOIT CHARGE POUR INITIALISER
document.addEventListener('DOMContentLoaded', function() {


    // On initialise les stats du perso avec sa classe
    myFighter = Game.initCharacter(myFighter, selectedCharacter, selectedPseudo, myNameDOM, toucan, loup, escargot, characterTable);


    // On randomise l'ennemi sur lequel on tombe en fonction du perso qu'on a choisi

    if (myFighter.getType == 'toucan') {
        characterTable.splice(0, 1);
    }
    else if (myFighter.getType == 'loup') {
        characterTable.splice(1, 1);
    }
    else {
        characterTable.splice(2, 1);
    }

    enemyFighter = characterTable[Math.floor(Math.random() * 2)];

    // On initialise le pseudo 
    let enemyName = document.createElement('p');
    enemyName.innerText = enemyFighter.getName.toUpperCase();
    enemyNameDOM.appendChild(enemyName);


    // On initialise la position des persos
    Game.initCharactersPosition(myFighter, myFighterDOM);
    Game.initCharactersPosition(enemyFighter, enemyFighterDOM);

    // On initialise les barres de vie
    myMaxHealth = myFighter.getHp;
    enemyMaxHealth = enemyFighter.getHp;
    Game.initHealthBar(myFighter, enemyFighter, myMaxHealth, enemyMaxHealth, myHealthBar, enemyHealthBar);

    // On initialise les barres d'energie
    myMaxEnergy = myFighter.getEnergy;
    enemyMaxEnergy = enemyFighter.getEnergy;
    Game.initEnergyBar(myFighter, myEnergyBar);
    Game.initEnergyBar(enemyFighter, enemyEnergyBar);
    myFighter.setEnergy = 5;
    enemyFighter.setEnergy = 5;


    // ADD EVENTS LISTENERS

    // Si on clique sur 'return to menu', on sur le menu de choix
    buttonReturnToMenu.addEventListener('click', function() {
        window.location.href = "index.html";
        window.localStorage.clear();
    });


    // Si on clique sur 'attack' , on lance l'attaque basique
    buttonAttack.addEventListener('click', function() {
        myFighter.basicAttack(myFighter, enemyFighter, myFighterDOM, enemyFighterDOM, timeOutID, myHealthBar, enemyHealthBar, myMaxHealth, enemyMaxHealth, myMaxEnergy, enemyMaxEnergy, gameIsOver);

        // Réponse de l'ennemi
        if (enemyFighter.getHp > 0) {
            window.setTimeout(function() {
                enemyFighter.enemyReply(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, enemyHealthBar, myHealthBar, enemyMaxHealth, myMaxHealth, enemyMaxEnergy, myMaxEnergy, gameIsOver)
            }, 3000);
        }
    });


    // Si on clique sur 'Special attack', on lance l'attaque spéciale selon le perso
    buttonSpecialAttack.addEventListener('click', function() {
        myFighter.specialAttack(myFighter, enemyFighter, myFighterDOM, enemyFighterDOM, timeOutID, myHealthBar, enemyHealthBar, myMaxHealth, enemyMaxHealth, myMaxEnergy, enemyMaxEnergy, gameIsOver);

        // Reponse de l'ennemi
        if (enemyFighter.getHp > 0) {
            window.setTimeout(function() {
                enemyFighter.enemyReply(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, enemyHealthBar, myHealthBar, enemyMaxHealth, myMaxHealth, enemyMaxEnergy, myMaxEnergy, gameIsOver)
            }, 3000);
        }
    });


    // Si on clique sur 'Next turn', on passe au tour suivant
    buttonNextTurn.addEventListener('click', function() {
        // On clear les classes d'animations d'attaques
        myFighter.clearAnimation(myFighterDOM);
        enemyFighter.clearAnimation(enemyFighterDOM);

        // On appelle la méthode saignement si un perso a la classe "bleeding"
        if (myFighterDOM.classList.contains('bleeding')) {
            enemyFighter.bleedingEnemy(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, myCounterBleeding);
        }
        if (enemyFighterDOM.classList.contains('bleeding')) {
            myFighter.bleedingEnemy(myFighter, enemyFighter, myFighterDOM, enemyFighterDOM, timeOutID, enemyCounterBleeding)
        }
        // Incrémentation du compteur de tours
        turnCount++;

        // Affichage du nouveau tour sur l'écran d'infos
        let newTurnInfo = document.createElement('p');
        newTurnInfo.innerText = 'tour ' + turnCount + ': ';
        newTurnInfo.classList.add('display_turn');
        displayInfos.appendChild(newTurnInfo);

        // On affiche ou non les boutons des actions disponibles
        buttonAttack.style.display = 'initial';
        buttonNextTurn.style.display = 'none';

        if (myFighter.getEnergy >= 8) {
            buttonSpecialAttack.style.display = 'initial';
        }
        else {
            buttonSpecialAttack.style.display = 'none';
        }
    });
});
