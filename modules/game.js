import Character from "./character.js";
import Toucan from "./toucan.js";
import Loup from "./loup.js";
import Escargot from "./escargot.js";


class Game {

    // METHODE STATIQUE QUI RECUPERE LE TYPE DU PERSO SELECTIONNE
    static selectedType(fighter1, fighter2, fighter3) {
        if (fighter1.classList.contains('selected') == true) {
            return 'toucan';
        }
        else if (fighter2.classList.contains('selected') == true) {
            return 'loup';
        }
        else if (fighter3.classList.contains('selected') == true) {
            return 'escargot';
        }
    }


    // METHODE STATIQUE POUR INITIALISER LE PSEUDO ET LE TYPE DU PERSO 
    static initCharacter(myFighter, characterType, characterPseudo, nameDOM, type1, type2, type3, characterTable) {

        // Si le pseudo n'est pas défini, le nom est Jean-Claude
        if (characterPseudo == 0) {
            characterPseudo = 'Jean-Claude';
        }

        // On affiche le pseudo du personnage
        let nameToDisplay = document.createElement('p');
        nameToDisplay.innerText = characterPseudo.toUpperCase();
        nameDOM.appendChild(nameToDisplay);

        // On crée un personnage avec les spécifications choisies
        if (characterType == type1.getType) {
            return new Toucan(characterPseudo, 'toucan', 10, 100, 1, 10, 15);
        }
        else if (characterType == type2.getType) {
            return new Loup(characterPseudo, 'loup', 12, 90, 1, 10, 4);
        }
        else if (characterType == type3.getType) {
            return new Escargot(characterPseudo, 'escargot', 8, 120, 1, 10, 20);
        }
        else {
            return myFighter = characterTable[Math.floor(Math.random() * characterTable.length)];
        }
    }



    // METHODE QUI AJOUTE LES PERSOS DANS LA ZONE DE COMBAT
    static initCharactersPosition(fighter, fighterDOM) {
        if (fighter.getType == 'toucan') {
            fighterDOM.classList.add('toucan');
        }
        else if (fighter.getType == 'loup') {
            fighterDOM.classList.add('loup');
        }
        else if (fighter.getType == 'escargot') {
            fighterDOM.classList.add('escargot')
        }
    }


    // METHODE STATIQUE QUI MET EN PLACE LA BARRE DE VIE ET LA VIE MAX DES PERSOS
    static initHealthBar(myFighter, enemyFighter, myMaxHealth, enemyMaxHealth, myHealthBar, enemyHealthBar) {
        let myHpCounter = document.createElement('p');
        myHpCounter.innerText = myMaxHealth;
        myHealthBar.appendChild(myHpCounter);
        myHealthBar.style.width = '100%';

        let enemyHpCounter = document.createElement('p');
        enemyHpCounter.innerText = enemyMaxHealth;
        enemyHealthBar.appendChild(enemyHpCounter);
        enemyHealthBar.style.width = '100%';

    }


    static initEnergyBar(fighter, energyBar) {
        console
        if (fighter.getType === 'loup') {
            energyBar.style.backgroundColor = '#FF3B3B'
        }
        else if (fighter.getType === 'escargot') {
            energyBar.style.backgroundColor = '#3B94FF'
        }
    }


