// JavaScript Assignment 2: Working with JSON
// Problem by morningpants
// This solution by lutzke

// https://morningpants.github.io/100-best-books/books.json
// https://morningpants.github.io/100-best-books/static/
// https://morningpants.github.io/100-best-books/static/images/things-fall-apart.jpg


// Once the book information is fetched and parsed into objects, it will
// eventually be stored in here for ease of access by functions.
let globalBookObjects = [];


// Takes HTML from 'html' properties from an array of objects, and inserts
// all that HTML into the page.
function writeHTML(bookObjects) {

  // Takes HTML from array of objects, bookObjects, and places it into an array
  // of strings.
  bookList = [];
  for (let i = 0; i < bookObjects.length; i++) {
    bookList[i] = bookObjects[i].html;
  };

  booksDiv = document.querySelector('#books');
  booksDiv.innerHTML = bookList.join('<br>');
};


// Orders the books on the page in the order specified by the user
function sortBooks(type, ascending) {
  /*
  if (!globalBookObjects) {
    console.log('sortBooks: globalBookObjects appears to be empty!')
    return 1;
  };
  */
  tempGlobalBookObjects = globalBookObjects; // sort() sorts in place

  // Perform the kind of sorting the user requested
  switch (type) {
    case 'title':
      if (ascending) {
        tempGlobalBookObjects.sort((a, b) => (a.title > b.title) ? 1 : -1);
      } else {
        tempGlobalBookObjects.sort((a, b) => (a.title > b.title) ? -1 : 1);
      }
      break;
    };

  writeHTML(tempGlobalBookObjects);
}


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
  .then(books => {
    globalBookObjects = books; // Store book objects globally
    return writeHTML(books);
  });
