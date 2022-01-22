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
    const newsWindow = document.querySelector('#user-search-news');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    
    leftBtn.addEventListener('click', () => {
        newsWindow.scrollLeft -= 350;
    });
    
    rightBtn.addEventListener('click', () => {
        newsWindow.scrollLeft += 350;
    })
}

// ================
// global functions are end here


// following function for get data from API.
newsApp.url = 'https://api.currentsapi.services/v1/';

newsApp.userSearchGetNews = (userInput) =>{
    
    const url = new URL(`${newsApp.url}search`);
    
    url.search = new URLSearchParams({
        apiKey: 'VpaSlI0YYaZk22ge-D1h3V7o9BJAWxOC0J0AOg2fwQAqIS9L',
        language: "en",
        keywords: userInput
    });
    
    fetch(url)
    .then((response) => {
        // console.log(response);
        return response.json();

    })
    .then((jsonResult) => {
        // console.log(jsonResult.news);
        newsApp.filterListOfArray(jsonResult.news)
        newsApp.printUserSearchData(newsApp.filteredData);
        newsApp.printErrorMsg (newsApp.filteredData);
    });
}

newsApp.printErrorMsg = (array) => {
    const errorMsg = document.querySelector('#error-msg');
    console.log(array.length);
    if(array.length < 1){
        errorMsg.classList.remove('hide');
    }
}

// create function which will print data on website......
newsApp.printUserSearchData = (arrayData) =>{
    const ulElement = document.querySelector('.listOfUserSearchNews');
    ulElement.innerHTML = "";
    arrayData.forEach((listOfArray) => {
        const { title, image, description, url} = listOfArray
        
        const listElement = document.createElement('li');
        const headerElement = document.createElement('h3');
        const imgElement = document.createElement('img');
        const paragraphElement = document.createElement('p');
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        
        
        headerElement.innerHTML =  title;
        imgElement.src = image;
        imgElement.alt = title;
        paragraphElement.innerHTML = description;
        anchorElement.href = url;
        anchorElement.innerHTML = `Read More`;
        anchorElement.target = '_blank';
        
        ulElement.appendChild(listElement);
        divElement.appendChild(anchorElement);
        listElement.append(headerElement, imgElement, paragraphElement, divElement); 
    })
} 


// Event listener for user search input and get data accordingly user's choice....
newsApp.getUserSearch = () => {
    const form = document.querySelector('#home-form');
    const searchOutPutValue = document.querySelector('.search-output');
    form.addEventListener('submit', (event) => {
        const searchInput = document.querySelector('.search-input').value;
        newsApp.userSearchGetNews(searchInput);
        searchOutPutValue.innerHTML = searchInput;
        event.preventDefault();
    })    
}

// newsletter page 

const newsLetterPage = document.querySelector('.news-letter');
const overLay = document.querySelector('#overlay');
const closeBtn = document.querySelector('.time');

setTimeout(() => {
    newsLetterPage.classList.add('appear');
    overLay.classList.add('show');
    console.log('hey');
}, 2000);

newsApp.closeNewsLetterWindow = () => {

    closeBtn.addEventListener('click' ,() => {
        newsLetterPage.classList.remove('appear');
        overLay.classList.remove('show');
    })
}
newsApp.closeNewsLetterWindow();

// newsApp.init();
