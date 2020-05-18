function scrollToElement(element) {
  window.scrollTo({
    behavior: "smooth",
    top: element.offsetTop,
  });
}

let menu = document.querySelector(".menu-icono");

menu.addEventListener("click", function () {
  document.querySelector(".menu").classList.add("active");
  let icono = document.querySelector("div.menu-icono");
  icono.style.display = "none";
});

let cerrar = document.querySelector(".close");

cerrar.addEventListener("click", function () {
  document.querySelector(".menu").classList.remove("active");
  let icono = document.querySelector("div.menu-icono");
  icono.style.display = "block";
});

let links = document.querySelectorAll(".menu nav a");
links.forEach((link) => {
  link.addEventListener("click", function (ev) {
    document.querySelector(".menu").classList.remove("active");
    let icono = document.querySelector("div.menu-icono");
    icono.style.display = "block";
    let paths = this.href.split("/");

    const selector = paths[paths.length - 1];

    if (window.scrollTo) ev.preventDefault();
    scrollToElement(document.querySelector(selector));
    return !!window.scrollTo;
  });
});