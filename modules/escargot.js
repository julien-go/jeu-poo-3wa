import Character from "./character.js";
import Game from "./game.js";

// Classe spécifique pour les escargots
class Escargot extends Character {
    constructor(name, type, attack, hp, level, energy, armor) {
        super(name, type, attack, hp, level, energy);
        this.currentArmor = armor;
    }


    get getArmor() {
        return this.currentArmor;
    }

    set setArmor(newArmor) {
        this.currentArmor = newArmor;
    }

    // ATTAQUE SPECIALE QUI INFLIGE BCP DE DEGATS MAIS QUI DETRUIT L'ARMURE
    armorExplosion(attacker, receiver, attackerDOM, receiverDOM, timeOutID, attackerHealthBar, receiverHealthBar, attackerMaxHealth, receiverMaxHealth, armorBefore) {
        if (receiver.getHp > 0) {
            receiver.setHp = receiver.getHp - armorBefore - attacker.getAttack;
            attacker.currentArmor = 0;

            if (receiver.getHp <= 0) {
                Game.gameOver(attacker.getName, receiver.getName);
            }
        }

        Game.displayLogInfos(attacker, receiver, attacker.armorExplosion, attackerDOM, armorBefore);

        attacker.animExplosion(attacker, receiver, attackerDOM, timeOutID);
    }

    animExplosion(attacker, receiver, attackerDOM, timeOutID) {

        let divExplosion = document.createElement('div');

        divExplosion.classList.add('explosion');
        attackerDOM.appendChild(divExplosion);

        window.setTimeout(function() {
            divExplosion.remove();
        }, 1000);
    }
}

export default Escargot;
