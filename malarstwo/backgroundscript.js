function createTemplate(obj, section) {
    var size = Math.random() * 50;

    obj.style.width = size + 'px';
    obj.style.height = size + 'px';

    obj.style.top = (Math.random() * section.clientHeight - 2 * size) + size + 'px';
    obj.style.left = (Math.random() * section.clientWidth - 2 * size) + size + 'px';

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


function loadBackground() {
    setInterval(() => createObject("PB.svg"), 150);
    setInterval(() => createObject("paint.svg"), 150);
    setInterval(() => createObject("brush.svg"), 150);
}