// function createBooksDiv() {
//   const booksRow = document.createElement("div");
//   const books = document.createElement("div");
//   const bookImg = document.createElement("img");
//   const bookNameWrapper = document.createElement("div");
//   const bookName = document.createElement("span");

//   booksRow.classList.add("books-row", "d-flex-row");
//   books.classList.add("books");
//   bookImg.classList.add("book-image");
//   bookNameWrapper.classList.add("book-name-wraper");
//   bookName.classList.add("book-name");

//   books.appendChild(bookImg);
//   books.appendChild(bookNameWrapper);
//   bookNameWrapper.appendChild(bookName);
//   booksRow.appendChild(books);
//   booksRow.appendChild(books);

//   document.body.appendChild(booksRow);
// }

function putEachData(data) {
  const sectionElement = document.querySelector("#book-section");
  console.log("pED : ", data);
  data.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("books");
    const bookDetail = document.createElement("div");
    bookDetail.classList.add("book-detail-hidden");
    bookDetail.innerHTML = `${book?.title} ${book?.author} ${book?.description}`;
    bookElement.appendChild(bookDetail);
    const bookImg = document.createElement("img");
    bookImg.classList.add("book-image");
    bookElement.appendChild(bookImg);
    bookElement.lastChild.src = book?.img;
    sectionElement.appendChild(bookElement);
  });
}

let booksData = [];

fetch("./products.json")
  .then((res) => res.json())
  .then((data) => putEachData(data))
  .then((data) => booksData.join(data));

booksData.forEach((book) => {
  bookName.innerHTML = book.title;
  console.log("First : ", book.firstChild);
  console.log("Last : ", book.lastChild);
  book.lastChild.addEventListener(onclick, () => {
    book.firstChild.classList.add("book-detail-show");
    console.log(book.lastChild, "addEventListener?");
  });
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
