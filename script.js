
let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value")
let climate = document.getElementById("climate")
let iconfile;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const proxy = "https://cors-anywhere.herokuapp.com/";

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const getWeather = async(city)=>{
    
        const response = await fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=354bd08c70d0732a3eeb5c0ca366af24`);

        const weatherData = await response.json();
        console.log(weatherData);
        const {name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id, main} = weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        if(id<300&&id>200){
            tempicon.src="./img/thunderstorm.png"
        }
        else if(id<400&&id>300){
            tempicon.src="./img/clouds.png"
        }
        else if(id<600&&id>500){
            tempicon.src="./img/rain.png"
        }
        else if(id<700&&id>600){
            tempicon.src="./img/snow.png"
        }
        else if(id<700&&id>800){
            tempicon.src="./img/clouds.png"
        }
        else if(id==800){
            tempicon.src="./img/sun.png"
        }
    
};


window.addEventListener("load", () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=354bd08c70d0732a3eeb5c0ca366af24`
            console.log(api);

            fetch(api).then((response) => {
                return response.json();
            })
            .then(data=>{
                const{name} = data;
                const{feels_like} = data.main;
                const {id, main} = data.weather[0];

                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                if(id<300&&id>200){
                    tempicon.src="./img/thunderstorm.png"
                }
                else if(id<400&&id>300){
                    tempicon.src="./img/clouds.png"
                }
                else if(id<600&&id>500){
                    tempicon.src="./img/rain.png"
                }
                else if(id<700&&id>600){
                    tempicon.src="./img/snowman.png"
                }
                else if(id<700&&id>800){
                    tempicon.src="./img/atmosphere.png"
                }
                else if(id==800){
                    tempicon.src="./img/sun.png"
                }
                
                console.log(data);
            })
        })
    }
})