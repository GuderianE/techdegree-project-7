const turnColor = document.querySelectorAll('.side-nav');
const alert = document.getElementById('alert');
const trafficLink = document.querySelectorAll('.traffic-nav-link');
const user = document.querySelector('#search-user');
const message = document.querySelector('#write-user');
const send = document.querySelector('#sendBtn');
const bell = document.querySelector('#bellSVG');
const close = document.querySelector('#close');
const hourly = document.querySelector('#hourly');
const daily = document.querySelector('#daily');
const weekly = document.querySelector('#weekly');
const monthly = document.querySelector('#monthly');
const navList = document.querySelector('.flex-wrapper');
const searchInput = document.getElementById("search-user");
const suggestionsPanel = document.querySelector(".suggestions");
let resultsCursor = 0;
let matches = [];

// notification when bell icon is clicked
const bellNotification = (element) => {
    element.innerHTML += 
    `<div class=notification>
        <ul id=close>
            <li>
            <a href=#>&#9679 you got 6 new messages</a>
            </li>
            <li>
            <a href=#>&#9679 2 incompleted task are waiting for you</a>
            </li>
        </ul>
    </div>` 
    const notification = document.querySelector('.notification');
    element.addEventListener('click', e => {
        element = e.target;
        while(element) {
        notification.style.visibility = 'visible';
        console.log('works');
        break;
        }
    });
}

bellNotification(bell);

// Update the Chart

// nested arrays for the different lineChart data
const chartDataSelector = [
    [0, 500, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250],
    [0, 200, 500, 600, 700, 550, 300, 1000, 1250, 800, 900, 400, 300],
    [0, 600, 750, 600, 500, 450, 800, 200, 400, 400, 500, 600, 1000],
    [100, 350, 200, 500, 400, 0, 100, 300, 100, 400, 300, 500, 500]
];

// function to update the Chart
const addData = (chart, data) => {
    chart.data.datasets[0].data = data;
    chart.update();
};

// function to add active class on click and to update ChartData on click
const chartSwitcher = (el) => { 
    for(let i = 0; i < el.length; i++) {
        el[i].onclick = () => {
            let elements = el[0];
            while(elements) {
                if(elements.tagName === 'LI') {
                    elements.classList.remove('active');
                }
                elements = elements.nextSibling;
            }
            el[i].classList.add('active');
                if(el[i] === hourly) {
                    console.log('works');
                    addData(myLineChart, chartDataSelector[3]);
                } else if(el[i] === daily) {
                    console.log('works');
                    addData(myLineChart, chartDataSelector[2]);
                } else if(el[i] === weekly) {
                    console.log('works');
                    addData(myLineChart, chartDataSelector[1]);
                } else if(el[i] === monthly) {
                    console.log('works');
                    addData(myLineChart, chartDataSelector[0]);
                }
        };
    }
};

chartSwitcher(trafficLink);

// Alert Banner

// Banner HTML
alert.innerHTML = 
`
<div class=alert-banner>
<div class=alert_wrapper>
<strong>Alert</strong>
<p>This is an alert message</p>
</div> 
<div class=btn_wrapper>
<button class=btn_alert type=button name=button>&times;</button>
</div>
</div>
`;

// tells Banner to disappear on click
const displayNone = (el, value) => {
el.addEventListener ('click', e => {
const element = e.target;
if(element.classList.contains(value)) {
    el.style.display = 'none';
}
});
}
displayNone(alert, 'btn_alert');

// autocomplete function
const memberArray = [
    {
      name: "Veronica Chandler",
    },
    {
      name: "Ashley Lee",
    },
    {
      name: "Fred Murford",
    },
    {
      name: "Andrew Johnson"
    }
  ];
  
  searchInput.addEventListener('keydown', function(event) {
      if(event.keyCode === 13) {
          event.preventDefault();
          console.log('yes it works');
      }
  });

  searchInput.addEventListener("keyup", function(event) {
    suggestionsPanel.innerHTML = "";
    toggleResults('hide');
    
    if(this.value.length > 0) {
      matches = getMatches(this.value);
      if(matches.length > 0){
        displayMatches(matches);
      }
    }
     if (searchInput === "") {
      suggestionsPanel.innerHTML = "";
    }
    if(suggestionsPanel.classList.contains('visible')) {
        switch(event.keyCode) {
            case 13:
                searchInput.value = suggestionsPanel.children[resultsCursor].innerHTML;
                resultsCursor = 0;
                toggleResults('hide');
                suggestionsPanel.innerHTML = "";
             case 38:
                if(resultsCursor > 0) {
                    resultsCursor--;
                    moveCursor(resultsCursor);
                }
                break;
            case 40:
                if(resultsCursor < (matches.length -1)) {
                    resultsCursor++;
                    moveCursor(resultsCursor);
                }
                break;
        }
    }
  });

  function toggleResults(action) {
    if(action === 'show') {
      suggestionsPanel.classList.add('visible', 'result');
    } else if(action === 'hide') {
      suggestionsPanel.classList.remove('visible', 'result');
    }
  };

 function getMatches (inputText) {
      const matchList = [];
      for(let i = 0; i < memberArray.length; i++) {
        if(memberArray[i].name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
          matchList.push(memberArray[i].name);
        }
      }
      return matchList;
    };

