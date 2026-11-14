// Mobile menu toggle and footer year
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");
menuBtn.addEventListener("click", function () {
  const open = navList.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
document.getElementById("year").textContent = new Date().getFullYear();
