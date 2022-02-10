// global object
const newsApp = {}; 

newsApp.init = () =>{
    newsApp.userSearchGetNews("canada");
    newsApp.getUserSearch();
    newsApp.scrollNewsSection();
    newsApp.closeNewsLetterWindow();
    showHamburgerMenu();
   
}

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
        return response.json();
        
    })
    .then((jsonResult) => {
        newsApp.filterListOfArray(jsonResult.news);
        newsApp.printUserSearchData(newsApp.filteredData);
        newsApp.printErrorMsg (newsApp.filteredData);
    }).catch((e) =>{
        console.log(e)
    })
}

// error handling function
newsApp.printErrorMsg = (array) => {
    const errorMsg = document.querySelector('#error-msg');
    if(array.length < 1){
        errorMsg.classList.remove('hide');
    }else{
        errorMsg.classList.add('hide');
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
        const dividerElement = document.createElement("div")

        
        
        headerElement.innerHTML = truncateString(title, 65);
        imgElement.src = image;
        imgElement.alt = title;
        paragraphElement.innerHTML = truncateString(description, 120);
        anchorElement.href = url;
        anchorElement.innerHTML = `Read More`;
        anchorElement.target = '_blank';
        dividerElement.classList.add("news-topic-separator")

        ulElement.appendChild(listElement);
        divElement.appendChild(anchorElement);
        listElement.append(imgElement, headerElement, dividerElement, paragraphElement, divElement); 
    })
} 
function truncateString(string,num){
    if(string.length <= num){
        return string
    }
    return string.slice(0 , num) + "..."
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

// function for landing page newsletter form function
setTimeout(() => {
    newsLetterPage.classList.add('appear');
    overLay.classList.add('show');
}, 2000);

newsApp.closeNewsLetterWindow = () => {

    closeBtn.addEventListener('click' ,() => {
        newsLetterPage.classList.remove('appear');
        overLay.classList.remove('show');
    })
}


const showHamburgerMenu = () => {
    const button = document.querySelector(".fa-bars");
    const menu = document.querySelector(".navBar-menu")

    button.addEventListener("click" ,() =>{
        menu.classList.toggle("visible");
    })
}

newsApp.init();
