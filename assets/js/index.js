import { THEME, DEFAULT_VALUE } from "./constants.js";

const themeButton = document.querySelector(".theme-button");
const themeType = document.querySelector(".theme-type");

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

if (currentTheme === "light") {
  document.documentElement.classList.toggle("dark");
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isCurrentDarkTheme = themeType.innerText === THEME.DARK;
  themeType.innerText = !isCurrentDarkTheme ? THEME.DARK : THEME.LIGHT;

  if (document.documentElement.classList.contains("light")) {
    localStorage.setItem("theme", THEME.LIGHT);
  } else {
    localStorage.setItem("theme", THEME.DARK);
  }
}

function getUserData() {
  const query = searchInput.value;

  const getGithubData = async function (query) {
    try {
      const response = await fetch(`https://api.github.com/users/${query}`);
      if (!response.ok) {
        throw new Error(`User not found (${response.status})`);
      }
      const data = await response.json();

      console.log(data);

      let isLogin = data?.login;

      const hiddenClassName = "hidden";

      if (query === isLogin) {
        resultWrapper.classList.contains(hiddenClassName) &&
          resultWrapper.classList.remove(hiddenClassName);
        login.textContent = data.login;
        form.style.border = "none";
        searchInput.placeholder = "Search GitHub user login...";
      } else {
        !resultWrapper.classList.contains(hiddenClassName) &&
          resultWrapper.classList.add(hiddenClassName);
        form.style.border = "2px solid red";
        searchInput.placeholder = "User not found, please try again...";
      }

      name.textContent = data?.name || DEFAULT_VALUE;

      createDate.textContent = data?.created_at || DEFAULT_VALUE;
      const enrollDate = createDate.textContent;
      const toConversionDate = new Date(enrollDate);
      const formattedEnrollDate = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
      }).format(toConversionDate);
      console.log(`Joined ${formattedEnrollDate}`);
      createDate.textContent = `Joined ${formattedEnrollDate}`;

      bio.textContent = data?.bio || "This profile has no bio";

      repos.textContent = data?.public_repos;
      followers.textContent = data?.followers;
      following.textContent = data?.following;
      location.textContent = data?.location || DEFAULT_VALUE;

      userTwitter.innerHTML = data?.twitter_username
        ? `<a href=${data.twitter_username} class="link">${data.twitter_username}</a>`
        : DEFAULT_VALUE;

      userBlog.innerHTML = data?.blog
        ? `<a href=${data.blog} class="link">${data.blog}</a>`
        : DEFAULT_VALUE;

      userCompany.innerHTML = data?.company
        ? `<a href=${data.company} class="link">${data.company}</a>`
        : DEFAULT_VALUE;

      userAvatar.src = data?.avatar_url;

      const arr = [login, userCompany, userBlog, userTwitter, location];

      const classForUnavailableData = "unavailable";

      arr.forEach((el) => {
        if (el.textContent === DEFAULT_VALUE) {
          !el.classList.contains(classForUnavailableData) &&
            el.classList.add(classForUnavailableData);
        } else {
          el.classList.contains(classForUnavailableData) &&
            el.classList.remove(classForUnavailableData);
        }
      });
      searchInput.value = "";
    } catch (err) {
      console.log("2");
      const hiddenClassName = "hidden";
      !resultWrapper.classList.contains(hiddenClassName) &&
        resultWrapper.classList.add(hiddenClassName);
      form.style.border = "2px solid red";
      searchInput.value = "";
      searchInput.placeholder = "User not found, please try again...";
    }
  };
  getGithubData(query);
}

themeButton.addEventListener("click", toggleTheme);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchInput.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    getUserData();
  }
});

searchButton.addEventListener("click", getUserData);
