const searchQuery = document.getElementById("search-query");
const search = document.getElementById("search");
const card = document.getElementById("weather");

const container = document.getElementsByClassName("container")[0];
const invalidContainer =
  document.getElementsByClassName("invalid-container")[0];
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const area = document.getElementById("area");
const date = document.getElementById("date");

const getData = async (searchData) => {
  const response = await fetch(
    `http://localhost:3001/api/getdata/${searchData}`
  );
  const data = await response.json();
  console.log(data);
  console.log(data.status);
  if (data.status === 404) {
    container.style.display = "none";
    invalidContainer.style.display = "flex";
    return;
  }
  invalidContainer.style.display = "none";
  container.style.display = "flex";
  temp.innerHTML = ` ${data.data.temp_c}<span>o</span>`;
  condition.innerText = data.data.condition.text;
  area.innerText = data.data.name;
  let currentDate = new Date();
  currentDate = currentDate.toDateString();
  currentDate =
    currentDate.slice(0, 3) +
    ", " +
    currentDate.slice(8, 10) +
    " " +
    currentDate.slice(4, 7);
  date.innerText = currentDate;
  const rain = data.data.precip_mm;
  console.log(rain);
  const isDay = data.data.is_day;
  console.log(isDay);
  if (isDay === 1) {
    card.setAttribute("class", "");
    card.classList.add("sunny");
  } else {
    card.setAttribute("class", "");
    card.classList.add("night");
  }
  if (rain > 0) {
    card.setAttribute("class", "");
    card.setAttribute("class", "rainy");
  }
};

search.addEventListener("click", () => {
  getData(searchQuery.value.trim());
});
