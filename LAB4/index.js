function createBooksDiv() {
  const booksRow = document.createElement(div);
  const books = document.createElement(div);
  const bookImg = document.createElement(img);
  const bookNameWrapper = document.createElement(div);
  const bookName = document.createElement(img);

  booksRow.classList.add("books-row", "d-flex-row");
  books.classList.add("books");
  bookImg.classList.add("book-image");
  bookNameWrapper.classList.add("book-name-wraper");
  bookName.classList.add("book-name");

  books.appendChild(bookImg);
  books.appendChild(bookNameWrapper);
  bookNameWrapper.appendChild(bookName);
  booksRow.appendChild(books);
  booksRow.appendChild(books);

  document.querySelector("main-footer").firstChild.appendChild(booksRow);
}

// function putBooksInRender(data) {
//   booksRow;
// }

let booksData = [];

fetch("./products.json")
  .then((res) => res.json())
  .then((data) => booksData.join(data));

console.log(booksData);

createBooksDiv();

booksData.forEach((book) => {
  bookName.innerHTML = book.title;
});

// <div class="books-row d-flex-row">
{
  /* <div class="books">
<img class="book-image" src="./img/effectiveTypescript.jpg" />
<div class="book-name-wrapper">
  <!-- <span class="book-name">어떤책1</span> -->
</div>
</div>
<div class="books">
<img class="book-image" src="./img/effectiveTypescript.jpg" />
<div class="book-name-wrapper">
  <!-- <span class="book-name">어떤책2</span> -->
</div>
</div>
</div> */
}
