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

let links = document.querySelectorAll(".menu>nav>a");
links.forEach((link) => {
  link.addEventListener("click", function (ev) {
    document.querySelector(".menu").classList.remove("active");
    let icono = document.querySelector("div.menu-icono");
    icono.style.display = "block";

    let paths = this.href.split("/");
    const selector = paths[paths.length - 1];
    scrollToElement(document.querySelector(selector));
    //Con esto hacemos que el efecto funcione
    //y evitar el redireccionamiento que nos impide que el efecto funcione

    //puede que el scrollTo de nuestra funcion preventDefault no funcione en
    //ciertos navegadores. para ponemos una condicion si existe la funcion
    //entonces va a utilizarla y sino no la utiliza y retornar false. Y
    //evitamos que se rompa
    if (window.scrollTo) ev.preventDefault();

    ev.preventDefault();
    return false;
  });
});
