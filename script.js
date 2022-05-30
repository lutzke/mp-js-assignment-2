// https://morningpants.github.io/100-best-books/books.json
// https://morningpants.github.io/100-best-books/static/
// https://morningpants.github.io/100-best-books/static/images/things-fall-apart.jpg

function writeHTML(bookList) {
  booksDiv = document.querySelector('#books');
  booksDiv.innerHTML = bookList.join('<br>');
};

fetch('https://morningpants.github.io/100-best-books/books.json')
  .then(response => {
    console.log(`Response: HTTP ${response.status}`);
    return response.json();})
  .then(books => {
    console.log(books);
    return books.map(book => `<div class="book"> <div class="cover"> <img src="https://morningpants.github.io/100-best-books/static/${book.imageLink}" alt=""> </div> <br><b>${book.title}</b> <br> by ${book.author} </div>`);})
  .then(books => writeHTML(books));