    // METHODE STATIQUE QUI AFFICHE LES INFOS DU COMBAT
    static displayLogInfos(attacker, receiver, action, attackerDOM, armorBefore, randomizedAttack) {

        // On pointe sur l'ecran d'affichage, si il est rempli on suprimme le 1er affichage
        let displayInfos = document.getElementById('display_infos');
        // if (displayInfos.childElementCount >= 5) {
        //     displayInfos.removeChild(displayInfos.childNodes[1]);
        // }

        let nameAttacker = attacker.getName.toUpperCase();
        let nameReceiver = receiver.getName.toUpperCase();
        let myNameStyle;
        let enemyNameStyle;

        if (attackerDOM.id === 'myFighter') {
            myNameStyle = '<span> ' + nameAttacker + '</span>';
            nameAttacker = myNameStyle;
            enemyNameStyle = '<span class="enemy_name">' + nameReceiver + "</span>";
            nameReceiver = enemyNameStyle;
        }
        else {
            myNameStyle = '<span> ' + nameReceiver + '</span>';
            nameReceiver = myNameStyle;
            enemyNameStyle = '<span class="enemy_name">' + nameAttacker + "</span>";
            nameAttacker = enemyNameStyle;
        }

        // On ajoute un nouveau message
        let newMessage = document.createElement("p");
        newMessage.style.padding = '5';

        let degatsEscargot = attacker.getAttack + armorBefore;

        // Si le personnage envoie une attaque basique, on affiche ces infos
        if (action == attacker.basicAttack) {
            newMessage.innerHTML = nameAttacker + " a infligé " + attacker.getAttack + " points de dégats à " + nameReceiver;
        }
        else if (action == attacker.healthTake) {
            newMessage.innerHTML = nameAttacker + " vole  " + randomizedAttack + " points de vie à " + nameReceiver;
        }
        else if (action == attacker.bloodyDamage) {
            newMessage.innerHTML = nameAttacker + " inflige " + attacker.getAttack + " points de dégats à son adversaire. " + nameReceiver + " saigne.";
        }
        else if (action == attacker.armorExplosion) {
            newMessage.innerHTML = nameAttacker + " fait exploser son armure et inflige " + degatsEscargot + " points de dégats à " + nameReceiver;
        }

        displayInfos.appendChild(newMessage);
        displayInfos.scrollTop = displayInfos.scrollHeight;
    }



    // METHODE QUI MET A JOUR LA BARRE DE VIE A JOUR
    static displayHealthBar(fighter, healthBarDOM, maxHealth) {

        while (healthBarDOM.firstChild) {
            healthBarDOM.removeChild(healthBarDOM.firstChild);
        }

        let newHpCounter = document.createElement('p');
        newHpCounter.innerText = fighter.getHp;

        healthBarDOM.appendChild(newHpCounter);

        if (fighter.getHp > 0) {
            let calculPercent = fighter.getHp * 100 / maxHealth;
            healthBarDOM.style.width = calculPercent + '%';
        }
        else {
            newHpCounter.style.color = 'red'
            newHpCounter.innerText = 0;
            healthBarDOM.style.width = '0%';
        }

    }


    static displayEnergyBar(fighter, fighterDOM, maxEnergy) {
        let energyBarDOM;


        if (fighter.getEnergy > 10) {
            fighter.setEnergy = 10;
        }
        else if (fighter.getEnergy <= 0) {
            fighter.setEnergy = 0;
        }

        if (fighterDOM.id == "myFighter") {
            if (fighter.getEnergy >= 8) {
                document.getElementById('special_attack1').style.display = "initial";
            }
            else {
                document.getElementById('special_attack1').style.display = "none";
            }
        }


        if (fighterDOM === document.getElementById('myFighter')) {
            energyBarDOM = document.getElementById('my_special_bar');

        }
        else if (fighterDOM === document.getElementById('enemyFighter')) {
            energyBarDOM = document.getElementById('enemy_special_bar');
        }


        let calculPercent = fighter.getEnergy * 100 / maxEnergy;
        // console.log(fighter.getName, fighter.getEnergy, maxEnergy);
        energyBarDOM.style.width = calculPercent + '%';
    }



    // Affichage du game over
    static gameOver(winner, loser, winnerDOM) {
        
        document.getElementById('attack1').style.display = 'none';
        document.getElementById('special_attack1').style.display = 'none';
        document.getElementById('next_turn').style.display = 'none';

        let divGameOver = document.getElementById('gameOver');
        divGameOver.innerHTML = "";
        let msgGameOver = document.createElement('p');

        let myFighterDOM = document.getElementById('myFighter');

        if (winnerDOM === myFighterDOM) {
            msgGameOver.innerText = 'YOU WIN';
            divGameOver.classList.add('win');

        }
        else {
            msgGameOver.innerText = 'YOU LOSE';
            divGameOver.classList.add('lose');
        }

        divGameOver.appendChild(msgGameOver);
    }
}


export default Game;
