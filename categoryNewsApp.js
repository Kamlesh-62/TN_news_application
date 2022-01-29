const categoryApp = {};

categoryApp.init = () => {
    categoryApp.selectCategories();
    categoryApp.getCategoryData();
    categoryApp.scrollNewsSection();
}

categoryApp.url = 'https://api.currentsapi.services/v1/';

categoryApp.getCategoryData = () => {

    const url = new URL(`${categoryApp.url}available/categories`);

    url.search = new URLSearchParams({
        apiKey: '2nSX705p_Cs9Dswp9q3a5tT5HwTXkTyFq6UdrhHSxVLO7Xbm',
        language: "en",
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            categoryApp.printCategoriesList(jsonResult.categories);
        });
}
categoryApp.printCategoriesList  = (arrayData) => {
    arrayData.forEach((listOfCategories)=> {
        const selectElement = document.querySelector('.news-category');
        const optionElement = document.createElement('option');

        optionElement.innerHTML  = `
        <option value="${listOfCategories}" selected>${listOfCategories}</option>
        `;

        selectElement.append(optionElement)

    })
}


// ================================================
// print  category news on website 
categoryApp.getCategoryNewsData = (userChoiceCategory) => {

        const url = new URL(`${categoryApp.url}search`);

        url.search = new URLSearchParams({
            apiKey: 'VpaSlI0YYaZk22ge-D1h3V7o9BJAWxOC0J0AOg2fwQAqIS9L',
            language: "en",
            category: userChoiceCategory
        });

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                // console.log(jsonResult.news)
                categoryApp.filterListOfArray(jsonResult.news)
                categoryApp.printCategoriesNews(categoryApp.filteredData);
            });
    }

// filter data without image url
categoryApp.filteredData = [];
// create function which only return data which has a image ulr, otherwise ignore that data.
categoryApp.filterListOfArray = (arrayData) => {
    categoryApp.filteredData = arrayData.filter((listOfArray) => {
        return listOfArray = listOfArray.image !== "None";
    });
}

// print data on wesite function
categoryApp.printCategoriesNews = (arrayData) => {
    const ulElement = document.querySelector('.listOfCategoriesNews');
    ulElement.innerHTML = "";
    arrayData.forEach((listOfArray) => {

        const { title, image, description, url } = listOfArray
        console.log(image)

        const listElement = document.createElement('li');
        const headerElement = document.createElement('h3');
        const imgElement = document.createElement('img');
        const paragraphElement = document.createElement('p');
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        
        headerElement.innerHTML = truncateString(title, 65);
        imgElement.src = image;
        imgElement.alt = title;
        paragraphElement.innerHTML = truncateString(description, 120);
        anchorElement.href = url;
        anchorElement.innerHTML = `Read More`;
        anchorElement.target = '_blank';
        
        ulElement.appendChild(listElement);
        divElement.appendChild(anchorElement);
        listElement.append(headerElement, imgElement, paragraphElement, divElement);
        
    })
} 

function truncateString(string, num) {
    if (string.length <= num) {
        return string
    }
    return string.slice(0, num) + "..."
}

categoryApp.getCategoryNewsData("sports");

categoryApp.selectCategories = () => {
    const formElement = document.querySelector('select');
    const categoryTitle = document.querySelector(".category-output");
    
    formElement.addEventListener("change", () =>{
        const selectedOption = document.querySelector("#news-category").value;
        categoryApp.getCategoryNewsData(selectedOption);
        categoryTitle.innerHTML = selectedOption;
        console.log(categoryTitle);
    })
}

categoryApp.scrollNewsSection = () => {
    const newsWindow = document.querySelector('#categories-news-box');
    const categoryLeftBtn = document.querySelector('.category-left-btn');
    const categoryRightBtn = document.querySelector('.category-right-btn');

    categoryLeftBtn.addEventListener('click', () => {
        newsWindow.scrollLeft -= 350;
    });

    categoryRightBtn.addEventListener('click', () => {
        newsWindow.scrollLeft += 350;
    })
}

categoryApp.init();