let cups = Array.from(document.getElementsByClassName("cup"));
let answer = Math.floor(Math.random() * 3);

for (let i = 0; i < cups.length; ++i) {
    cups[i].onclick = (e) => {
        cups[i].parentElement.style.animation = "MoveUp 0.2s forwards"
        let pTag = document.createElement("p");
        if (Number(cups[i].id) - 1 == answer) {
            let pText = document.createTextNode("You have won the game");
            pTag.appendChild(pText);
            cups[i].parentElement.insertBefore(pTag, cups[i]);
            for (let j = 0; j < 3; ++j) {
                cups[j].onclick = null;
            }
        } else {
            let pText = document.createTextNode("You have lost the game");
            pTag.appendChild(pText);
            cups[i].parentElement.insertBefore(pTag, cups[i]);
            for (let j = 0; j < 3; ++j) {
                cups[j].onclick = null;
            }
        }
    }
}