function displayMatches(matchList) {
  let j = 0;
  while(j < matchList.length) {
    suggestionsPanel.innerHTML += '<li class="result">' + matchList[j] + '</li>';
    j++;
  }
  moveCursor(resultsCursor);
  toggleResults('show');
};

   

  function moveCursor(pos) {
    for(let i = 0; i < suggestionsPanel.children.length; i++) {
      suggestionsPanel.children[i].classList.remove('highlighted');
    }
    suggestionsPanel.children[pos].classList.add('highlighted');
  };
  
  

// Chart main

// main line Chart
var lineChart = document.getElementById('myChart-1').getContext('2d');
var myLineChart = new Chart(lineChart, {
    type: 'bar',
    data: {
        labels: ['12-22', '23-29', '30-5', '6-12', '13-19','20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
        datasets: [{
            type: 'line',
            data: [100, 350, 200, 500, 400, 0, 100, 300, 100, 400, 300, 500, 500],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: '#fff',
            borderWidth: 1,
            lineTension: 0,
            borderCapStyle: 'round',
            borderJoinStyle: 'bevel',
            responsive: true,
            offset: true
        }]
    },
    
    options: {
        aspectRatio: 2.5,
        animation: {
            duration: 0
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawTicks: false,
                },
                ticks: {
                    padding: 15,
                    beginAtZero: true
                }
            }],
            yAxes: [{
                gridLines: {
                    drawTicks: false,
                     labelOffset: 30,

                },
                ticks: {
                    padding: 15
                }
            }]
        }
    }
});

// bar Chart
var barChart = document.getElementById('myChart-2').getContext('2d');
var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
    labels: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
    datasets: [{
        backgroundColor: 'rgba(102, 51, 153, 1)', 
        data:[50, 100, 175, 150, 250, 200, 120],
        borderWidth: 1,
        lineTension: 0,
        responsive: true,
        
    }]
},
options: {
    aspectRatio: 1.5,
    animation: {
        duration: 0
    },
    legend: {
        display: false,
    },
    scales: {
        xAxes: [{
            gridLines: {
                drawTicks: false,
            },
            ticks: {
                padding: 15,
            }
        }],
        yAxes: [{
            gridLines: {
                drawTicks: false,
                labelOffset: 30
            },
            ticks: {
                beginAtZero: true,
                padding: 15,
            }
        }]
    }
 }
});

// donut Cahrt
var donutChart = document.getElementById('myChart-3').getContext('2d');
var myDonutChart = new Chart(donutChart, {
    type: 'doughnut',
    data: {
    labels: ['Phones', 'Tablets', 'Desktop'],
    datasets: [{
        backgroundColor: 
        ['rgb(102, 153, 51)',
         'rgb(51, 102, 153)',
         'rgb(102, 51, 153)',    
     ],
        data:[15, 15, 70],
        scaleLineColor: 'rgb(0, 0, 0)',
        responsive: true
    }]
},
options: {
    animation: {
        duration: 0
    },
    legend: {
        display: true,
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold'
        }
    },
    labels: {

    }
 }
});
  
// alert messages when form field is not filled out properly 
send.addEventListener('click', () => {
    if (user.value === "" && message.value === "") {
        window.alert('Please fill out user and message fields before sending!');
    } else if (user.value === "") {
        window.alert('Please fill out user field before sending!');
    } else if (message.value === "") {
        window.alert('Please fill out message field before sending!');
    } else {
        window.alert(`Message successfully send to: ${user.value}`);
    }
});

// save settings to local storage
const emailNo = localStorage.getItem('email'); 
const profPub = localStorage.getItem('profile-public'); 
const timeZone = localStorage.getItem('select-timezone');

const save = document.getElementById('saveBtn');
const cancel = document.getElementById('cancelBtn');
const checkbox1 = document.getElementById('email');
const checkbox2 = document.getElementById('profile-public');
const selectedTimezone = document.getElementById('select-timezone');

function checkedStatus() {
   if (emailNo !== null) {
    checkbox1.checked = (emailNo === 'true');
   } 
   if (profPub !== null) {
    checkbox2.checked = (profPub === 'true');
   } 
   if (timeZone !== null) {
       selectedTimezone.value = timeZone;
   }
};
  
document.addEventListener('DOMContentLoaded', function() {
save.addEventListener('click', function() {

        localStorage.setItem('select-timezone', selectedTimezone.value);
    
        localStorage.setItem('email', checkbox1.checked); 
   
        localStorage.setItem('profile-public', checkbox2.checked);
 
    });
    checkedStatus();
});

cancel.addEventListener('click', function() {
    location.reload();
    localStorage.clear()
});
