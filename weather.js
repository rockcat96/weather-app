//variables 

const apiKey = "f3019d8ee1b6dbba3770b735143f7893"

const cityBaseURL = "https://api.openweathermap.org/geo/1.0/direct?q="

const weatherBaseURL = "https://api.openweathermap.org/data/3.0/onecall?"


//function that searches for city name and then translate it to longitude and latitude

function citySearch(city){
    const cityUrl = `${cityBaseURL}${city}&limit=1&appid=${apiKey}`
    console.log(cityUrl);//checks to see the data structure of the cityurl object

    $.ajax(cityUrl)
    .then((cityName) =>{

        const name = cityName[0].name
        const weatherUrl = `${weatherBaseURL}lat=${cityName[0].lat}&lon=${cityName[0].lon}&units=imperial&appid=${apiKey}`

        console.log(name)
        console.log(weatherUrl)//checks to see the data structure of the weatherUrl object


        $.ajax(weatherUrl)
        .then((cityObj) => {
            console.log(cityObj)//checks the city object for different data we want to pull

            const $city = $("#city")
            const $temperature = $("#temperature")
            const $feels = $("#feels")
            const $weather = $("#weather")

            $city.text(`Weather for: ${name}`)

            $temperature.text(`Temperatue: ${cityObj["current"]["temp"]}℉  `)

            $feels.text(`Feels like: ${cityObj["current"]["feels_like"]}℉  `)

            $weather.text(`Weather: ${cityObj["current"]["weather"][0]["description"]}`)


        })


    })

}


//grab the submit button and put the a click event on it

$("form").on("submit", (event) => {

    //prevent refresh
    event.preventDefault();

    //grab text from input box
    const inputText = $("input[type=text]").val()

    citySearch(inputText)

})