document.addEventListener("DOMContentLoaded", () => fetchData());

const fetchData = async (query) => {
  const row = await fetch(`http://localhost:3000/books?${query}`);
  console.log(row);
  const data = await row.json();
  console.log("data : ", data);
  putEachData(data);

  const productList = document.getElementById("book-section");

  data.map((book) => {
    const bookElement = makeDetailElement(book);
    productList.appendChild(bookElement);
  });
};

const makeDetailElement = (book) => {
  const bookDetail = document.createElement("div");
  // bookDetail.classList.add("book-detail-hidden");
  const title = document.createElement("div");
  title.innerHTML = `Title : ${book?.product_title}`;
  const category = document.createElement("div");
  category.innerHTML = `Category : ${book?.product_category}`;
  const price = document.createElement("div");
  price.innerHTML = `Price : ${book?.product_price}`;
  bookDetail.append(title, category, price);
  return bookDetail;
};

const makeBookImage = (book) => {
  const bookImg = document.createElement("img");
  bookImg.classList.add("book-image");
  bookImg.src = book?.product_image;
  return bookImg;
};

function putEachData(data) {
  console.log("pe", data);
  const sectionElement = document.querySelector("#book-section");
  data.forEach((book) => {
    const bookElement = document.createElement("a");
    bookElement.href = `http://localhost:3000/product/${book.product_id}`;
    bookElement.classList.add("books");
    const bookDetail = makeDetailElement(book);
    const bookImg = makeBookImage(book);
    bookElement.appendChild(bookDetail);
    bookElement.appendChild(bookImg);
    sectionElement.appendChild(bookElement);
  });
}

// filter
const filterValues = { category: "All", queryString: "", sort: "" };

const handleFilterChange = (e) => {
  filterValues[e.target.name] = e.target.value;
  console.log("fv : ", filterValues);
};

const selectElements = document.querySelectorAll(".sort");
selectElements.forEach((element) => {
  element.onchange = handleFilterChange;
});

const filterButton = document.getElementById("filter-button");

filterButton.onclick = () => {
  const query = `category=${filterValues.category}&sort=${filterValues.sort}&search=${filterValues.search}`;
  clearSection();
  fetchData(query);
};

function clearSection() {
  const section = document.querySelector("#book-section");
  while (section.firstChild) {
    console.log("FC", section.firstChild);
    section?.firstChild?.remove();
  }
}
