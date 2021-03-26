function OsCheck(){
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1 || 
    window.navigator.userAgent.indexOf("Windows NT 6.3") != -1 || 
    window.navigator.userAgent.indexOf("Windows NT 6.2") != -1 ||
    window.navigator.userAgent.indexOf("Windows NT 6.1") != -1 ||
    window.navigator.userAgent.indexOf("Windows NT 5.1") != -1 ||
    window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) return 0;
    else if (window.navigator.userAgent.indexOf("Mac") != -1) return 1;
    else if (window.navigator.userAgent.indexOf("X11") != -1 ||
    window.navigator.userAgent.indexOf("Linux") != -1) return 3;
    else return 4;
}

function download() {
    let os = OsCheck();
    if (os == 1) {
        document.getElementById("mac").click();
    } else if (os == 0) {
        document.getElementById("windows").click();
    } else {
        alert("You computer does not support this game");
    }
}