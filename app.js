// global object
const newsApp = {}; 

newsApp.init = () =>{
    newsApp.userSearchGetNews("Canada");
    newsApp.getUserSearch();
    newsApp.scrollNewsSection();
   
}

// ================
// global functions are here
// create empty array, to fill data with image only and ignore data without image

newsApp.filteredData = [];
// create function which only return data which has a image ulr, otherwise ignore that data.
newsApp.filterListOfArray = (arrayData) => {
    newsApp.filteredData = arrayData.filter((listOfArray) => {
        return listOfArray = listOfArray.image !== "None";
    });
}

// left and right button functionality
newsApp.scrollNewsSection = () => {
    newsApp.newsWindow = document.querySelector('#user-search-news');
    newsApp.leftBtn = document.querySelector('.left-btn');
    newsApp.rightBtn = document.querySelector('.right-btn');
    
    newsApp.leftBtn.addEventListener('click', () => {
        newsApp.newsWindow.scrollLeft -= 350;
    });
    
    newsApp.rightBtn.addEventListener('click', () => {
        newsApp.newsWindow.scrollLeft += 350;
    })
}

// ================
// global functions are end here


// following function for get data from API.
newsApp.url = 'https://api.currentsapi.services/v1/';

newsApp.userSearchGetNews = (userInput) =>{
    
    const url = new URL('https://api.currentsapi.services/v1/search');
    
    url.search = new URLSearchParams({
        apiKey: 'VpaSlI0YYaZk22ge-D1h3V7o9BJAWxOC0J0AOg2fwQAqIS9L',
        language: "en",
        keywords: userInput
    });
    
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        newsApp.filterListOfArray(jsonResult.news)
        newsApp.printUserSearchData(newsApp.filteredData);
    });
}



// create function which will print data on website......
newsApp.printUserSearchData = (arrayData) =>{
    newsApp.ulElement = document.querySelector('.listOfUserSearchNews');
    newsApp.ulElement.innerHTML = "";
    arrayData.forEach((listOfArray) => {
        
        newsApp.listElement = document.createElement('li');
        newsApp.headerElement = document.createElement('h3');
        newsApp.imgElement = document.createElement('img');
        newsApp.paragraphElement = document.createElement('p');
        newsApp.divElement = document.createElement('div');
        newsApp.anchorElement = document.createElement('a');
        
        newsApp.headerElement.innerHTML = listOfArray.title;
        newsApp.imgElement.src = listOfArray.image;
        newsApp.imgElement.alt = listOfArray.title;
        newsApp.paragraphElement.innerHTML = listOfArray.description;
        newsApp.anchorElement.href = listOfArray.url;
        newsApp.anchorElement.innerHTML = `Read More`;
        newsApp.anchorElement.target = '_blank'; 
        
        newsApp.ulElement.appendChild(newsApp.listElement);
        newsApp.divElement.appendChild(newsApp.anchorElement);
        newsApp.listElement.append(newsApp.headerElement, newsApp.imgElement, newsApp.paragraphElement, newsApp.divElement); 
        
    })
} 



// Event listener for user search input and get data accordingly user's choice....
newsApp.getUserSearch = () => {
    const form = document.querySelector('#home-form');
    const searchOutPutValue = document.querySelector('.userSearch-outPut-Value');
    form.addEventListener('submit', (event) => {
        const searchInput = document.querySelector('.search-input').value;
        newsApp.userSearchGetNews( searchInput);
        searchOutPutValue.innerHTML = searchInput;
        event.preventDefault();
    })    
}


newsApp.init();
