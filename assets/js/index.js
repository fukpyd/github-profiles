const themeButton = document.querySelector(".dark-light-theme-btn");
const themeType = document.querySelector(".theme-type");
const currentTheme = localStorage.getItem("theme");
const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

const userSearchBtn = document.querySelector(".search-user-button");
const searchedUser = document.querySelector(".dev-search-input");
const userAvatar = document.querySelector("#user-avatar");
const userName = document.querySelector("#user-name");
const userEnrollDate = document.querySelector("#enroll-date");
const userLogin = document.querySelector("#login");
const userBio = document.querySelector("#bio");
const userRepos = document.querySelector("#repos");
const userFollowers = document.querySelector("#followers");
const userFollowing = document.querySelector("#following");
const userLocation = document.querySelector("#location");
const userTwitter = document.querySelector("#twitter-username");
const userBlog = document.querySelector("#blog");
const userCompany = document.querySelector("#company");
const form = document.querySelector(".dev-search-form");
const DEFAULT_VALUE = "Not Available";
const secondRowApp = document.querySelector(".second-row");
const thirdRowApp = document.querySelector(".third-row");

if (currentTheme === "dark") {
  document.documentElement.classList.toggle("dark");
}

themeButton.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  const isCurrentDarkTheme = themeType.innerText === THEME.DARK;
  themeType.innerText = !isCurrentDarkTheme ? THEME.DARK : THEME.LIGHT;

  let theme = THEME.DARK;
  if (document.documentElement.classList.contains("light")) {
    theme = THEME.LIGHT;
  } else {
    theme = THEME.DARK;
  }

  localStorage.setItem("theme", theme);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchedUser.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    userSearchBtn.click();
  }
});

userSearchBtn.addEventListener("click", function () {
  let searchingUser = searchedUser.value;

  const getGithubData = async function (searchingUser) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchingUser}`
      );
      if (!response.ok) {
        throw new Error(`User not found (${response.status})`);
      }
      const data = await response.json();

      let isLogin = data?.login;

      const classForInvisibleRow = "invisible-row";

      if (searchingUser === isLogin) {
        thirdRowApp.classList.contains(classForInvisibleRow) &&
          thirdRowApp.classList.remove(classForInvisibleRow);
        userLogin.textContent = data.login;
        secondRowApp.style.border = "none";
        searchedUser.placeholder = "Search GitHub user login...";
      } else {
        !thirdRowApp.classList.contains(classForInvisibleRow) &&
          thirdRowApp.classList.add(classForInvisibleRow);
        secondRowApp.style.border = "2px solid red";
        searchedUser.placeholder = "User not found, please try again...";
      }

      userName.textContent = data?.name || DEFAULT_VALUE;

      userEnrollDate.textContent = data?.created_at || DEFAULT_VALUE;
      const enrollDate = userEnrollDate.textContent;
      const toConversionDate = new Date(enrollDate);
      const formattedEnrollDate = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
      }).format(toConversionDate);
      userEnrollDate.textContent = `Joined ${formattedEnrollDate}`;

      userBio.textContent = data?.bio || "This profile has no bio";

      userRepos.textContent = data?.public_repos;
      userFollowers.textContent = data?.followers;
      userFollowing.textContent = data?.following;
      userLocation.textContent = data?.location || DEFAULT_VALUE;

      userTwitter.innerHTML = data?.twitter_username
        ? `<a href=${data.twitter_username}>${data.twitter_username}</a>`
        : DEFAULT_VALUE;

      userBlog.innerHTML = data?.blog
        ? `<a href=${data.blog}>${data.blog}</a>`
        : DEFAULT_VALUE;

      userCompany.innerHTML = data?.company
        ? `<a href=${data.company}>${data.company}</a>`
        : DEFAULT_VALUE;

      userAvatar.src = data?.avatar_url;

      const arr = [userLogin, userCompany, userBlog, userTwitter, userLocation];

      const classForUnavailableData = "vcard-detail-info-unavailable";

      arr.forEach((el) => {
        if (el.textContent === DEFAULT_VALUE) {
          !el.classList.contains(classForUnavailableData) &&
            el.classList.add(classForUnavailableData);
        } else {
          el.classList.contains(classForUnavailableData) &&
            el.classList.remove(classForUnavailableData);
        }
      });
      searchedUser.value = "";
    } catch (err) {
      const classForInvisibleRow = "invisible-row";
      !thirdRowApp.classList.contains(classForInvisibleRow) &&
        thirdRowApp.classList.add(classForInvisibleRow);
      secondRowApp.style.border = "2px solid red";
      searchedUser.value = "";
      searchedUser.placeholder = "User not found, please try again...";
    }
  };
  getGithubData(searchingUser);
});
