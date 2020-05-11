export default class Slider {
  //Destructuring pasar los parametros entre {}
  //El constructor esta recibiendo un objeto json
  constructor({ elements, animationFunc, speed }) {
    this.elements = elements;
    this.animationFunc = animationFunc;
    this.speed = speed;

    this.index = 0;
    this.size = elements.length;

    this.innerNext = this.innerNext.bind(this);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  innerNext() {
    this.index++;
    if (this.index >= this.size) this.index = 0;
    this.animationFunc(this.elements[this.index]);
  }

  innerPrev() {
    this.index--;
    if (this.index < 0) this.index = this.size - 1;
    this.animationFunc(this.elements[this.index]);
  }

  next() {
    this.innerNext();
    if (this.interval) {
      this.stop();
      this.play();
    }
  }

  prev() {
    this.innerPrev();
    if (this.interval) {
      this.stop();
      this.play();
    }
  }

  play() {
    this.interval = setInterval(this.innerNext, this.speed);
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
