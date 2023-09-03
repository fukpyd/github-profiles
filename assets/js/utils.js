export function toggleTheme(rootElement, themeToggleElement, themes) {
  rootElement.classList.toggle("dark");
  const isCurrentDarkTheme = themeToggleElement.innerText === themes.DARK;
  themeToggleElement.innerText = !isCurrentDarkTheme
    ? themes.DARK
    : themes.LIGHT;

  if (rootElement.classList.contains("light")) {
    localStorage.setItem("theme", themes.LIGHT);
  } else {
    localStorage.setItem("theme", themes.DARK);
  }
}
