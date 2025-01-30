const timeInput = document.getElementById("input");
const stopBtn = document.getElementById("stopBtn");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const errorMsg = document.getElementById("errorMsg");
const countdounDisplay = document.getElementById("countdownDisplay");
const audioAlert = document.createElement("audio");
audioAlert.src = "./alarm_beeps.mp3";

let remainingTime;
let intervalId;
let isPaused = false;

function start(){
    let minute;
    if(isPaused){
        minute = remainingTime / 60;
    }else{
         minute = parseInt(timeInput.value);
    }
    if(isNaN(minute) || minute <=0){
        errorMsg.textContent = "Enter correct Time";
        errorMsg.classList.remove("hidden");
        audioAlert.play();
        return;
    }
    errorMsg.classList.add("hidden");
    remainingTime = minute * 60;
    // update screen with the new time value
    updateScreen();
    // disable start button that avoid re-run simultiniously
    startBtn.disabled = true;
    stopBtn.disabled = false;//enable stop 
    resetBtn.disabled = false;//enable reset

    // time interval tthat call itself in every 1 sec
    intervalId = setInterval(()=>{
            remainingTime--;
            updateScreen();//update screen with updated time
        if(remainingTime <=0){
            clearInterval(intervalId);
            audioAlert.play();
        }
    },1000)
    
}
// this function is used for updating the time on screen
function updateScreen(){
    const minute = Math.floor(remainingTime/60);
    const sec = remainingTime % 60;
    countdounDisplay.textContent = `${String(minute).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}
// function for stop the timer 
function stop(){
    clearInterval(intervalId);
    isPaused = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// function to reset the timer 
function reset(){
    clearInterval(intervalId);
    countdounDisplay.textContent = "00:00";
    timeInput.value = '';
    startBtn.disabled =false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}
startBtn.addEventListener("click",start);
stopBtn.addEventListener("click",stop);
resetBtn.addEventListener("click",reset);