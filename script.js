
const apikey='f98080a35ef7a659e4dce6e29062557f';

window.addEventListener("load",()=>{
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `http://api.openweathermap.org//data//2.5//weather?q=delhi&appid=${apikey}`;
            fetch(url).then(res=>{
                return res.json()
            }).then((data)=>{
                console.log(data);
                weatherReport(data)
            })
        })
    }
})

document.getElementById('search').addEventListener('click', ()=>{
    var place = document.getElementById('input').value;
    
    var urlsearch = `http://api.openweathermap.org//data//2.5//weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch).then(res=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
        weatherReport(data)
    })

})


function weatherReport(data){
  var urlcast = `http://api.openweathermap.org//data//2.5//forecast?q=${data.name}&` +
    `appid=${apikey}`;

    fetch(urlcast).then(res=>{
        return res.json()
    }).then((forecast)=>{
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);

        document.getElementById('city').
        innerText = data.name + ',' + data.sys.country;

        document.getElementById('temprature').
        innerText = Math.floor(data.main.temp-273) + '°C';

        document.getElementById('clouds').
        innerText = data.weather[0].description;

        let icon = data.weather[0].icon;
        // let iconurl = "http://api.openweathermap.org/img/w/" + icon + ".png";
        // document.getElementById('img').src= iconurl;

    })
}

function hourForecast(forecast){
  document.querySelector('.templist').
  innerHTML='';
  for(let i=0;i<5;i++){
    var date = new Date(forecast.list[i].dt*1000);

    let hourR = document.createElement('div');
    hourR.setAttribute('class','next');

    let div = document.createElement('div');
    let time = document.createElement('p');
    time.setAttribute('class','time');
    time.innerText = (date.toLocaleTimeString(undefined, 'Asia/kolkata')).replace(':00','');

    let temp = document.createElement('p');
    temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + '/' + Math.floor(forecast.list[i].main.temp_min - 273);
     
     div.appendChild(time);
     div.appendChild(temp);
 
     let desc = document.createElement('p');
     desc.setAttribute('class', 'desc');
     desc.innerText = forecast.list[i].weather[0].description;

     hourR.appendChild(div);
     hourR.appendChild(desc);

     document.querySelector('.templist').appendChild(hourR);
  }
}

function dayForecast(forecast){
   document.querySelector('.weekf').
   innerHTML = '';

   for(let i=8;i<forecast.list.length;i+=8){
    console.log(forecast.list[i]);
    let div = document.createElement('div');
    div.setAttribute('class', 'dayF');

    let day = document.createElement('p');
    day.setAttribute('class', 'date');
    day.innerText = new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/kolkata');
    div.appendChild(day);

    let temp = document.createElement('p');
    temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + '/' + Math.floor(forecast.list[i].main.temp_min - 273) + '°C';
    div.appendChild(temp);

    let description = document.createElement('p');
    description.setAttribute('class','description')
    description.innerText = forecast.list[i].weather[0].description;
    div.appendChild(description);
    document.querySelector('.weekf').appendChild(div);
   }
}