function Event() {

    //Kyle's Audio
    var KyleAudio = document.createElement("audio");
    KyleAudio.src = "Audio/Kyle Audio.mp3";
    KyleAudio.className = "Audio";
    KyleAudio.controls = "controls";
    
    //Ethan's Audio
    var EthanAudio = document.createElement("audio");
    EthanAudio.src = "Audio/Ethan Audio.mp3";
    EthanAudio.className = "Audio";
    EthanAudio.controls = "controls";

    //Paragraph on DOM
    var Paragraph = document.getElementById("Paragraph");

    //Audio
    var Audio = document.getElementsByClassName("Audio");

    //Radio Buttons
    var KyleButton = document.getElementById("Kyle");
    var EthanButton = document.getElementById("Ethan");
    var Remove = document.getElementById("Remove");

    if (KyleButton.checked === true) {
        if (Audio.length > 0) {
            for (let i = 0; i <= Audio.length; ++i) {
                Audio[i].remove();
            }
        }
        document.body.appendChild(KyleAudio);
         Paragraph.innerHTML = Words(1);
    } else if (EthanButton.checked === true) {
        if (Audio.length > 0) {
            for (let i = 0; i <= Audio.length; ++i) {
                Audio[i].remove();
            }
        }
        document.body.appendChild(EthanAudio);
        Paragraph.innerHTML = Words(2);
    } else if (Remove.checked === true) {
        Paragraph.innerHTML = " ";
        if (Audio.length > 0) {
            for (let i = 0; i <= Audio.length; ++i) {
                Audio[i].remove();
            }
        }
    }
}

function Words(Number) {
    if (Number === 1) {
        return "Kyle's Audio"
    } else if (Number === 2) {
        return "Ethan's Audio"
    } else if (Number === 3) {
        return "Alex's Audio"
    } else if (Number === 4) {
        return "Annie's Audio"
    }
}