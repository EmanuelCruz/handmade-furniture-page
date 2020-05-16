import "../css/app.scss";
import "./slider/sliderDOM.js";
import "./maps.js";
import "./menu.js";

//verificamos si el navegador tiene SW

if (navigator.serviceWorker) {
  //ubicacion de nuestro SW
  navigator.serviceWorker.register("../sw.js");
}
