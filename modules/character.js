import Game from "./game.js";

// Classe générique pour créer les différents personnages
class Character {
    constructor(name, type, attack, hp, level, energy) {
        this.currentName = name;
        this.currentType = type;
        this.currentAttack = attack;
        this.currentHp = hp;
        this.currentLevel = level;
        this.currentEnergy = energy;
    }

    // GET
    get getName() {
        return this.currentName;
    }
    get getType() {
        return this.currentType;
    }
    get getAttack() {
        return this.currentAttack;
    }
    get getHp() {
        return this.currentHp;
    }
    get getLevel() {
        return this.currentLevel;
    }
    get getEnergy() {
        return this.currentEnergy;
    }


    // SET
    set setName(newName) {
        this.currentName = newName;
    }
    set setType(newType) {
        this.currentType = newType;
    }
    set setAttack(newAttack) {
        this.currentAttack = newAttack;
    }
    set setHp(newHp) {
        this.currentHp = newHp;
    }
    set setLevel(newLevel) {
        this.currentLevel = newLevel;
    }

    set setEnergy(newEnergy) {
        this.currentEnergy = newEnergy;
    }


    // // // METHODES QUI APPELLENT LES DIFFERENTES PHASES DE L'ATTAQUE
    // 

    // METHODE QUI INFLIGE LES DEGATS A L'ENNEMI
    infligeDamage(receiver) {
        if (receiver.getHp > 0) {
            receiver.setHp = receiver.getHp - this.currentAttack;
        }
    }


    // METHODE QUI APPELLE L'ANIMATION D'ATTAQUE
    attackAnimation(attackerDOM) {
        if (attackerDOM.id === 'myFighter') {
            attackerDOM.classList.add('attacking_to_right');
        }
        else {
            attackerDOM.classList.add('attacking_to_left');
        }
    }

    specialAttackAnimation(attackerDOM) {
        if (attackerDOM.id === 'myFighter') {
            attackerDOM.classList.add('special_attacking_to_right');
        }
        else {
            attackerDOM.classList.add('special_attacking_to_left');
        }
    }


    // METHODE QUI REINITIALISE LA POSITION DU PERSO
    clearAnimation(attackerDOM) {
        attackerDOM.classList.remove('attacking_to_right', 'attacking_to_left', 'special_attacking_to_right', 'special_attacking_to_left');
    }


    // METHODE QUI CONTIENT TOUTE L'ATTAQUE BASIQUE
    basicAttack(attacker, receiver, attackerDOM, receiverDOM, timeOutID, attackerHealthBar, receiverHealthBar, attackerMaxHealth, receiverMaxHealth, attackerMaxEnergy, receiverMaxEnergy, gameIsOver) {

        // On anime l'attaque du sprite
        timeOutID = window.setTimeout(attacker.attackAnimation(attackerDOM), 1000);

        // On inflige des dommages à l'ennemi
        attacker.infligeDamage(receiver);

        Game.displayLogInfos(attacker, receiver, attacker.basicAttack, attackerDOM);

        Game.displayHealthBar(attacker, attackerHealthBar, attackerMaxHealth);
        Game.displayHealthBar(receiver, receiverHealthBar, receiverMaxHealth);


        Game.displayEnergyBar(attacker, attackerDOM, attackerMaxEnergy);

        Game.displayEnergyBar(receiver, receiverDOM, receiverMaxEnergy);

        if (receiver.getHp <= 0) {
            receiverDOM.classList.add('dead');
            Game.gameOver(attacker, receiver, attackerDOM);
            gameIsOver = true;
        }

        let plusEnergy = [2, 2, 3, 3, 3, 4];
        attacker.setEnergy = attacker.getEnergy + plusEnergy[Math.floor(Math.random(0, 5))];
        document.getElementById('attack1').style.display = 'none';
        document.getElementById('special_attack1').style.display = 'none';


    }



    // METHODE QUI APPELLE LES ATTAQUES SPECIALES SELON LE TYPE DE PERSO
    specialAttack(attacker, receiver, attackerDOM, receiverDOM, timeOutID, attackerHealthBar, receiverHealthBar, attackerMaxHealth, receiverMaxHealth, attackerMaxEnergy, receiverMaxEnergy, gameIsOver) {



        // On anime l'attaque du sprite
        timeOutID = window.setTimeout(attacker.specialAttackAnimation(attackerDOM), 1000);

        if (attacker.getType == 'toucan') {
            attacker.healthTake(attacker, receiver, attackerDOM, receiverDOM, timeOutID);
        }
        else if (attacker.getType == 'loup') {
            attacker.bloodyDamage(attacker, receiver, attackerDOM, receiverDOM, timeOutID);
        }
        else if (attacker.getType == 'escargot') {
            let armorBefore = attacker.getEnergy * 2;
            attacker.armorExplosion(attacker, receiver, attackerDOM, receiverDOM, timeOutID, attackerHealthBar, receiverHealthBar, attackerMaxHealth, receiverMaxHealth, armorBefore);

        }


        Game.displayHealthBar(attacker, attackerHealthBar, attackerMaxHealth);
        Game.displayHealthBar(receiver, receiverHealthBar, receiverMaxHealth);

        attacker.setEnergy = attacker.getEnergy - 8;
        Game.displayEnergyBar(attacker, attackerDOM, attackerMaxEnergy);
        Game.displayEnergyBar(receiver, receiverDOM, receiverMaxEnergy);

        if (receiver.getHp <= 0) {
            receiverDOM.classList.add('dead');
            Game.gameOver(attacker, receiver, attackerDOM);
            gameIsOver = true;
        }



        document.getElementById('attack1').style.display = 'none';
        document.getElementById('special_attack1').style.display = 'none';

    }


    // Reponse de l'ennemi, si il a assez d'energie = il envoie son attaque spé
    enemyReply(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, enemyHealthBar, myHealthBar, enemyMaxHealth, myMaxHealth, enemyMaxEnergy, myMaxEnergy, gameIsOver) {


        if (enemyFighter.getEnergy >= 8) {

            enemyFighter.specialAttack(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, enemyHealthBar, myHealthBar, enemyMaxHealth, myMaxHealth, enemyMaxEnergy, myMaxEnergy, gameIsOver);
        }
        else {
            enemyFighter.basicAttack(enemyFighter, myFighter, enemyFighterDOM, myFighterDOM, timeOutID, enemyHealthBar, myHealthBar, enemyMaxHealth, myMaxHealth, enemyMaxEnergy, myMaxEnergy, gameIsOver);
        }
        if (myFighter.getHp > 0) {
            document.getElementById('next_turn').style.display = "initial";
        }


    }


}

export default Character;
