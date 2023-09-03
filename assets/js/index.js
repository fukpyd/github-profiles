import { THEME, GET_USER_ENDPOINT } from "./constants.js";
import { toggleTheme } from "./utils.js";
import { getData } from "./api.js";
import { showError, showResult, clearError } from "./ui.js";

const themeButton = document.querySelector(".theme-button");
const themeType = document.querySelector(".theme-type");

const root = document.documentElement;
const currentTheme = localStorage.getItem("theme");

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const userAvatar = document.querySelector(".avatar");
const name = document.querySelector(".user-name");
const createDate = document.querySelector(".created-at");
const login = document.querySelector(".login");
const bio = document.querySelector(".bio");
const repos = document.querySelector(".repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const location = document.querySelector(".location");
const userTwitter = document.querySelector(".twitter-username");
const userBlog = document.querySelector(".blog");
const userCompany = document.querySelector(".company");
const form = document.querySelector(".search-form");
const resultWrapper = document.querySelector(".app-result");

const elements = {
  login,
  name,
  createDate,
  bio,
  repos,
  followers,
  following,
  location,
  userTwitter,
  userBlog,
  userCompany,
  userAvatar,
  form,
  searchInput,
  wrapper: resultWrapper,
};

if (currentTheme === THEME.LIGHT) {
  root.classList.toggle("dark");
}

function handleSubmit(url, elements) {
  const { searchInput } = elements || {};
  const query = searchInput.value;

  clearError(elements);

  getData(url, query)
    .then((data) => showResult(data, elements))
    .catch((err) => showError(elements, err));
}

themeButton.addEventListener("click", () =>
  toggleTheme(root, themeType, THEME)
);
// themeButton.addEventListener(
//   "click",
//   toggleTheme.bind(null, root, themeType, THEME)
// );

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchInput.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    handleSubmit(GET_USER_ENDPOINT, elements);
  }
});

searchButton.addEventListener("click", () =>
  handleSubmit(GET_USER_ENDPOINT, elements)
);
