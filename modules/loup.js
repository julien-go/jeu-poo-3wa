import Character from "./character.js";
import Game from "./game.js";

// Classe spécifique pour les loups
class Loup extends Character {
    constructor(name, type, attack, hp, level, energy, blood) {
        super(name, type, attack, hp, level, energy);
        this.currentBlood = blood;
    }

    get getBlood() {
        return this.currentBlood;
    }

    set setBlood(newBlood) {
        this.currentBlood = newBlood;
    }


    bloodyDamage(attacker, receiver, attackerDOM, receiverDOM, timeOutID) {

        if (receiver.getHp > 0) {
            receiver.setHp = receiver.getHp - attacker.currentAttack;
            receiverDOM.classList.add("bleeding");
        }

        Game.displayLogInfos(attacker, receiver, attacker.bloodyDamage, attackerDOM);

        attacker.displayBlood(attacker, receiver, attackerDOM, receiverDOM);
        window.setTimeout(attacker.clearBloodAnim, 3000);

    }


    // Animation du sang
    displayBlood(attacker, receiver, attackerDOM, receiverDOM, timeOutID) {

        let divBlood = document.createElement('div');
        divBlood.classList.add('bloodAnim');


        receiverDOM.appendChild(divBlood);

    }


    // On enlève l'animation du sang
    clearBloodAnim(attacker, receiver, attackerDOM, receiverDOM, timeOutID) {


        let divBlood = document.querySelectorAll('.bloodAnim');

        divBlood.forEach(div => {
            div.remove();
        });
    }


    // L'ennemi saigne, il perd des points de vie durant les 3 prochains tours
    bleedingEnemy(attacker, receiver, attackerDOM, receiverDOM, timeOutID, count) {
        if (receiverDOM.classList.contains("bleeding") && count < 4) {
            count++
            let blood = attacker.getBlood;
            let randomizedBloodTable = [blood - 1, blood, blood, blood + 1, blood + 1];
            let randomizedBlood = randomizedBloodTable[Math.floor(Math.random() * 5)];
            receiver.setHp = receiver.getHp - randomizedBlood;
            let msgBlood = document.createElement('p');
            msgBlood.style.padding = '5';


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

            msgBlood.innerHTML = nameReceiver + " perd " + randomizedBlood + " points de vie à cause des saignements";
            document.getElementById('display_infos').appendChild(msgBlood);
        }
        else {
            receiverDOM.classList.remove("bleeding");
            count = 0;
        }

    }
}

export default Loup;
