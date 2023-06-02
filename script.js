const dom = {
    results: document.querySelector('.results'),
    search: {
        input: document.querySelector('#search__input'),
        button: document.querySelector('#search__button'),
    },
    filters: {
        category: document.querySelector('#filter-category'),
        color: document.querySelector('#filter-color'),
        year: document.querySelector('#filter-year'),
        country: document.querySelector('#filter-country'),
    }
};

function generateCards(parent) {
    let code = '';
    parent.forEach(element => {
        code +=
            `
        <div class="card">
            <img class="card__img" src="${element.img}" alt="img">
            <div class="card__content">
                <h3 class="card__title">${element.title}</h3>
                <div class="card__description">${element.description}</div>
            <div class="card__info">
                <div class="card__wrapper">
                    <label>Year:</label>
                    <div id="year">${element.attributes.year}</div>
                </div>
                <div class="card__wrapper">
                    <label>Color:</label>
                    <div id="color">${element.attributes.color}</div>
                </div>
                <div class="card__wrapper">
                    <label>Country:</label>
                    <div id="country">${element.attributes.country}</div>
                </div>
                <div class="card__wrapper">
                    <label>Type</label>
                    <div id="type">${element.attributes.category}</div>
                </div>
            </div>
            <div class="card__footer">

                <div class="card__count ${element.count === 0 ? 'card__count-empty' : ''}" >
                    <label></label>
                    <div id="count">${element.count === 0 ? 'No in stock' : element.count}</div>
                </div>
                <div class="card__cost">
                    <label>Price</label>
                    <div>${element.cost}</div>
                </div>
            </div>
        </div>
    </div>        
        `;
    });
    results.innerHTML = code;
}
generateCards(cardsData);

//search of products
{
    dom.search.input.oninput = (e) => {
        let searchVal = dom.search.input.value.trim();
        let rgx = new RegExp(searchVal, 'i');
        let filteredData = cardsData.filter(item => rgx.test(item.title) || rgx.test(item.description));

        if (!filteredData) {
            console.log('gsrgfsgfs');
        } else {
            generateCards(filteredData);
        }
    };
}


//change on filter selection
const filtersType = [
    'category',
    'color',
    'year',
    'country'
];


//observ filter values changing;
const handleChangeFilter = (type) => {
    dom.filters[type].onchange = (e) => {
        const value = e.target.value;
        const filteredCards = filterCards(type, value, cardsData);
        const fullFilteredCards = checkOtherFilters(filtersType, filteredCards, type);
        generateCards(fullFilteredCards);
    };
};
filtersType.forEach(type => handleChangeFilter(type));


//filter cards on filter click;
const filterCards = (filtersType, value, cards) =>{
    dom.search.input.value = '';
    let rgx = new RegExp(value);
    const filteredCards = cards.filter(card => rgx.test(card.attributes[filtersType]));
    generateCards(filteredCards);
    return filteredCards;
};


//check filtration changes;
const checkOtherFilters = (filtersType, filteredCards, extraFiterType) =>{
    let updateFilteredCards = filteredCards;
    const filteredFiltersType = filtersType.filter(type => type !== extraFiterType);

    filteredFiltersType.forEach(type => {
        const value = dom.filters[type].value;
        const reg = new RegExp(value);
        const newFilteredCards = updateFilteredCards.filter(card => reg.test(card.attributes[type]));
        updateFilteredCards = newFilteredCards;
    });
    return updateFilteredCards;
}; 


// {
// const filterForm = document.getElementById("filter-form");
// const yearSelect = document.getElementById("year-select");
// const productSelect = document.getElementById("product-select");
// const countrySelect = document.getElementById("country-select");
// const categorySelect = document.getElementById("category-select");
// const cardContainer = document.getElementById("card-container");

// filterForm.addEventListener("submit", function(e) {
//     e.preventDefault();
//     var selectedYear = yearSelect.value;
//     var selectedProduct = productSelect.value;
//     var selectedCountry = countrySelect.value;
//     var selectedCategory = categorySelect.value;

//     cardContainer.innerHTML = "";
//     cardsData.forEach(card => {
//         var show = true;
//         var attributes = card.attributes;

//         if (selectedYear !== "all" && attributes.year !== selectedYear) {
//             show = false;
//         }
//         if (selectedProduct !== "all" && card.title !== selectedProduct) {
//             show = false;
//         }
//         if (selectedCountry !== "all" && attributes.country !== selectedCountry) {
//             show = false;
//         }
//         if (selectedCategory !== "all" && attributes.category !== selectedCategory) {
//             show = false;
//         }

//         if (show) {
//             var cardHTML = `<div class="card">
//                 <img src="${card.img}" alt="${card.title}">
//                 <h2>${card.title}</h2>
//                 <p>${card.description}</p>
//                 <p>Year: ${attributes.year}</p>
//                 <p>Color: ${attributes.color}</p>
//                 <p>Country: ${attributes.country}</p>
//                 <p>Category: ${attributes.category}</p>
//                 <p>Count: ${card.count}</p>
//                 <p>Cost: ${card.cost}</p>
//             </div>`;

//             cardContainer.innerHTML += cardHTML;
//         }
//     });
// });
// }













