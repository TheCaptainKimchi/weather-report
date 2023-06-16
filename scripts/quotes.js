// Function to get quotes
function getQuotes() {
  // Get url for quotes API (https://github.com/lukePeavey/quotable)
  let response = axios
    .get(
      "https://api.quotable.io/quotes/random?maxLength=50&minLength=10&tags=famous-quotes"
    )

    .then((response) => {
      // Isolate response in to data
      data = response.data[0];

      // Filter author and quote data
      author = data.author;
      quote = data.content;

      //   Update innter text with quote and author
      let quoteElement = document.querySelector(".content__text-quote");
      quoteElement.innerText = `"${quote}"`;

      let authorElement = document.querySelector(".content__text-author");
      authorElement.innerText = `- ${author}`;
    });
}

// Invoke getQuotes function
getQuotes();
