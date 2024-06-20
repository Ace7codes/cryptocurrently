//FOR HAMBURGER MENU

const hamburgerBtn = document.querySelector('.hamburger-btn');
const hamburgerLinks = document.querySelector('.hamburger-nav-links');

let showDropDown = false;
const toggleHamburgerMenu = () => {
    if (showDropDown === true){
    hamburgerLinks.style.display = 'block';
    } else {
        hamburgerLinks.style.display = 'none';
    }
}

hamburgerBtn.addEventListener('click',() => {
    showDropDown = !showDropDown
    toggleHamburgerMenu()
    });

    //FOR PICKS
const resultSection = document.querySelector('.search-result');
resultSection.style.display = 'none';
const loading = document.querySelector('.loading');
loading.style.display = 'none';
const span = document.querySelector('.input');
const notFound = document.querySelector('.not-found');
notFound.style.display = 'none';
const pickName = document.getElementById('pick-name');
const pickImg = document.getElementById('pick-image');
const pickRank = document.getElementById('pick-rank');
const pickDetails = document.getElementById('pick-details');
const pickPrice = document.getElementById('pick-price');
const pickSymbol = document.getElementById('pick-symbol');
const priceChange = document.getElementById('pick-price-change');
const marketCap = document.getElementById('pick-market-cap');
const xFollowers = document.getElementById('pick-followership');
//endpoints to use for fetching coins is 'https://api.coingecko.com/api/v3/coins/list', then when you return it, request response.id and push that into an array to be used for the randomizer function

JSON.parse(localStorage.getItem('idArray'));
const idPresent = JSON.parse(localStorage.getItem('idArray'));
if (idPresent){
    const loadPicksFromStorage = () =>{
    const arrFromStorage = idPresent;
    const randomNumber = Math.floor(Math.random() * arrFromStorage.length)
            const randomIndex = arrFromStorage[randomNumber];
            console.log(randomIndex, randomNumber) //to check
            const getRandomCoinFacts = async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${randomIndex}?x_cg_demo_api_key=CG-t84hGN4SzHHnyzhQy3bY65pz`)
            const facts = await response.json();
            pickName.textContent = `${facts.name}`
            //consider reducing the picture from the API
            pickImg.innerHTML = `<img src=${facts.image.large} alt="coin image">`
            if (!facts.market_cap_rank){
                pickRank.textContent = `Global Rank: Not Ranked yet`
            } else{
                pickRank.textContent = `Global Rank: #${(facts.market_cap_rank).toLocaleString()}`
            };

            if (!(facts.description).en) {
                pickDetails.innerHTML = `Details are still being gathered on this`
            } else {
                pickDetails.innerHTML = `${(facts.description).en}`
            };

            if (!(facts.market_data.price_change_24h_in_currency).usd){
                priceChange.textContent =`Details are still being gathered on this`
            } else {
                priceChange.textContent = `$${((facts.market_data.price_change_24h_in_currency).usd).toLocaleString()}`
            };
            pickPrice.textContent = `$${((facts.market_data.current_price).usd).toLocaleString()}`
            pickSymbol.textContent = `${facts.symbol}`
            marketCap.textContent = `$${((facts.market_data.market_cap).usd).toLocaleString()}`
            xFollowers.textContent = `${(facts.community_data.twitter_followers).toLocaleString()}`
            }
            getRandomCoinFacts();
            }
        loadPicksFromStorage();
}else{
    const loadPicks = () => {
        const idArr = []
       const fetchIds = async () => {
            const result = await fetch('https://api.coingecko.com/api/v3/coins/list')
            const ids = await result.json();
            const coinArr = await ids;
            coinArr.forEach(coinArr => {
                idArr.push(coinArr.id)
            });
            localStorage.setItem('idArray', JSON.stringify(idArr))
            const randomNumber = Math.floor(Math.random() * idArr.length)
            const randomIndex = idArr[randomNumber];
            const getRandomCoinFacts = async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${randomIndex}?x_cg_demo_api_key=CG-t84hGN4SzHHnyzhQy3bY65pz`)
            const facts = await response.json();
            pickName.textContent = `${facts.name}`
            pickImg.innerHTML = `<img src=${facts.image.small} alt="coin image" width="50px" height="auto">`
            if (!facts.market_cap_rank){
                pickRank.textContent = `Global Rank: Not Ranked yet`
            } else{
                pickRank.textContent = `Global Rank: #${(facts.market_cap_rank).toLocaleString()}`
            }
            pickDetails.innerHTML = `${(facts.description).en}`
            pickPrice.textContent = `$${((facts.market_data.current_price).usd).toLocaleString()}`
            pickSymbol.textContent = `${facts.symbol}`
            priceChange.textContent = `$${((facts.market_data.price_change_24h_in_currency).usd).toLocaleString()}`
            marketCap.textContent = `$${((facts.market_data.market_cap).usd).toLocaleString()}`
            xFollowers.textContent = `${(facts.community_data.twitter_followers).toLocaleString()}`
            }
            getRandomCoinFacts();
            }
            fetchIds();
        };loadPicks();
}


//FOR SEARCH
const searchBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const searchName = document.getElementById('search-name');
const searchImg = document.getElementById('search-image');
const searchRank = document.getElementById('search-rank');
const searchDetails = document.getElementById('search-details');
const searchPrice = document.getElementById('search-price');
const searchSymbol = document.getElementById('search-symbol');
const searchPriceChange = document.getElementById('search-price-change');
const searchMarketCap = document.getElementById('search-market-cap');
const searchXFollowers = document.getElementById('search-followership');

async function getCoinData(coin){
   const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?x_cg_demo_api_key=CG-t84hGN4SzHHnyzhQy3bY65pz`)
    if(response.status !== 200){
        span.textContent = `${coin}`;
        notFound.style.display = 'block';
        loading.style.display = 'none';
        resultSection.style.display = 'none';
    } else {
        const information = await response.json();
        searchName.textContent = `${information.name}`;
        searchImg.innerHTML = `<img src=${information.image.large} alt=${coin}image>`
        searchRank.textContent = `Global Rank: #${information.market_cap_rank}`
        searchDetails.innerHTML = `${(information.description).en}`
        searchPrice.textContent = `$${((information.market_data.current_price).usd).toLocaleString()}`
        searchSymbol.textContent = `${information.symbol}`
        searchPriceChange.textContent = `$${((information.market_data.price_change_24h_in_currency).usd).toLocaleString()}`
        searchMarketCap.textContent = `$${((information.market_data.market_cap).usd).toLocaleString()}`
        searchXFollowers.textContent = `${(information.community_data.twitter_followers).toLocaleString()}`
        notFound.style.display = 'none';
        loading.style.display = 'none';
        resultSection.style.display = 'block';
    }
    searchBox.value = '';
}
searchBtn.addEventListener('click', ()=> {
    getCoinData(searchBox.value.toLowerCase().trim()) && (notFound.style.display = 'none',
    loading.style.display = 'block',
    resultSection.style.display = 'none');

});

