// =================
// get covid data from api and print on website.

const covidApp = {};
covidApp.init = () => {
    covidApp.getCovidCases();
    covidApp.getCovidNews();
}

covidApp.getCovidCases = () => {

    fetch('https://api.covid19api.com/summary')
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            console.log(jsonResult.Countries);
            covidApp.printCountryCases(jsonResult.Countries);
        });
}

covidApp.printCountryCases = function (arrayOfData) {
    covidApp.covidCaseData = document.querySelector('.covid-cases-data');
    arrayOfData.forEach(function (listOfDataObject) {
        covidApp.ulElement = document.createElement('ul');
        // newsApp.ulElement.classList.add("listOfCovidData");

        if (listOfDataObject.Country === 'Canada') {
            covidApp.ulElement.innerHTML = ` 
        <li>Country :  <span> ${listOfDataObject.Country}</span></li>
        <li>New Confirmed Cases : <span> ${listOfDataObject.NewConfirmed}</span></li>
        <li>New Deaths : <span> ${listOfDataObject.NewDeaths}</span></li>
        <li>Total Deaths : <span> ${listOfDataObject.TotalDeaths}</span></li>
        <li>Total Confirmed : <span> ${listOfDataObject.TotalConfirmed}</span></li>
        `;

            covidApp.covidCaseData.append(covidApp.ulElement);
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
        keywords: "Coronavirus"
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            console.log(jsonResult.news);
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
    covidApp.newsUlElement = document.querySelector(".listOfCovidNews");
    covidApp.newsUlElement.innerHtml = " ";

    arrayData.forEach((listOfArray) => {

        covidApp.listElement = document.createElement('li');
        covidApp.headerElement = document.createElement('h3');
        covidApp.imgElement = document.createElement('img');
        covidApp.paragraphElement = document.createElement('p');
        covidApp.divElement = document.createElement('div');
        covidApp.anchorElement = document.createElement('a');

        covidApp.headerElement.innerHTML = listOfArray.title;
        covidApp.imgElement.src = listOfArray.image;
        covidApp.imgElement.alt = listOfArray.title;
        covidApp.paragraphElement.innerHTML = listOfArray.description;
        covidApp.anchorElement.href = listOfArray.url;
        covidApp.anchorElement.innerHTML = `Read More`;
        covidApp.anchorElement.target = '_blank';

        covidApp.newsUlElement.appendChild(covidApp.listElement);
        covidApp.divElement.appendChild(covidApp.anchorElement);
        covidApp.listElement.append(covidApp.headerElement, covidApp.imgElement, covidApp.paragraphElement, covidApp.divElement);
    });

}
// covidApp.covidLeftBtn = document.querySelector('.covid-left-btn');
// covidApp.covidRightBtn = document.querySelector('.covid-right-btn');
// covidApp.scrollingWindow = document.querySelector('#listOfCovidNews');

// covidApp.scrollCovidNewssSection = () => {

//     covidApp.covidLeftBtn.addEventListener('click', () => {
//         covidApp.scrollingWindow.scrollLeft -= 500;
//     });

//     covidApp.covidRightBtn.addEventListener('click', (e) => {
//         covidApp.scrollingWindow.scrollLeft += 500;
//         console.log(e.target);
//     })
// }
// covidApp.scrollCovidNewssSection();


covidApp.init();