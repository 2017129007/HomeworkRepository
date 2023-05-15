let currentPage = 1;
const itemsPerPage = 6;
let isFetching = false;

const loadItems = () => {
  if (isFetching) return;

  isFetching = true;
  console.log("fetching? ", isFetching);
  fetch("https://2017129007.github.io/HomeworkRepository/LAB4/products.json")
    .then((res) => res.json())
    .then((data) =>
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    )
    .then((data) => putEachData(data))
    .catch((error) => console.log(error));

  isFetching = false;
  currentPage++;
};

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

function putEachData(data) {
  const sectionElement = document.querySelector("#book-section");
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

// Load initial items
loadItems();

// Scroll event listener
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadItems();
  }
});
