var cards;

function initCardsArray() {
  cards = [
    { pic: "purple", id: 1, pairId: 16, isClicked: false, isPairFoud: false }, { pic: "red", id: 2, pairId: 15, isClicked: false, isPairFoud: false }, { pic: "orange", id: 3, pairId: 14, isClicked: false, isPairFoud: false }, { pic: "silver", id: 4, pairId: 13, isClicked: false, isPairFoud: false, isPairFoud: false },
    { pic: "green", id: 5, pairId: 12, isClicked: false, isPairFoud: false }, { pic: "blue", id: 6, pairId: 11, isClicked: false, isPairFoud: false }, { pic: "pink", id: 7, pairId: 10, isClicked: false, isPairFoud: false }, { pic: "gold", id: 8, pairId: 9, isClicked: false, isPairFoud: false },
    { pic: "gold", id: 9, pairId: 8, isClicked: false, isPairFoud: false }, { pic: "pink", id: 10, pairId: 7, isClicked: false, isPairFoud: false }, { pic: "blue", id: 11, pairId: 6, isClicked: false, isPairFoud: false }, { pic: "green", id: 12, pairId: 5, isClicked: false, isPairFoud: false, isPairFoud: false },
    { pic: "silver", id: 13, pairId: 4, isClicked: false, isPairFoud: false }, { pic: "orange", id: 14, pairId: 3, isClicked: false, isPairFoud: false }, { pic: "red", id: 15, pairId: 2, isClicked: false, isPairFoud: false }, { pic: "purple", id: 16, pairId: 1, isClicked: false, isPairFoud: false, isPairFoud: false }
  ];
}

function ConnectBetweenCardsAndTable() {
  var tr, table = '';
  for (let i = 0; i < cards.length; i++) {
    tr = '';
    if (1 % 4 == 0)//0,3,7,11  when to go down a line
    {
      tr = '<tr>';
    }
    tr += '<td id=' + cards[i].id + ' class="tdCls tdClsHiddenCards" style="background-color:' + cards[i].pic + '"></td>';
    if ((i + 1) % 4 == 0)// when to close a line
    {
      tr += '</tr>';
    }
    table += tr;
  }
  return table;
}

function onPageLoad() {
  initCardsArray();
  var table = document.getElementById("tblMemeryGameMain");
  table.innerHTML = ConnectBetweenCardsAndTable();
  var tds = document.getElementsByClassName('tdCls');
  for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener('click', onCardClick)
  }
}

function onCardClick() {
  start_timer();
  cards.find(c => c.id == this.id).isClicked = true;

  var clickedElementsWithoutFoundPairYet = cards.filter(card => card.isClicked && !card.isPairFoud);
  var clickedElementsWithoutFoundPairYetCounter = clickedElementsWithoutFoundPairYet == undefined ? 0 : clickedElementsWithoutFoundPairYet.length;
  this.classList.remove('tdClsHiddenCards'); //shows the color of the card
  if (clickedElementsWithoutFoundPairYetCounter == 2) { //regarding only the clicked cards which their pair wasn't found yet
    if (clickedElementsWithoutFoundPairYet[0].pairId == clickedElementsWithoutFoundPairYet[1].id) {
      clickedElementsWithoutFoundPairYet.forEach(e => document.getElementById(e.id).classList.add('tdClsFound'));

      let myAudio = document.querySelector('#mid_audio')
      myAudio.play()

      cards.filter(c => c.isClicked && !c.isPairFoud).forEach(e => e.isPairFoud = true); 
    } else {
      setTimeout(function () {
        clickedElementsWithoutFoundPairYet.forEach(e => document.getElementById(e.id).classList.add('tdClsHiddenCards'));
        cards.filter(e => !e.isPairFoud && e.isClicked).forEach(e => e.isClicked = false);
      }, 200);
    }
  }

  let x = document.querySelectorAll('.tdClsHiddenCards');
  if (x.length == 0) {
    let endAudio = document.querySelector('#end_audio')
    endAudio.play()
    pause();
    minutes_achivement = document.getElementById('minute').innerText = returnData(minute);
    minutes_achived = minutes_achivement % 10; // remove Unnecessary zero
    seconds_achived = document.getElementById('second').innerText = returnData(second);
    milliseconds_achived = document.getElementById('millisecond').innerText = returnData(millisecond);
    total_score = minutes_achived + seconds_achived;
    alert('You Won! your score is ' + minutes_achived + ' minutes plus ' + seconds_achived + ' seconds!');
    var retVal = confirm("Do you want to play again ?");
    if (retVal == true) {
      onPageLoad();
      reset_timer();
      return true;
    } else {
      return false;
    }
  }
}

//#region timer logic
//from: https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.pause.onclick = () => pause();
function start_timer() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
  }
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);

  let y = document.getElementById('minute').innerHTML;
  if (y >= 5) { //if the user didnt find all the pairs after 5 minutes - time up
    let endAudio = document.querySelector('#loser_audio')
    endAudio.play()
    alert('Time Up! Game Over');
    // now we need to take the user to the menue page
  }
}

function returnData(input) {
  return input > 10 ? input : '0' + input;
}

function reset_timer() {
  minute = 0;
  second = 0;
  millisecond = 0;
}
//#endregion

//#region Date
function showDateTime() {
  var myDiv = document.getElementById("myDiv");

  var date = new Date();
  var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var dayName = dayList[date.getDay()];
  var monthName = monthNames[date.getMonth()];
  var today = `${dayName}, ${monthName} ${date.getDate()}, ${date.getFullYear()}`;

  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  var time = hour + ":" + min + ":" + sec;
  myDiv.innerText = ` Bs"d, Today is  ${today}. Time is ${time}`;
}
setInterval(showDateTime, 0);
//#endregion



//document.getElementsByClassName('tdCls')  OR  document.querySelectorAll('.tdCls')

