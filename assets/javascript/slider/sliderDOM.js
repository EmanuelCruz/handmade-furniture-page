import Slider from "./slider";
import elements from "./elements";

let sliderTexto = document.querySelector("#slider-texto");
let sliderTitulo = document.querySelector("#slider-titulo");
let sliderSubtitulo = document.querySelector("#slider-subtitulo");
let sliderImagen = document.querySelector("#slider-imagen");

let textoContent = document.querySelector("#slider-texto-content");

let slider = new Slider({
  elements,
  animationFunc: function (elemento) {
    textoContent.classList.add("hide");
    sliderImagen.classList.add("hide");

    setTimeout(function () {
      sliderTitulo.innerHTML = elemento.titulo;
      sliderSubtitulo.innerHTML = elemento.subtitulo;
      sliderTexto.innerHTML = elemento.texto;
      sliderImagen.src = elemento.imagen;

      textoContent.classList.remove("hide");
      sliderImagen.classList.remove("hide");
    }, 600);
  },
  speed: 5000,
});

slider.play();

//setTimeout(slider.stop, 1000);
