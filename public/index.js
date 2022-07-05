// quotes api

const endpoint = 'https://api.quotable.io/random'
const twitterButton = document.querySelector('#js-tweet');
const newQuoteButton = document.querySelector('#js-new-quote')

const spinner = document.querySelector('#js-spinner')

newQuoteButton.addEventListener('click', getQuote)

async function getQuote() {
  // remove hidden class for spinner
  spinner.classList.remove('hidden')
  // disable get quote button
  newQuoteButton.disabled = true
  try {
    const response = await fetch(endpoint)

    if(!response.ok) {
      throw Error(response.statusText)
    }
    const json = await response.json()
    displayQuote(json.content, json.author)
    setTweetButton(json.content, json.author)
  } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote')
  } finally {
    newQuoteButton.disabled = false
    spinner.classList.add('hidden')
  }
}

function displayQuote(quote, author) {
  const quoteText = document.querySelector('#js-quote-text')
  const quoteAuthor = document.querySelector('#js-quote-author')
  quoteText.textContent = quote
  quoteAuthor.textContent = '- ' + author
}

function setTweetButton(quote, author) {
  twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - ${author}`)
}