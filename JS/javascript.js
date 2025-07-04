var citiesweather = [] ;

function displaycitiesweather(city)
{   
var request = new XMLHttpRequest();
request.open("get",`https://api.weatherapi.com/v1/forecast.json?key=90d781eecfa5447d8b1112952250207&q=${city}&days=3`) ;
request.send();
request.addEventListener("loadend",function(){
    if(request.status>=200&&request.status<300)
    {  
        citiesweather = JSON.parse(request.response); 

       var container = [];
        container = citiesweather.forecast.forecastday;

        var array = "" ; 

        for(var i = 0;i<container.length;i++)
        {
           var dateobject = new Date(container[i].date);
           var dayname = dateobject.toLocaleDateString("en-us",{weekday:"long"}) ;
           var dateofday = dateobject.toLocaleDateString("en-US", { day: "2-digit", month: "long", }) ;
         
        if(i===0)
        { array+=` <div class="col-md-4"> 
            <div>
               <div class="p-2 d-flex justify-content-between colors text-secondary" > 
                  <div> 
                  <h5>${dayname} 
                  </h5> 
                  </div>

                   <div> 
                   <h5>${dateofday} 
                   </h5> 
                   </div>
               </div>

               <div class="div-color ps-3">
                 <h3 class="text-white">${citiesweather.location.name}</h3>
                <h1 class="text-white">${container[i].day.avgtemp_c}Celsius</h1>
                <div class="pt-2">
                  <img src="https:${container[i].day.condition.icon}"> 
                </div> 
                <h5 class="text-info fs-4">${container[i].day.condition.text}</h5>  
                <div class="d-flex gap-5 text-secondary ">  
                  <div class="ms-2 d-flex justify-content-center align-items-center gap-1">
                    <div>
                      <i class="fa-solid fa-umbrella"></i>
                    </div>
                    <div>
                      <h6>${container[i].day.daily_chance_of_rain} %</h6>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center align-items-center gap-1">
                    <div>
                     <i class="fa-solid fa-wind"></i>
                    </div>
                    <div>
                      <h6>${container[i].day.maxwind_kph} km/h</h6>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center align-items-center gap-1">
                    <div>
                     <i class="fa-solid fa-compass"></i>
                    </div>
                    <div>
                      <h6>${citiesweather.current.wind_dir}</h6>
                    </div>
                  </div>
                </div>
               </div> 
            </div>
        </div>` ;
        } 
        else if(i===1)
        {
        array+=` <div class="col-md-4">
          <div>
            <div class="p-1 text-secondary  div-color">
              <h5 class="text-center">${dayname}</h5>
            </div>
            <div class="text-center div-properties mid-div-color">  
              <img src="https:${container[i].day.condition.icon}">
               <h2 class="text-white">${container[i].day.maxtemp_c} celsius</h2>
               <h6 class="text-secondary ">${container[i].day.mintemp_c} celsius</h6>
               <h5 class="text-info">${container[i].day.condition.text}</h5>
            </div>
          </div>
        </div>`;
        }
        else 
        {
            array+=` <div class="col-md-4">
          <div>
            <div class="p-1 text-secondary  colors">
              <h5 class="text-center">${dayname}</h5>
            </div>
            <div class="text-center div-properties div-color">  
              <img src="https:${container[i].day.condition.icon}">
               <h2 class="text-white">${container[i].day.maxtemp_c} celsius</h2>
               <h6 class="text-secondary ">${container[i].day.mintemp_c} celsius</h6>
               <h5 class="text-info">${container[i].day.condition.text}</h5>
            </div>
          </div>
        </div>`;
        }

        } 

        document.querySelector(".row.p-5").innerHTML = array ;
    }
})
}


window.addEventListener("load", function ()  
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }  
  else  
  {
    alert("Geolocation is not supported by this browser.");
  }
});

function successCallback(position) 
{
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  displaycitiesweather(`${latitude},${longitude}`);
}

function errorCallback()  
{
  alert("Unable to get your location.");
}



