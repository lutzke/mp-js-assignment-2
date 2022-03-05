// https://morningpants.github.io/100-best-books/books.json
// https://morningpants.github.io/100-best-books/static/
// https://morningpants.github.io/100-best-books/static/images/things-fall-apart.jpg

function writeHTML(bookList) {
  booksDiv = document.querySelector('#books');
  bookList = bookList.join('<br>');
  booksDiv.innerHTML = bookList;
};

fetch('https://morningpants.github.io/100-best-books/books.json')
  .then(response => response.json())
  .then(books => books.map(book => `${book.title} by ${book.author}`))
  .then(books => writeHTML(books));