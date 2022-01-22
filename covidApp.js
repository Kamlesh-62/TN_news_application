// =================
// get covid data from api and print on website.

const covidApp = {};

covidApp.init = () => {
    covidApp.getCovidCases();
    covidApp.getCovidNews();
    covidApp.scrollNewsSection();
}


covidApp.getCovidCases = () => {

    fetch('https://api.covid19api.com/summary')
        .then((response) => {
            return response.json();
            console.log(response)
        })
        .then((jsonResult) => {
            // console.log(jsonResult.Countries);
            covidApp.printCountryCases(jsonResult.Countries);
        });
}

covidApp.printCountryCases = function (arrayOfData) {
    const covidCaseData = document.querySelector('.covid-cases-data');
    arrayOfData.forEach(function (listOfDataObject) {
        const ulElement = document.createElement('ul');

        const { Country, NewConfirmed, NewDeaths, TotalDeaths, TotalConfirmed} = listOfDataObject;
        
        if (Country === 'Canada') {
            ulElement.innerHTML = ` 
        <li>Country :  <span> ${Country}</span></li>
        <li>New Confirmed Cases : <span> ${NewConfirmed}</span></li>
        <li>New Deaths : <span> ${NewDeaths}</span></li>
        <li>Total Deaths : <span> ${TotalDeaths}</span></li>
        <li>Total Confirmed : <span> ${TotalConfirmed}</span></li>
        `;

            covidCaseData.append(ulElement);
        }
    })
}
// ===========================================
// get covid news form api and print on website

covidApp.getCovidNews = () => {

    const url = new URL(`https://api.currentsapi.services/v1/search`);

    url.search = new URLSearchParams({
        apiKey: 'VpaSlI0YYaZk22ge-D1h3V7o9BJAWxOC0J0AOg2fwQAqIS9L',
        language: "en",
        keywords: "Covid",
        country: "CA"
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            // console.log(jsonResult.news);
            covidApp.filterListOfArray(jsonResult.news)
            covidApp.printCovidNews(covidApp.filteredData);

        });
}
covidApp.filteredData = []; 

covidApp.filterListOfArray = (arrayData) => {
    covidApp.filteredData = arrayData.filter((listOfArray) => {
        return listOfArray = listOfArray.image !== "None";
    });
} 

covidApp.printCovidNews = (arrayData) => {
    const newsUlElement = document.querySelector(".listOfCovidNews");
    newsUlElement.innerHtml = " ";

    arrayData.forEach((listOfArray) => {

        const { title, image, description, url } = listOfArray


        const listElement = document.createElement('li');
        const headerElement = document.createElement('h3');
        const imgElement = document.createElement('img');
        const paragraphElement = document.createElement('p');
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');

        headerElement.innerHTML = title;
        imgElement.src = image;
        imgElement.alt = title;
        paragraphElement.innerHTML = description;
        anchorElement.href = url;
        anchorElement.innerHTML = `Read More`;
        anchorElement.target = '_blank';

        newsUlElement.appendChild(listElement);
        divElement.appendChild(anchorElement);
        listElement.append(headerElement, imgElement, paragraphElement, divElement);
    });

}
covidApp.scrollNewsSection = () => {
    const newsWindow = document.querySelector('#listOfCovidNews');
    const leftBtn = document.querySelector('.covid-left-btn');
    const rightBtn = document.querySelector('.covid-right-btn');

    leftBtn.addEventListener('click', () => {
        newsWindow.scrollLeft -= 350;
    });

    rightBtn.addEventListener('click', () => {
        newsWindow.scrollLeft += 350;
    })
}

covidApp.init();