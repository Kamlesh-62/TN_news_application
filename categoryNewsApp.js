const categoryApp = {};

categoryApp.init = () => {
    categoryApp.selectCategories();
    categoryApp.getCategoryData();
    categoryApp.scrollNewsSection();
}


categoryApp.getCategoryData = () => {
    const url = new URL('https://api.currentsapi.services/v1/available/categories');

    url.search = new URLSearchParams({
        apiKey: '2nSX705p_Cs9Dswp9q3a5tT5HwTXkTyFq6UdrhHSxVLO7Xbm',
        language: "en",
        // category : "userChoiceCategory"
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            console.log(jsonResult.categories);
            categoryApp.printCategoriesList(jsonResult.categories);
        });
}
categoryApp.printCategoriesList  = (arrayData) => {
    arrayData.forEach((listOfCategories)=> {
        categoryApp.selectElement = document.querySelector('.news-category');
        categoryApp.optionElement = document.createElement('option');

        categoryApp.optionElement.innerHTML  = `
        <option value="${listOfCategories}" selected>${listOfCategories}</option>
        `;
        // categoryApp.optionElement.innerHTML = listOfCategories;
        // categoryApp.optionElement.value = listOfCategories;

        categoryApp.selectElement.append(categoryApp.optionElement)

    })
}


// ================================================
// print  category news on website 
categoryApp.getCategoryNewsData = (userChoiceCategory) => {

        const url = new URL('https://api.currentsapi.services/v1/search');

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
                console.log(jsonResult.news)
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
    categoryApp.ulElement = document.querySelector('.listOfCategoriesNews');
    categoryApp.ulElement.innerHTML = "";
    arrayData.forEach((listOfArray) => {
        
        categoryApp.listElement = document.createElement('li');
        categoryApp.headerElement = document.createElement('h3');
        categoryApp.imgElement = document.createElement('img');
        categoryApp.paragraphElement = document.createElement('p');
        categoryApp.divElement = document.createElement('div');
        categoryApp.anchorElement = document.createElement('a');
        
        categoryApp.headerElement.innerHTML = listOfArray.title;
        categoryApp.imgElement.src = listOfArray.image;
        categoryApp.imgElement.alt = listOfArray.title;
        categoryApp.paragraphElement.innerHTML = listOfArray.description;
        categoryApp.anchorElement.href = listOfArray.url;
        categoryApp.anchorElement.innerHTML = `Read More`;
        categoryApp.anchorElement.target = '_blank';
        
        categoryApp.ulElement.appendChild(categoryApp.listElement);
        categoryApp.divElement.appendChild(categoryApp.anchorElement);
        categoryApp.listElement.append(categoryApp.headerElement, categoryApp.imgElement, categoryApp.paragraphElement, categoryApp.divElement);
        
    })
} 
categoryApp.getCategoryNewsData("sports");

categoryApp.selectCategories = () => {
    const formElement = document.querySelector('#home-form');
    categoryApp.categoryTitle = document.querySelector(".category-title");
    
    formElement.addEventListener("change", () =>{
        categoryApp.selectedOption = document.querySelector("#news-category").value;
        categoryApp.getCategoryNewsData(categoryApp.selectedOption);
        categoryApp.categoryTitle.innerHTML = categoryApp.selectedOption;
        console.log(categoryApp.categoryTitle);
    })
}

categoryApp.scrollNewsSection = () => {
    categoryApp.newsWindow = document.querySelector('#categories-news-box');
    categoryApp.categoryLeftBtn = document.querySelector('.category-left-btn');
    categoryApp.categoryRightBtn = document.querySelector('.category-right-btn');

    categoryApp.categoryLeftBtn.addEventListener('click', () => {
        categoryApp.newsWindow.scrollLeft -= 350;
    });

    categoryApp.categoryRightBtn.addEventListener('click', () => {
        categoryApp.newsWindow.scrollLeft += 350;
    })
}

categoryApp.init();