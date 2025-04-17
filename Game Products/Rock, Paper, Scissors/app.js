var user =0;
var comp=0;
const compResult= document.getElementById("comp-result")
const playerResult = document.getElementById("player-result")
const rock = document.getElementById('rock-choice')
const paper = document.getElementById('paper-choice')
const scissor = document.getElementById('scissor-choice')
const result_div = document.getElementById('result')
const comAnnounce =document.getElementsByTagName('h2')[0]
const compRock = document.getElementById('rock-comp')
const compPaper = document.getElementById('paper-comp')
const compScissor = document.getElementById('scissor-comp')


function game(userChoices){
    const computerChoice= getComputerChoice()
    compRock.style.display = 'none';
    compPaper.style.display = 'none';
    compScissor.style.display = 'none';

    if (computerChoice === 'r') {
        compRock.style.display = 'block';
        compPaper.style.display = 'none';
        compScissor.style.display = 'none';
        compRock.style.justifyContent = 'center'
    } else if (computerChoice === 'p') {
        compPaper.style.display = 'block';
        compRock.style.display = 'none';
        compScissor.style.display = 'none';
        compPaper.style.justifyContent = 'center'
    } else {
        compScissor.style.display = 'block';
        compRock.style.display = 'none';
        compPaper.style.display = 'none';
        compScissor.style.justifyContent = 'center'
    }
    //WIN
    if (userChoices=='r' && computerChoice =='s'){
        user++
        playerResult.textContent=user
        console.log('you win')
        result_div.textContent= 'Winner'
        comAnnounce.style.display="block"
        result_div.style.display = 'block'

    }else if (userChoices=='p' && computerChoice =='r'){
        user++
        playerResult.textContent=user
        console.log('you win')
        result_div.textContent= 'Winner'
        result_div.style.display = 'block'
        comAnnounce.style.display='block'

    }else if (userChoices=='s' && computerChoice =='p'){
        user++
        playerResult.textContent=user
        console.log('you win')
        result_div.textContent= 'Winner'
        result_div.style.display = 'block'
        comAnnounce.style.display='block'
    }
    //draw
    else if (userChoices=='r' && computerChoice =='r'){
        console.log('draw')
        result_div.textContent= 'Draw'
        comAnnounce.style.display="block"
        result_div.style.display = 'block'

        
    }else if (userChoices=='p' && computerChoice =='p'){
        console.log('drAW')
        result_div.textContent= 'Draw'
        comAnnounce.style.display="block"
        result_div.style.display = 'block'
        
    }else if (userChoices=='s' && computerChoice =='s'){
        console.log('drAW')
        result_div.textContent= 'Draw'
        result_div.style.display = 'block'
        comAnnounce.style.display='block'
    }
    //Lose
    else if (userChoices=='r' && computerChoice =='p'){
        comp++
        compResult.textContent=comp
        console.log('lose')
        result_div.textContent= 'Loser'
        comAnnounce.style.display="block"
        result_div.style.display = 'block'

        
    }else if (userChoices=='p' && computerChoice =='s'){
        comp++
        compResult.textContent=comp
        console.log('lose')
        result_div.textContent= 'Loser'
        comAnnounce.style.display="block"
        result_div.style.display = 'block'
        
    }else if (userChoices=='s' && computerChoice =='r'){
        comp++
        compResult.textContent=comp
        console.log('lose')
        result_div.textContent= 'Loser'
        result_div.style.display = 'block'
        comAnnounce.style.display='block'
    }
}


function getComputerChoice(){
    const choices = ["r","p","s"];
    const random = Math.floor(Math.random()*3) //*3 get number from 0 - 3, floor to round it down.
    return choices[random];
}


function rockIcon(){
    game("r")
}
function paperIcon(){
    game("p")
}
function scissorIcon(){
    game("s")
}
