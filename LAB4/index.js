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
    const bookDetail = makeDetailElement(book);
    const bookImg = makeBookImage(book);
    bookElement.appendChild(bookDetail);
    bookElement.appendChild(bookImg);
    sectionElement.appendChild(bookElement);
    addBooksOnClick(bookElement);
  });
}

let booksData = [];

fetch("https://2017129007.github.io/HomeworkRepository/LAB4/products.json")
  .then((res) => res.json())
  .then((data) => putEachData(data))
  .then((data) => booksData.join(data));

const addBooksOnClick = (book) => {
  book.onclick = () => {
    book.firstChild.classList.remove("book-detail-hidden");
    book.firstChild.classList.add("book-detail-show", "d-flex-column");
  };
};

const makeDetailElement = (book) => {
  const bookDetail = document.createElement("div");
  bookDetail.classList.add("book-detail-hidden");
  const title = document.createElement("div");
  title.innerHTML = `Title : ${book?.title}`;
  const author = document.createElement("div");
  author.innerHTML = `Author : ${book?.author}`;
  const category = document.createElement("div");
  category.innerHTML = `Category : ${book?.category}`;
  const description = document.createElement("div");
  description.innerHTML = `Description : ${book?.description}`;
  bookDetail.append(title, author, category, description);
  return bookDetail;
};

const makeBookImage = (book) => {
  const bookImg = document.createElement("img");
  bookImg.classList.add("book-image");
  bookImg.src = book?.img;
  return bookImg;
};
