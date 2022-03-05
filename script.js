// https://morningpants.github.io/100-best-books/books.json
// https://morningpants.github.io/100-best-books/static/
// https://morningpants.github.io/100-best-books/static/images/things-fall-apart.jpg

fetch('https://morningpants.github.io/100-best-books/books.json')
  .then(response => response.json())
  .then(data => console.log(data));
