import Character from "./character.js";
import Game from "./game.js";

// Classe spécifique pour les toucans
class Toucan extends Character {
    constructor(name, type, attack, hp, level, energy, specialAttack, esquive) {
        super(name, type, attack, hp, level, energy);
        this.currentSpecialAttack = specialAttack;
        this.currentEsquive = esquive;
    }

    healthTake(attacker, receiver, attackerDOM, receiverDOM, timeOutID) {
        let attack = attacker.currentAttack;
        let randomizedAttackTable = [9, 10, 10, 11, 11, 12];

        let randomizedAttack = randomizedAttackTable[Math.floor(Math.random() * 6)];

        if (receiver.getHp > 0) {

            receiver.setHp = receiver.currentHp - randomizedAttack;

            attacker.setHp = attacker.currentHp + randomizedAttack;
            if (receiver.getHp <= 0) {
                console.log(receiver.getName + " est mort");
            }

            Game.displayLogInfos(attacker, receiver, attacker.healthTake, attackerDOM, 0, randomizedAttack);
        }
    }





}

export default Toucan;
