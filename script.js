var schedule = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
};
  
$(document).ready(function(){
    if(!localStorage.getItem('schedule')) {
      updateCalendar(schedule);
    } else {
      updateCalendar(JSON.parse(localStorage.getItem('schedule')));
    }
})

// created the current time
function liveTime() {
    $('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
  
setInterval(liveTime, 1000);

// changes color depending on time
var counter = 1;
  for(const property in schedule) {
    var textEntry = "#text" + counter;
    $(textEntry).text(schedule[property]);
    var timeId = "#time" + counter;
    var currentHour = moment().hour();
    var timeString = $(timeId).text();
    var timeNumber = hourNumbers(timeString);  
    if(timeNumber < currentHour) {
      $(textEntry).addClass("past");
    } else if (timeNumber > currentHour) {
      $(textEntry).addClass("future");
    } else {
      $(textEntry).addClass("present");
    }
    counter ++;
}

// button that saves text 
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
});
  
function hourNumbers(hourString) {
    switch(hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
}
  
function loadCorrectDataset() {
    result = localStorage.getItem('schedule')
    return (result ? result : schedule);
}
  
function initializeLocalStorage() {
    localStorage.setItem('schedule', JSON.stringify(schedule));
};
  
function saveToLocalStorage(dayObj) {
    localStorage.setItem('schedule', JSON.stringify(dayObj));
}
  
function saveSchedule(hourString, val) {
    if(!localStorage.getItem('schedule')) {
      initializeLocalStorage();
}
  
var workHours = JSON.parse(localStorage.getItem('schedule'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
}
  
function updateCalendar(dayObject) {
    $(".calendar").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
}