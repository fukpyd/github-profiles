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
const DEFAULT_VALUE = "Not Available";

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

searchedUser.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    userSearchBtn.click();
  }
});

userSearchBtn.addEventListener("click", function () {
  const searchingUser = searchedUser.value;

  const getGithubData = async function (searchingUser) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchingUser}`
      );
      if (!response.ok) {
        throw new Error(`User not found (${response.status})`);
      }
      const data = await response.json();

      userName.textContent = data?.name || DEFAULT_VALUE;

      userEnrollDate.textContent = data?.created_at || DEFAULT_VALUE;
      const enrollDate = userEnrollDate.textContent;
      const toConversionDate = new Date(enrollDate);
      const formattedEnrollDate = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
      }).format(toConversionDate);
      userEnrollDate.textContent = `Joined ${formattedEnrollDate}`;

      userLogin.textContent = data?.login || DEFAULT_VALUE;

      userBio.textContent = data?.bio || "This profile has no bio";

      userRepos.textContent = data?.public_repos;
      userFollowers.textContent = data?.followers;
      userFollowing.textContent = data?.following;
      userLocation.textContent = data?.location || DEFAULT_VALUE;

      userTwitter.textContent = data?.twitter_username || DEFAULT_VALUE;

      userBlog.textContent = data?.blog || DEFAULT_VALUE;

      userCompany.textContent = data?.company || DEFAULT_VALUE;

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
      alert(`Sorry! ${err.message}`);
    }
  };
  getGithubData(searchingUser);
});
