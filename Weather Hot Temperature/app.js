// DO NOT SHOW API KEY ON YOUR JS FILE
const api_key = `9a942b0cc45055afd430757a47fea664`;

const loadTemperature = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayTemperature(data))
}

const displayTemperature = (data) => {
    // console.log(data);

    // set city temperature
    // const cityTemp = document.getElementById('city-temp');
    // cityTemp.innerText = data.main.temp;
    setInnerTextById('city-temp', data.main.temp);

    // set city name
    setInnerTextById('city-name', data.name);

    // set city clouds condition
    setInnerTextById('temp-condition', data.weather[0].main);
}

const setInnerTextById = (id, text) => {
    const textElement = document.getElementById(id);
    textElement.innerText = text;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const city = searchField.value;
    if (city === '') {
        alert('Empty Searh field');
    } else {
        loadTemperature(city);
    }
})



loadTemperature('dhaka');