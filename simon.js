// two array for sequences
let gameseq = [];
let userseq = [];

let btns = ["one","two","three","four"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let highscore = 0;

document.addEventListener("keypress",function(){
    if(started == false)
    {
        started = true;

        levelup();
    }
    h3.innerHTML = "";
});

function gameFlash(btn){
    btn.classList.add("flash");
    // remove class after some time to make flash visible 
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    // remove class after some time to make flash visible 
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq =[];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    gameFlash(randbtn);
}

function checkAns(idx){
    
    if(userseq[idx] === gameseq[idx])
    {
        if(userseq.length == gameseq.length){
            setTimeout(levelup, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start the game`;
        highscore = highest(highscore,level);
        h3.innerHTML = `<b>Highest Score is: ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnpress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function highest(high,level){
    // let high = 0;
    if(level > high)
    {
        high = level;
    }
    return high;
}