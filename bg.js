const IMG_NUMBER = 5;


function paintImage(randomNumber){
    image = `url(images/${randomNumber + 1 }.jpg)`;
    document.body.style.backgroundImage = image
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;    
    }


function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
