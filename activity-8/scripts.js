
async function getResult() {
    toggleLoading();
    hideError();

    try {
        let response = await fetch("https://dummyjson.com/quotes/random");
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching: ", error);
        showError(error.message);
        return "error";
    }
}


const newQuoteButtonEl = document.getElementById("getQuoteBtn");
const errorEl = document.getElementById("errorDisplay");
const loadingEl = document.getElementById("loadingIndicator");

newQuoteButtonEl.addEventListener('click', getQuote);

function getQuote() {
    containerEl.innerHTML = '';
    const result = getResult();
    result.then(res => {
        if (res !== "error") {
            //no error
            console.log("random quote:", res);
            addQuote(res);
        }
    }).catch(error => {
        console.error("Error: ", error);
        showError(error.message);
    });
}

const containerEl = document.getElementById('quoteContainer');
//create quote card HTML
function addQuote(quote) {
    toggleLoading();
    const card = document.createElement('div');
    card.classList.add('quote-card');
    card.innerHTML = `
        <p class="quote-text">${quote.quote}</p>
        <p class="quote-author">${quote.author}</p>`;
    containerEl.appendChild(card);
}

function toggleLoading() {
    loadingEl.classList.toggle("hidden");
}

function showError(error) {
    toggleLoading();
    errorEl.children[1].textContent = error;

    errorEl.classList.remove("hidden");
}
function hideError() {
    errorEl.classList.add("hidden");
}

errorEl.addEventListener('click', getQuote);