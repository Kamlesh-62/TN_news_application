// global object
const newsApp = {}; 
newsApp.init = () =>{

}

newsApp.url = 'https://api.currentsapi.services/v1/';

newsApp.userSearchGetNews = (userInput) =>{

const url = new URL('https://api.currentsapi.services/v1/search');

url.search = new URLSearchParams({
    apiKey: 'Kt9jlerS23m4XmNMBGn8BajZA7NdUlj6qsEjoyPfhzsBbQ6T',
    language: "en",
    keywords: userInput,
});

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        // console.log(jsonResult.news);
        newsApp.filterListOfArray(jsonResult.news)
        newsApp.printUserSearchData(newsApp.filteredData);
    });
}

// create empty array, to fill data with image only and ignore data without image
newsApp.filteredData = [];
// create function which only return data which has a image ulr, otherwise ignore that data.
newsApp.filterListOfArray = (arryData) => {
    newsApp.filteredData = arryData.filter((listOfArray) => {
        return listOfArray = listOfArray.image !== "None";
    });
}
// create function which will print data on website......
newsApp.printUserSearchData = (arryData) =>{
    const ulElement = document.querySelector('.listOfUserSearchNews');
    ulElement.innerHTML = "";
    arryData.forEach((listOfArray) => {
        
        const listElement = document.createElement('li');
        const headerElement = document.createElement('h3');
        const imgElement = document.createElement('img');
        const paragraphElement = document.createElement('p');
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        
        headerElement.innerHTML = listOfArray.title;
        imgElement.src = listOfArray.image;
        imgElement.alt = listOfArray.title;
        paragraphElement.innerHTML = listOfArray.description;
        anchorElement.href = listOfArray.url;
        anchorElement.innerHTML = `Read More`;
        anchorElement.target = '_blank'; 


        ulElement.appendChild(listElement);
        divElement.appendChild(anchorElement);
        listElement.append(headerElement, imgElement, paragraphElement,divElement); 

    })
} 
newsApp.userSearchGetNews("world");

// Event listener for user search input and get data accordingly user's choice....
newsApp.getUserSearch = () => {
    const form = document.querySelector('#home-form');
    const searchInput = document.querySelector('.search-input').value;
    searchInput.value = "";
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        newsApp.userSearchGetNews( searchInput);
    })    
}
newsApp.getUserSearch();
newsApp.init();