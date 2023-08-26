const themeButton = document.querySelector(".theme-button");
const themeType = document.querySelector(".theme-type");
const currentTheme = localStorage.getItem("theme");
const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

const userSearchBtn = document.querySelector(".search-button");
const searchedUser = document.querySelector(".search-input");
const userAvatar = document.querySelector(".avatar");
const userName = document.querySelector(".user-name");
const userCreateDate = document.querySelector(".created-at");
const userLogin = document.querySelector(".login");
const userBio = document.querySelector(".bio");
const userRepos = document.querySelector(".repos");
const userFollowers = document.querySelector(".followers");
const userFollowing = document.querySelector(".following");
const userLocation = document.querySelector(".location");
const userTwitter = document.querySelector(".twitter-username");
const userBlog = document.querySelector(".blog");
const userCompany = document.querySelector(".company");
const form = document.querySelector(".search-form");
const DEFAULT_VALUE = "Not Available";
const resultWrapper = document.querySelector(".app-result");

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

      console.log(data);

      let isLogin = data?.login;

      const hiddenClassName = "hidden";

      if (searchingUser === isLogin) {
        resultWrapper.classList.contains(hiddenClassName) &&
          resultWrapper.classList.remove(hiddenClassName);
        userLogin.textContent = data.login;
        form.style.border = "none";
        searchedUser.placeholder = "Search GitHub user login...";
      } else {
        !resultWrapper.classList.contains(hiddenClassName) &&
          resultWrapper.classList.add(hiddenClassName);
        form.style.border = "2px solid red";
        searchedUser.placeholder = "User not found, please try again...";
      }

      userName.textContent = data?.name || DEFAULT_VALUE;

      userCreateDate.textContent = data?.created_at || DEFAULT_VALUE;
      const enrollDate = userCreateDate.textContent;
      const toConversionDate = new Date(enrollDate);
      const formattedEnrollDate = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
      }).format(toConversionDate);
      console.log(`Joined ${formattedEnrollDate}`);
      userCreateDate.textContent = `Joined ${formattedEnrollDate}`;

      userBio.textContent = data?.bio || "This profile has no bio";

      userRepos.textContent = data?.public_repos;
      userFollowers.textContent = data?.followers;
      userFollowing.textContent = data?.following;
      userLocation.textContent = data?.location || DEFAULT_VALUE;

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

      const arr = [userLogin, userCompany, userBlog, userTwitter, userLocation];

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
      searchedUser.value = "";
    } catch (err) {
      console.log("2");
      const hiddenClassName = "hidden";
      !resultWrapper.classList.contains(hiddenClassName) &&
        resultWrapper.classList.add(hiddenClassName);
      form.style.border = "2px solid red";
      searchedUser.value = "";
      searchedUser.placeholder = "User not found, please try again...";
    }
  };
  getGithubData(searchingUser);
});
