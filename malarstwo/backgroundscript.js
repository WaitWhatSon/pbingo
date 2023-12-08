function createTemplate(obj, section) {
    var size = Math.random() * 50;

    obj.style.width = size + 'px';
    obj.style.height = size + 'px';

    obj.style.top = (Math.random() * section.clientHeight - 3 * size) + size + 'px';
    obj.style.left = (Math.random() * section.clientWidth - 3 * size) + size + 'px';

    section.appendChild(obj);

    setTimeout(() => {
        obj.remove();
    }, 5000);
}

function createSquare() {
    const section = document.querySelector("section");
    const square = document.createElement("span");
    createTemplate(square, section);
}

function createObject(objectImagePath) {
    const section = document.querySelector("section");
    const obj = document.createElement("img");
    obj.src = objectImagePath;
    createTemplate(obj, section);
}


var interval1, interval2, interval3;

function loadBackground() {
    interval1 = setInterval(() => createObject("PB.svg"), 150);
    interval2 = setInterval(() => createObject("paint.svg"), 150);
    interval3 = setInterval(() => createObject("brush.svg"), 150);
}

function stopBackground() {
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);

    // // clear all intervals
    // for (i = 0; i < 100; i++) {
    //     window.clearInterval(i);
    // }
}

function animationManage() {
    let checkbox = document.getElementById("animation_checkbox");
    if (checkbox.checked) {
        loadBackground();
    }
    else {
        stopBackground();
    }
}