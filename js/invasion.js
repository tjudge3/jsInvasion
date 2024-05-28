let score=0;
let colors=['darkred','slategray','lightsteelblue','darkgreen','silver','steelblue'];
let gametime=setTimeout(gameOver, 10000);
/*Sounds used are public domain*/

function createUFO(){
    let newUFO=document.createElement("DIV");
    let time=Math.floor(Math.random()*6000) + 3000;
    let beginWidth=Math.floor(Math.random()*90) +3;
    let endWidth=Math.floor(Math.random()*90) +3;
    let randomColor=Math.floor(Math.random()*6);

    newUFO.classList="ufo";
    newUFO.style.setProperty('--animation-time', time + 'ms');
    newUFO.style.setProperty('--beginWidth', beginWidth + 'vw');
    newUFO.style.setProperty('--endWidth', endWidth + 'vw');
    newUFO.style.setProperty('--randomColor', colors[randomColor]);

    newUFO.onclick=hit;
    document.body.appendChild(newUFO);
}

function hit(){
    let ufo=document.querySelector(".ufo");
    let hitSound = new Audio('audio/laser.mp3'); 
    score+=1;
    document.querySelector(".score").innerHTML="Score: " + score;
    ufo.style.opacity=".1";
    hitSound.currentTime = 0; 
    hitSound.play(); 
    destroyed();
}

function removeUFO(){
    let ufo=document.querySelector(".ufo");
    if(ufo!==null){
        document.body.removeChild(ufo);
    }
}

function destroyed(){
    setTimeout(
        function(){
            removeUFO();
            createUFO();
        },300);
}

function gameOver(){
    let endSound = new Audio('audio/game-over.mp3');  
    var gameOver=score > 0 ?"Final Score: " + score : "Aliens land in DC and want to talk to the leader";
    score=0;
    removeUFO();
    endSound.play(); 
    
    let scoreElement = document.querySelector(".score"); 
    scoreElement.innerHTML=gameOver;

    let playAgainButton = document.createElement("button");
    playAgainButton.innerHTML = "Click to play again";
    playAgainButton.id="play-again-button"; 
    playAgainButton.onclick = function() {
        location.reload(); 
    };
    scoreElement.appendChild(playAgainButton);    
}