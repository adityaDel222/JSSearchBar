const matchesList = document.getElementById('matchesList');
const searchBar = document.getElementById('searchBar');

let bestMatches = [];

searchBar.addEventListener('keyup', (e) => {
    const searchStr = e.target.value.toLowerCase();
    if(searchStr.length > 0) {
        loadStats(searchStr);
    }
    else {
        loadStats();
    }
});

const loadStats = async (kw = 'a') => {
    try {
        const api_link = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + kw + '&apikey=N2MV84XW3TSNYAK0';
        const res = await fetch(api_link);
        const Stats = await res.json();
        const bestMatches = Stats['bestMatches'];
        bestMatchesLen = bestMatches.length;
        if(bestMatchesLen > 0) {
            displayStats(bestMatches);
            if(bestMatchesLen % 3 == 1 || bestMatchesLen % 3 == 2) {
                window.getComputedStyle(
                    document.querySelector('.matches-list'), ':after'
                ).getPropertyValue('flex') = 'auto';
            }
        }
        else {
            matchesList.innerHTML = `<p class="no-results">Oops! Nothing here.</p>`;
        }
    } catch (err) {
        console.error(err);
    }
};

const displayStats = (matches) => {
    let htmlString = [];
    for(let i = 0;i < matches.length; ++i) {
        htmlString += `
            <div class="match">
                <p><span>Symbol:</span><span>${matches[i]['1. symbol']}</span></p>
                <p><span>Name:</span><span>${matches[i]['2. name']}</span></p>
                <p><span>Type:</span><span>${matches[i]['3. type']}</span></p>
                <p><span>Region:</span><span>${matches[i]['4. region']}</span></p>
                <p><span>Market Open:</span><span>${matches[i]['5. marketOpen']}</span></p>
                <p><span>Market Close:</span><span>${matches[i]['6. marketClose']}</span></p>
                <p><span>Timzone:</span><span>${matches[i]['7. timezone']}</span></p>
                <p><span>Currency:</span><span>${matches[i]['8. currency']}</span></p>
                <p><span>Match Score:</span><span>${matches[i]['9. matchScore']}</span></p>
            </div>
        `;
    }
    matchesList.innerHTML = htmlString;
}

loadStats('a');