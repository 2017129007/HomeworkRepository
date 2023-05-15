let currentPage = 1;
const itemsPerPage = 6;
let isFetching = false;
let dataList = [];

const loadItems = async () => {
  if (isFetching) return;

  isFetching = true;
  console.log("fetching? ", isFetching);
  await fetch(
    "https://2017129007.github.io/HomeworkRepository/LAB4/products.json"
  )
    .then((res) => res.json())
    .then((data) =>
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    )
    .then((data) => executeFilter(data))
    .then((data) => {
      dataList = data;
      console.log("dl", dataList);
    })
    .catch((error) => console.log(error));

  putEachData(dataList);

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
  console.log("pe", data);
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
// putEachData(dataList);

// Scroll event listener
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadItems();
    // putEachData(dataList);
  }
});

// filter
const filterValues = { category: "All", queryString: "", sort: "" };

const handleFilterChange = (e) => {
  filterValues[e.target.name] = e.target.value;
  console.log("fv : ", filterValues);
};

const onFilterClick = (e) => {
  console.log("filterValues : ", filterValues);
  dataList = dataList.filter((data) => {
    data.category = filterValues.category;
    // filterValues?.sort === "up" ?
  });
  document.querySelector("#book-section").innerHTML = "";
  putEachData(dataList);
};

const executeFilter = (data) => {
  console.log("data", data);
  let filteredData = data;
  if (filterValues.category !== "All") {
    filteredData = data.filter((book) => {
      book.category === filterValues.category;
    });
  }
  console.log("fvC", filterValues.category);
  console.log("filteredData", filteredData);
  const sortedData =
    filterValues?.sort === "up"
      ? filteredData.sort((a, b) => {
          a?.price > b?.price;
        })
      : filteredData.sort((a, b) => {
          a?.price < b?.price;
        });
  return sortedData;
};

const filterButton = document.getElementById("filter-button");
filterButton.onclick = loadItems;

const selectElements = document.querySelectorAll(".sort");
selectElements.forEach((element) => (element.onchange = handleFilterChange));
console.log(selectElements);
