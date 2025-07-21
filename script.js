console.log("sachin")
let allCards= document.querySelectorAll(".card");
let hasFlipedCard=false;
let lockboard=false;
let firstCard , secondCard;

let timeInterval;
let seconds = 0;
let timeDiv = document.getElementById('timing')

let resetBtn= document.getElementById('resetButton')



function flipCard(){
  if(lockboard){
    return;
  }
  this.classList.add('flip');
  if(! hasFlipedCard){
     hasFlipedCard=true;
     firstCard=true;
     return;
  }
  secondCard=this;
  lockboard=true;
}
function checkForMatch(){
  let match= firstCard.dataset.framework === secondCard.dataset.framework;
  match ? disabledCards() : unflipCards();
}

function disabledCards(){
  firstCard.removeEventListener('click',flipCard)
  secondCard.removeEventListener('click',flipCard)
}

function unflipCards(){
  setTimeout(function (){
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip')
  },1500);
}

function shuffleCards(){
  for(let i=0;i<allCards.length;i++){
    let suffle = Math.floor(Math.random()*16);
    allCards[i].style.order=suffle;
    console.log(allCards[i].style.order);
  } 
}

resetBtn.addEventListener('click',resetGame)

function resetGame(){
   for(let i=0;i<allCards.length;i++){
    allCards[i].classList.remove('flip')
    allCards[i].addEventListener('click',flipCard)
   }
   resetBoard()
   shuffleCards()
   stopTimer()
   seconds = 0
   stertTimer()
   document.getElementById('resultShow').innerHTML= "";
}
function timeFormat(time){
  return time < 10 ? `0${time}`: time;  
}
function startTimer(){
  timeInterval= setInterval(function(){
    seconds++;

    const hours = Math.floor(seconds/3600)
    const minutes= Math.floor((seconds% 3600)/60)
    const remainingSecond = seconds % 60 

    timeDiv.innerHTML =`Timer: ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(remainingSecond)}`
  },1000)
}
function stopTimer(){
  clearInterval(timeInterval);
}
function checkForWin(){
  let allFlippedCrds = document.querySelecttorAll('.flip').length === allCards.length
  if(allFlippedCrds){
    stopTimer()

    const hours = Math.floor(seconds/3600)
    const minutes = Math.floor((seconds%60)/60);
    const remainingSecond= seconds %60

    document.getElementById('resultShow').innerHTML= `Congratulations! you won the game in ${timeFormat(hours)}:${timeFormat(minutes):${timeFormat(remainingSecond)}}`
    
  }
}

 