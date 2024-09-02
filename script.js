'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselData = [
      {
        'id': '1',
        'src': 'https://i.im.ge/2024/08/31/fxM6ED.resultados-1.jpeg',
      },
      {
        'id': '2',
        'src': 'https://i.im.ge/2024/08/31/fxMNv4.resultados-2.jpeg',
      },
      {
        'id': '3',
        'src': 'https://i.im.ge/2024/08/31/fxMtSC.resultados-3.jpeg',
      },
      {
        'id': '4',
        'src': 'https://i.im.ge/2024/08/31/fxMyNq.resultados-4.jpeg',
      },
      {
        'id': '5',
        'src': 'https://i.im.ge/2024/08/31/fxMAVp.resultados-5.jpeg',
      },
      {
        'id': '6',
        'src': 'https://i.im.ge/2024/08/31/fxMErP.resultados-7.jpeg',
      },
      {
        'id': '7',
        'src': 'https://i.im.ge/2024/08/31/fxMx51.resultados-8.jpeg',
      }
    ];
    this.carouselInView = [1, 2, 3, 4, 5,6,7];
    this.carouselContainer = null;
    this.carouselPlayState = null;
  }

  mounted() {
    this.setupCarousel();
    this.startAutoPlay(); // Inicia o carrossel automaticamente
  }

  setupCarousel() {
    const container = document.createElement('div');

    // Adiciona o container para os itens do carrossel
    this.el.append(container);
    container.className = 'carousel-container';

    // Adiciona itens ao container
    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('img');

      container.append(carouselItem);

      // Adiciona atributos aos itens
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute('loading', 'lazy');
      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    // Define a propriedade do container
    this.carouselContainer = container;
  }

  previous() {
    this.carouselData.unshift(this.carouselData.pop());
    this.carouselInView.push(this.carouselInView.shift());

    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    this.carouselData.push(this.carouselData.shift());
    this.carouselInView.unshift(this.carouselInView.pop());

    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  add() {
    const newItem = {
      'id': '',
      'src': '',
    };
    const lastItem = this.carouselData.length;
    const lastIndex = this.carouselData.findIndex(item => item.id == lastItem);
    
    Object.assign(newItem, {
      id: `${lastItem + 1}`,
      src: `http://fakeimg.pl/300/?text=${lastItem + 1}`
    });

    this.carouselData.splice(lastIndex + 1, 0, newItem);

    this.next();
  }

  startAutoPlay() {
    // Começa a reprodução automática do carrossel
    this.carouselPlayState = setInterval(() => this.next(), 2500);
  }
}

// Refere-se ao elemento do carrossel que você deseja selecionar
const el = document.querySelector('.carousel');
// Cria um novo objeto de carrossel
const exampleCarousel = new Carousel(el);
// Configura o carrossel e os métodos
exampleCarousel.mounted();
