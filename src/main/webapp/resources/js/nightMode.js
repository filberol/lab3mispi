//Listening for night mode button and managing cookies

$(function () { loadMode() })
$("#night-mode").click(function () { changeMode(); switchMode(); });

function changeMode() {
    const mode = localStorage.getItem("mode");
    if (mode === "day") {
        localStorage.setItem("mode", "night");
    } else {
        localStorage.setItem("mode", "day");
    }
}

function loadMode() {
    const mode = localStorage.getItem("mode");
    if (mode == null) {
        localStorage.setItem("mode", "day");
    }
    if (mode === "night") {
        switchMode();
    }
}

function switchMode() {
    $("#dragger, #night-mode").toggleClass("active");
    $(".header, .header-block, .glass").toggleClass("night");
    $("body, th, td, input").toggleClass("night");
}