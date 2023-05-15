let currentPage = 1;
const itemsPerPage = 6;
let isFetching = false;
let dataList = [];

const loadItems = async () => {
  if (isFetching) return;

  isFetching = true;
  console.log("fetching? ", isFetching);
  // document.querySelector("section").innerHTML = "";

  console.log("dataList Before Fetch ", dataList);
  await fetch(
    "https://2017129007.github.io/HomeworkRepository/LAB4/products.json"
  )
    .then((res) => res.json())
    .then((data) => data.slice(0, currentPage * itemsPerPage))
    // .then((data) => executeFilter(data))
    .then((data) => {
      // dataList = [...dataList, ...data];
      dataList = data;
      console.log("dl", dataList);
    })
    .catch((error) => console.log(error));

  putEachData(dataList);

  isFetching = false;
  // currentPage++;
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
  const price = document.createElement("div");
  price.innerHTML = `Price : ${book?.price}`;
  bookDetail.append(title, author, category, description, price);
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
  // setTimeout(() => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight &&
    dataList.length < 22
  ) {
    clearSection();
    loadItems();
    console.log("currentPage : ", currentPage);
    currentPage++;
  }
  // }, 800);
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
  let filteredData = data;
  if (filterValues.category !== "All") {
    filteredData = data.filter((book) => {
      if (book.category === filterValues.category) {
        return true;
      } else return false;
    });
  }
  console.log("filteredData", filteredData);
  let sortedData = filteredData;
  if (filterValues?.sort === "up") {
    sortedData = filteredData.sort(
      (a, b) => parseInt(a?.price.slice(1)) - parseInt(b?.price.slice(1))
    );
  } else if (filterValues?.sort === "down") {
    sortedData = filteredData.sort(
      (a, b) => parseInt(b?.price.slice(1)) - parseInt(a?.price.slice(1))
    );
  }
  console.log("sorted", sortedData);
  return sortedData;
};

const filterButton = document.getElementById("filter-button");
filterButton.onclick = () => {
  // loadItems();
  // console.log("fbDL", dataList);
  clearSection();
  const filteredList = executeFilter(dataList);
  putEachData(filteredList);
};

const selectElements = document.querySelectorAll(".sort");
selectElements.forEach((element) => (element.onchange = handleFilterChange));
console.log(selectElements);

function clearSection() {
  const section = document.querySelector("#book-section");
  while (section.firstChild) {
    console.log("FC", section.firstChild);
    section?.firstChild?.remove();
  }
}
