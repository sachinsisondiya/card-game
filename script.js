let allCards= document.querySelectorAll(".card");
let hasFlipedCard=false;
let lockboard=false;
let firstCard , secondCard;

let timeInterval;
let seconds = 0;
let timeDiv = document.getElementById('timing')

let resetBtn= document.getElementById('resetButton')
let moves=0;
let countMove= document.getElementById('count')



function flipCard(){
  if(lockboard){
    return;
  }
  if(this === firstCard) return 
  this.classList.add('flip')
  if(! hasFlipedCard){
     hasFlipedCard=true
     firstCard=this
     return
  }
  secondCard=this
  lockboard=true

  
  checkForMatch();
}
function move(){
  moves++
  countMove.innerHTML = `<p class="cnt">Moves : ${moves}</p>`
}
function checkForMatch(){
  move()
  
  let match= firstCard.dataset.framework === secondCard.dataset.framework
 
  if(match){
    disabledCards()
 
  }
  else{
    unflipCards();
  
  }
  checkForWin()
}

function disabledCards(){
  firstCard.removeEventListener('click',flipCard)
  secondCard.removeEventListener('click',flipCard)
  resetBoard() 
}

function unflipCards(){
  setTimeout(function (){
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  },1500);
 
}
function resetBoard(){
  hasFlipedCard=false
  lockboard=false
  firstCard=null
  secondCard=null
}
function shuffleCards(){
  for(let i=0;i<allCards.length;i++){
    let suffle = Math.floor(Math.random()*16);
    allCards[i].style.order=suffle;
    
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
   startTimer()
   document.getElementById('resultShow').innerHTML= ""
   moves=0;
   countMove.innerHTML=""
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
  let allFlippedCrds = document.querySelectorAll('.flip').length === allCards.length
  if(allFlippedCrds){
    stopTimer()

    const hours = Math.floor(seconds/3600)
    const minutes = Math.floor((seconds%60)/60)
    const remainingSecond= seconds %60

    document.getElementById('resultShow').innerHTML= `<p class="result">Congratulations! you won the game in ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(remainingSecond)} </p>`

  }
}

function startGame(){
  startTimer()
  shuffleCards();
  for(let i=0;i<allCards.length;i++){
    allCards[i].addEventListener('click',flipCard)
  }
  btnStartGame.remove()
 
}

let btnStartGame =document.getElementById('startButton');
btnStartGame.addEventListener('click',startGame)
 
