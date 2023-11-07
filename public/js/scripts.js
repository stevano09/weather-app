

const form = document.querySelector('form')
const cityInput = document.querySelector('.city-input')
const cityButton = document.querySelector('.search-btn')
const currentButton = document.querySelector('.location-btn')
const currentContainer = document.querySelector('.current-weather')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const weatherContainer = document.querySelector('.weather-data')
const cardsContainer = document.querySelector('.weather-cards')
const details = document.querySelector('.details')

let state = 0;

cityButton.addEventListener('click', (e) => {
    e.preventDefault();

    const address = cityInput.value;

    msgOne.textContent = "Loading..."
    msgTwo.textContent = 'Please Wait'

    fetch(`http://localhost:3000/weather?search=${address}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = 'Error'
            msgTwo.textContent = data.error
        }

        else{
            msgOne.textContent = ''
            msgTwo.textContent = ''
            weatherContainer.classList.remove('hidden')
            renderData(data);
        }
    })
})
})

currentButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    msgOne.textContent = "Loading..."
    msgTwo.textContent = 'Please Wait'
    let latitude
    let longitude
        
    if (!navigator.geolocation) {
        msgOne.textContent = "Error"
        msgTwo.textContent = 'Cannot get yout position'
    }

    else{
        navigator.geolocation.getCurrentPosition((position)=>{
                latitude = position.coords.latitude,
                longitude = position.coords.longitude
        fetch(`http://localhost:3000/weather?current=${longitude}%${latitude}`).then((response) => {
        console.log(response);
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = 'Error'
                msgTwo.textContent = data.error
            }
    
            else{
                msgOne.textContent = ''
                msgTwo.textContent = ''
                // console.log(data);
                weatherContainer.classList.remove('hidden')
                renderData(data);
            }
            })
        })
    })
}


    
    
})

const renderData = (data) => {
    let icon
    let icon1

    switch (data.current.code) {
        case 0:
            icon = './img/0.png'
            break
        case 1:
            icon = './img/1.png'    
            break
        case 2:
            icon = './img/2.png'
            break
        case 3:
            icon = './img/3.png'
            break
        case 45:
            icon = './img/45.png'
            break
        case 48:
            icon = './img/45.png'
            break
        case 51:
            icon = './img/80.png'
            break
        case 53:
            icon = './img/80.png'
            break
        case 55:
            icon = './img/80.png'
            break
        case 61:
            icon = './img/80.png'
            break
        case 63:
            icon = './img/81.png'
            break
        case 65:
            icon = './img/82.png'
            break
        case 66:
            icon = './img/66.png'
            break
        case 67:
            icon = './img/66.png'
            break
        case 71:
            icon = './img/71.png'
            break
        case 73:
            icon = './img/71.png'
            break
        case 75:
            icon = './img/71.png'
            break
        case 80:
            icon = './img/80.png'
            break
        case 81:
            icon = './img/81.png'
            break
        case 82:
            icon = './img/82.png'
            break
        case 95:
            icon = './img/90.png'
            break
        case 96:
            icon = './img/90.png'
            break
        case 99:
            icon = './img/90.png'
            break
        default:
            break;
    }

    currentContainer.querySelector('#loc').textContent = data.location
    currentContainer.querySelector('#temp').textContent = `Temperature: ${data.current.temp}°C`
    currentContainer.querySelector('#wind').textContent = `Wind: ${data.current.wind} M/S`
    currentContainer.querySelector('#humy').textContent = `Humidity: ${data.current.humy}%`
    currentContainer.querySelector('#rain').textContent = `Rain: ${data.current.rain}mm`
    currentContainer.querySelector('#icon').src=`${icon}`

    for (let i = 2; i < 8; i++) {
        const card = document.querySelectorAll('.card')[i-2]
        switch (data.forecasts.weather_code[i]) {
            case 0:
                icon1 = './img/0.png'
                break
            case 1:
                icon1 = './img/1.png'    
                break
            case 2:
                icon1 = './img/2.png'
                break
            case 3:
                icon1 = './img/3.png'
                break
            case 45:
                icon1 = './img/45.png'
                break
            case 48:
                icon1 = './img/45.png'
                break
            case 51:
                icon1 = './img/80.png'
                break
            case 53:
                icon1 = './img/80.png'
                break
            case 55:
                icon1 = './img/80.png'
                break
            case 61:
                icon1 = './img/80.png'
                break
            case 63:
                icon1 = './img/81.png'
                break
            case 65:
                icon1 = './img/82.png'
                break
            case 66:
                icon1 = './img/66.png'
                break
            case 71:
                icon1 = './img/71.png'
                break
            case 73:
                icon1 = './img/71.png'
                break
            case 75:
                icon1 = './img/71.png'
                break
            case 80:
                icon1 = './img/80.png'
                break
            case 81:
                icon1 = './img/81.png'
                break
            case 82:
                icon1 = './img/82.png'
                break
            case 95:
                icon1 = './img/90.png'
                break
            case 96:
                icon1 = './img/90.png'
                break
            case 99:
                icon1 = './img/90.png'
                break
            default:
                break;
        }
        if (i === 2) {
            card.querySelector('#time').textContent = `${data.forecasts.time[i]}`
            card.querySelector('#icon').src=`${icon1}`
            card.querySelector('#temp').textContent = `Temperature: ${data.forecasts.temp_min[i]}/${data.forecasts.temp_max[i]}°C`
            card.querySelector('#wind').textContent = `Wind: ${data.forecasts.wind[i]} M/S`
            card.querySelector('#rain').textContent = `Rain: ${data.forecasts.rain[i]}mm`
            
                
        }
        else{
            card.querySelector('#time').textContent = `${data.forecasts.time[i]}`
            card.querySelector('#icon').src=`${icon1}`
            card.querySelector('#temp').textContent = `Temperature: ${data.forecasts.temp_min[i]}/${data.forecasts.temp_max[i]}°C`
            card.querySelector('#wind').textContent = `Wind: ${data.forecasts.wind[i]} M/S`
            card.querySelector('#rain').textContent = `Rain: ${data.forecasts.rain[i]}mm`
        }   
    }
}