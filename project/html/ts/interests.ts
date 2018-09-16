import { flyingImages } from './images';

document.addEventListener('DOMContentLoaded', () => init());

export function init() {
  const divs = initImages();
  const animator = new Animator(divs);
  animator.startAnimation();
}

function initImages() {
  const imageContainer = document.getElementsByClassName('interest-images')[0] as HTMLDivElement;
  const divs = flyingImages.map(src => {
    const div = document.createElement('div');
    div.classList.add('interest-image');
    const img = document.createElement('img');
    img.src = src;
    img.draggable = false;
    div.appendChild(img);
    div.style.position = 'absolute';
    div.style.margin = 'auto';
    div.style.top = '-400px';
    div.style.left = '0';
    div.style.right = '0';
    imageContainer.appendChild(div);
    return new AnimatedImage(div);
  });
  return divs;
}

class Animator {
  constructor(private images: AnimatedImage[]) {}

  startAnimation() {
    this.images[0].startAnimating();
    setInterval(() => this.tick(), 10);
  }

  private tick() {
    this.images.forEach(image => image.tick());
    const filtered = this.images.filter(({ animated }) => animated);
    const maxTop = Math.min(...filtered.map(image => image.top()));
    const img = this.images[filtered.length];
    if (img && maxTop >= 10) img.startAnimating();
  }
}

class AnimatedImage {
  private animated = false;
  private direction: 'down' | 'right' | 'left' = 'down';

  constructor(private div: HTMLDivElement) {
    this.initSwipeGesture();
  }

  private initSwipeGesture() {
    // const hammertime = new Hammer(document.getElementsByClassName('interest-images')[0] as HTMLElement);
    const hammertime = new Hammer(this.div);
    hammertime.on('swipeleft', () => (this.direction = 'left'));
    hammertime.on('swiperight', () => (this.direction = 'right'));
  }

  tick() {
    if (!this.animated || !this.loaded()) return;
    this.div.style.top = `${this.top() + 3}px`;
    if (this.direction === 'left') this.moveToSide(this.marginLeft() - 7);
    if (this.direction === 'right') this.moveToSide(this.marginLeft() + 7);
  }

  startAnimating() {
    this.animated = true;
    this.div.style.top = `${-this.div.offsetHeight}px`;
  }

  private moveToSide(newMargin: number) {
    this.div.style.marginLeft = `${newMargin}px`;
  }

  private marginLeft() {
    return parseInt(this.div.style.marginLeft || '0', 10) || 0;
  }

  private loaded() {
    return this.div.offsetHeight >= 10;
  }

  top() {
    return parseInt(`${this.div.style.top}`, 10);
  }
}
