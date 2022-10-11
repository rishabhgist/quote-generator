// Get quote from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading 
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
async function getQuote() {
    loading();
    const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.quotes[0]);
        authorText.innerText = data.quotes[0].author;
       
        // Reduce font size for long text
        if (data.quotes[0].text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerHTML = data.quotes[0].text;
        // Stop Loader
        complete();
    } catch (error) {
        console.log('no quotes', error);
    }
}

function tweet() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweet);


// On Load
getQuote();
