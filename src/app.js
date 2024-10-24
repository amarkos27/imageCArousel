import './style.css';
import chevron from './chevron-down-svgrepo-com.svg';

class Carousel {
  static #createSlides(container) {
    const slides = [];
    for (let i = 0; i < 6; i++) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slides.push(slide);

      container.appendChild(slide);
    }

    return slides;
  }

  static async #getImages(r, images) {
    try {
      r.keys().forEach((image) => {
        images.push(r(image));
      });
    } catch {
      throw new Error('Images directory does not exist');
    }
  }

  static #fillSlides(slides, images) {
    let slideNumber = 0;
    let imgNumber = 0;

    while (imgNumber < images.length) {
      if (slideNumber === 6) {
        slideNumber = 0;
      }
      const element = document.createElement('img');
      element.src = images[imgNumber];
      if (imgNumber > 5) element.classList.add('hidden');
      slides[slideNumber].appendChild(element);

      slideNumber++;
      imgNumber++;
    }
  }

  constructor() {
    this.images = [];

    this.carousel = document.createElement('div');
    this.carousel.classList.add('carousel');

    this.slidesContainer = document.createElement('div');
    this.slidesContainer.classList.add('slides');

    this.slides = Carousel.#createSlides(this.slidesContainer);

    this.previous = document.createElement('button');
    this.previous.type = 'button';
    this.previous.classList.add('traverse', 'previous');
    const previousIcon = document.createElement('img');
    previousIcon.src = chevron;
    previousIcon.alt = 'arrow previous';
    this.previous.appendChild(previousIcon);

    this.next = document.createElement('button');
    this.next.type = 'button';
    this.next.classList.add('traverse', 'next');
    const nextIcon = document.createElement('img');
    nextIcon.src = chevron;
    nextIcon.alt = 'arrow next';
    this.next.appendChild(nextIcon);

    this.currentRotation = 0;
    this.currentPosition = 0;

    this.next.addEventListener('click', () => {
      this.currentRotation -= 60;
      this.rotate();
      this.setPosition('forward');
    });

    this.previous.addEventListener('click', () => {
      this.currentRotation += 60;
      this.rotate();
      this.setPosition('backward');
    });

    this.carousel.append(this.previous, this.slidesContainer, this.next);

    Carousel.#getImages(
      require.context('./images', false, /.(png|jpg|jpeg|gif|svg)$/i),
      this.images
    );

    Carousel.#fillSlides(this.slides, this.images);
  }

  rotate() {
    this.slides.forEach((slide, index) => {
      let initialRotation = index * 60;

      slide.style.transform = `translate(-50%, -50%) rotateY(${
        this.currentRotation + initialRotation
      }deg) translateZ(400px)`;
    });
  }

  attach(node) {
    node.appendChild(this.carousel);
  }

  setPosition(type) {
    if (type === 'forward') {
    } else if (type === 'backward') {
    } else {
      throw new Error("setPosition type must be 'forward' or 'backward'");
    }
  }
}

const carousel = new Carousel();
carousel.attach(document.body);
