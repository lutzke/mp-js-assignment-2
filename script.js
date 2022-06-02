// JavaScript Assignment 2: Working with JSON
// Problem by morningpants
// This solution by lutzke

// https://morningpants.github.io/100-best-books/books.json
// https://morningpants.github.io/100-best-books/static/
// https://morningpants.github.io/100-best-books/static/images/things-fall-apart.jpg


// This function used to just take an array of strings of HTML and join them;
// now it gets the HTML strings from an array of objects.
//
// Eventually, all this will be re-worked so that books can be sorted, 
// filtered, searched through, etc. with only the relevant ones displayed in 
// the correct order.
function writeHTML(booksObjects) {

  // Takes HTML from array of objects, booksObjects, and puts it into an array
  // of strings.
  bookList = [];
  for (let i = 0; i < booksObjects.length; i++) {
    bookList[i] = booksObjects[i].html;
  };

  booksDiv = document.querySelector('#books');
  booksDiv.innerHTML = bookList.join('<br>');
};


// Here is all the async code which fetches the JSON, parses it, and generates
// HTML which is stored as properties of objects in an array of objects.
fetch('https://morningpants.github.io/100-best-books/books.json')

  // Parse received JSON into an actual object
  .then(response => {
    console.log(`Attempted to retrieve JSON. Response: HTTP ${response.status}`);
    return response.json();})

  // Assign each book object in the books array a new property, html,
  // which contains the HTML to render for each book.
  .then(books => { 
    console.log(books); // See the object in the console, for debugging
    for (let i = 0; i < books.length; i++) {
      books[i].html = `
        <div class="book"> 
          <img src="https://morningpants.github.io/100-best-books/static/${books[i].imageLink}" alt="Cover of ${books[i].title}">
          <br>
          <div class="book-text">
            <b>${books[i].title}</b>
            <br>
            by ${books[i].author}
          </div>
        </div>`
    };
    return books;
  })

  // Send the array of book objects, with their new html properties, on to the 
  // next step.
  .then(books => writeHTML(books));
