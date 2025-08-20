// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeMenu = document.getElementById("themeMenu");
const themeIcon = document.getElementById("themeIcon");
const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");
const systemMode = document.getElementById("systemMode");

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.classList.toggle("dark", currentTheme === "dark");
updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    themeMenu.classList.toggle("hidden");
  });
}

// Set theme functions
function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateThemeIcon("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateThemeIcon("light");
  } else if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    localStorage.setItem("theme", "system");
    updateThemeIcon(prefersDark ? "dark" : "light");
  }
  if (themeMenu) {
    themeMenu.classList.add("hidden");
  }
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }
}

if (lightMode) lightMode.addEventListener("click", () => setTheme("light"));
if (darkMode) darkMode.addEventListener("click", () => setTheme("dark"));
if (systemMode) systemMode.addEventListener("click", () => setTheme("system"));

// Close theme menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    themeToggle &&
    themeMenu &&
    !themeToggle.contains(e.target) &&
    !themeMenu.contains(e.target)
  ) {
    themeMenu.classList.add("hidden");
  }
});
