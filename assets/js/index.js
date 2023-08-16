const themeButton = document.querySelector(".dark-light-theme-btn");
const themeType = document.querySelector(".theme-type");
const currentTheme = localStorage.getItem("theme");
const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

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
