fetch("./products.json")
  .then((res) => res.json())
  .then((data) => console.log(data));

function createBooksDiv(booksResponse) {
  const booksRow = document.createElement(div);
  const books = document.createElement(div);
  const bookImg = document.createElement(img);
  const bookNameWrapper = document.createElement(div);
  const bookName = document.createElement(img);
}

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
