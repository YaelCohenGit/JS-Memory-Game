let cards;
function initCardsArray() {
  cards = [
    { pic: "purple", id: 1, pairId: 16, isClicked: false, isPairFoud: false }, { pic: "red", id: 2, pairId: 15, isClicked: false, isPairFoud: false }, { pic: "orange", id: 3, pairId: 14, isClicked: false, isPairFoud: false }, { pic: "silver", id: 4, pairId: 13, isClicked: false, isPairFoud: false, isPairFoud: false },
    { pic: "green", id: 5, pairId: 12, isClicked: false, isPairFoud: false }, { pic: "blue", id: 6, pairId: 11, isClicked: false, isPairFoud: false }, { pic: "pink", id: 7, pairId: 10, isClicked: false, isPairFoud: false }, { pic: "gold", id: 8, pairId: 9, isClicked: false, isPairFoud: false },
    { pic: "gold", id: 9, pairId: 8, isClicked: false, isPairFoud: false }, { pic: "pink", id: 10, pairId: 7, isClicked: false, isPairFoud: false }, { pic: "blue", id: 11, pairId: 6, isClicked: false, isPairFoud: false }, { pic: "green", id: 12, pairId: 5, isClicked: false, isPairFoud: false, isPairFoud: false },
    { pic: "silver", id: 13, pairId: 4, isClicked: false, isPairFoud: false }, { pic: "orange", id: 14, pairId: 3, isClicked: false, isPairFoud: false }, { pic: "red", id: 15, pairId: 2, isClicked: false, isPairFoud: false }, { pic: "purple", id: 16, pairId: 1, isClicked: false, isPairFoud: false, isPairFoud: false }
  ];
}

//a js table - the game board
function ConnectBetweenCardsAndHTMLTable() {
  var tr, table = '';
  for (var i = 0; i < cards.length; i++) {
    tr = '';
    if (1 % 4 == 0)//i==0 ||i==4 || i==12 || i==8)//i+1%4 == 0)//0,3,7,11// מתי לרדת שורה
    {
      tr = '<tr>';
    }
    tr += '<td id=' + cards[i].id + ' class="tdCls tdClsHiddenCards" style="background-color:' + cards[i].pic + '"></td>';
    if ((i + 1) % 4 == 0)//i==15 ||i==11 || i==3 || i==7)// מתי לסגור שורה
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
  table.innerHTML = ConnectBetweenCardsAndHTMLTable(); // makes the table visible
  var tds = document.getElementsByClassName('tdCls');
  for (var i = 0; i < tds.length; i++) {
    tds[i].addEventListener('click', onCardClick)
  }
  // shuffleCards();
}

// function shuffleCards() {
//     document.querySelectorAll('.tdCls').forEach(card => {
//       let randomPos = Math.floor(Math.random() * 16);
//       for(i=0; i>15; i++){
//         document.cards[i].id = randomPos;
//         document.cards[i].pairId = 16-(document.cards[i].id);
//       }
//     });
//   }

function onCardClick() {
  start_timer();
  cards.find(c => c.id == this.id).isClicked = true;

  var clickedElementsWithoutFoundPairYet = cards.filter(card => card.isClicked && !card.isPairFoud);
  var clickedElementsWithoutFoundPairYetCounter = clickedElementsWithoutFoundPairYet == undefined ? 0 : clickedElementsWithoutFoundPairYet.length;
  this.classList.remove('tdClsHiddenCards'); //shows the color of the card
  //regarding only the cards which was clicked but their pair wasnt found yet
  if (clickedElementsWithoutFoundPairYetCounter == 2) {//regarding only the clicked cards which their pair wasn't found yet
    if (clickedElementsWithoutFoundPairYet[0].pairId == clickedElementsWithoutFoundPairYet[1].id) {
      clickedElementsWithoutFoundPairYet.forEach(e => document.getElementById(e.id).classList.add('tdClsFound'));

      let myAudio = document.querySelector('#mid_audio')
      myAudio.play()

      cards.filter(c => c.isClicked && !c.isPairFoud).forEach(e => e.isPairFoud = true); // same as: document.getElementById(clickedElements[0].id).classList.add('tdClsFound'); + document.getElementById(clickedElements[1].id).classList.add('tdClsFound');
    } else {
      // document.querySelectorAll('.tdCls').forEach(e => e.classList.add('tdClsHiddenCards'));
      //cards.forEach(card => card.isClicked = false);

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

  //   let scores_array = [];
  //   scores_array.unshift(total_score);
  //  document.getElementById('divi').innerText.forEach( item => {
  //     <li>+scores_array+</li>
  //  });
   //     document.querySelectorAll('.tdCls').forEach(card => {
//       let randomPos = Math.floor(Math.random() * 16);
//       for(i=0; i>15; i++){
//         document.cards[i].id = randomPos;
//         document.cards[i].pairId = 16-(document.cards[i].id);
//       }
//     });

    // console.log(scores_array);

    // const div = document.createElement("div");
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    // div.innerHTML = "0";
    //  t = document.body.appendChild(div);
    // t.appendChild(scores_array);

    // let winners = [
    //   { order: "first_place", name: "", minutes: 0, seconds: 0 }, { order: "second_place", name: "", minutes: 0, seconds: 0 }, { order: "third_place", name: "", minutes: 0, seconds: 0 },
    // ];
    //   winners.forEach(function (value, i) {
    //     if(winner.minutes + winner.seconds > minutes_achived + seconds_achived){
    //       winners[i].minutes = minutes_achived;
    //       winners[i].seconds = seconds_achived;
    //       break;
    //     }
    // });

    // if (minutes_achived + seconds_achived > (winners[0].minutes + winners[0].seconds))
    //   localStorage.setItem("winners", JSON.stringify(winners));
    // const allwinners = JSON.parse(localStorage.getItem('winners')) || [];
    // const winner = JSON.parse(localStorage.getItem("winners")) || [];


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

// from here logic of timer from: https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
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
// till here logic of timer


// from here date
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
setInterval(showDateTime, 0000);
// till here date


//document.getElementsByClassName('tdCls')  OR  document.querySelectorAll('.tdCls')

