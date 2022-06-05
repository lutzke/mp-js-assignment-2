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
function sortBooks(sortBy, type) {

  // Find out which order the user wants to sort in (e.g. ascending)
  if (!type) {
    const selectedSort = document.getElementById(sortBy);
    type = selectedSort.options[selectedSort.selectedIndex].value;
  }

  // We don't want to overwrite the original array of book objects
  let tempGlobalBookObjects = globalBookObjects;

  // This does the actual sorting
  switch (sortBy) {
    // Notes on greater/less than and sort():
    // Z has a larger numeric value than A, so (Z > A) is true
    // someArray.sort((A, B) => someFunction); sorts A after B if
    // someFunction returns 1, and A before B if it returns -1.

    case 'title':

      switch (type) {
        case 'asc':
          tempGlobalBookObjects.sort((a, b) => (a.title > b.title) ? 1 : -1);
          break;
        case 'desc':
          tempGlobalBookObjects.sort((a, b) => (a.title > b.title) ? -1 : 1);
          break;
      };
      break;

    case 'author':
      // Note: There are no authors in the list with same surname and different
      // given name, so we don't need to check for that.

      tempGlobalBookObjects.sort((a, b) => {

        // Get the authors' surnames
        aSurname = a.author.split(' ').pop();
        bSurname = b.author.split(' ').pop();

        switch (type) {
          case 'asc':
            // Ascending order: unknown authors are sorted last
            if (aSurname === 'Unknown') {
              return 1;
            }
            if (bSurname === 'Unknown') {
              return -1;
            }
            // Ascending (A-Z) order: if aSurname comes after bSurname in the
            // alphabet, then put aSurname after bSurname
            return (aSurname > bSurname) ? 1 : -1;

          case 'desc':
            // Descending order: unknown authors are sorted first
            if (aSurname === 'Unknown') {
              return -1;
            }
            if (bSurname === 'Unknown') {
              return 1;
            }
            // Descending (Z-A) order: if aSurname comes after bSurname in the
            // alphabet, then put aSurname before bSurname
            return (aSurname > bSurname) ? -1 : 1;
        };

      });
      break;
    
    case 'year':  
      tempGlobalBookObjects.sort((a, b) => {
        switch (type) {
            case 'asc':
              return (a.year < b.year) ? -1 : 1;
            
            case 'desc':
              return (a.year < b.year) ? 1 : -1;
        };
      });
      break;

  }

  // Display sorted books on the page
  writeHTML(tempGlobalBookObjects);
  
  // Once we are no longer sorting by some criterion, revert its dropdown
  const sortByOptions = ['title', 'author', 'year'];
  for (let i = 0; i < sortByOptions.length; i++) {
    if (!(sortByOptions[i] === sortBy)) {
      document.getElementById(sortByOptions[i]).selectedIndex = 0; 
    }
  }
  
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
    // console.log(books); // See the object in the console, for debugging
    for (let i = 0; i < books.length; i++) {
      books[i].html = `
        <div class="book"> 
          <img src="https://morningpants.github.io/100-best-books/static/${books[i].imageLink}" alt="Cover of ${books[i].title}">
          <br>
          <div class="book-text">
            <strong>${books[i].title}</strong>
            <br>
            by ${books[i].author}
            <br>
            <i>${(books[i].year < 0) ? String(books[i].year * -1) + ' BCE' : books[i].year}</i>
          </div>
        </div>`
    };
    return books;
  })

  // Send the array of book objects, with their new html properties, on to the 
  // next step.
  .then(books => {
    globalBookObjects = books; // Store book objects globally
    return sortBooks('author', 'asc'); // Default sort: by author, A-Z
  });
