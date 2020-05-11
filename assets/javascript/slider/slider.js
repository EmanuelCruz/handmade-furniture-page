export default class Slider {
  //Destructuring pasar los parametros entre {}
  //El constructor esta recibiendo un objeto json
  constructor({ elements, animationFunc, speed }) {
    this.elements = elements;
    this.animationFunc = animationFunc;
    this.speed = speed;

    this.index = 0;
    this.size = elements.length;

    this.prev = this.prev.bind(this);
    this.stop = this.prev.bind(this);
  }

  next() {
    this.index++;
    if (this.index >= this.size) this.index = 0;
    this.animationFunc(this.elements[this.index]);
  }

  prev() {
    this.index--;
    if (this.index < 0) this.index = this.size - 1;
    this.animationFunc(this.elements[this.index]);
  }

  play() {
    this.interval = setInterval(this.prev, this.speed);
  }
  /*
  play() {
    console.log(this);
    this.interval = setInterval(function () {
      console.log(this);
      this.prev(); //<-- El PROBLEMA ES EL VALOR DE THIS
    }, 5000);
  }

  OBS: this.prev() no va a devolver el valor que necesitamos, en este caso 
  slider. Esto sucede porque en la funcion anonima, THIS toma el valor del 
  contexto en este caso el objeto Window.
  Una solucion a esto es definir la funcion como funcion arrow asi el THIS 
  que utilizamos va a respetar el contexto de la funcion play.
  
  OBS: Otra solucion seria que llamemos a la funcion this.prev directamente 
  en la funcion play() e indicar en el constructor que siempre se mantenga el 
  valor del THIS en slider, usando:
  this.prev = this.prev.bind(this);
  */

  stop() {
    clearInterval(this.interval);
  }
}
