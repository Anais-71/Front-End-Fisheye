class SortTemplate {
    sortElements(sortType) {
      const sortedElements = this.sort(sortType);
      this.displaySortedElements(sortedElements);
    }
  
    sort(sortType) {
      let selector;
      switch (sortType) {
        case 'name':
          selector = '.media__item--desc--title';
          break;
        case 'popularity':
          selector = '.media__item--desc--likes';
          break;
        case 'date':
          selector = '.media__item--desc--date';
          break;
        default:
          console.error('Invalid sort type');
          return [];
      }
  
      const elements = Array.from(document.querySelectorAll('.media__item'));
      return elements.sort((a, b) => {
        const valueA = a.querySelector(selector).textContent;
        const valueB = b.querySelector(selector).textContent;
  
        if (sortType === 'popularity') {
          return parseInt(valueB) - parseInt(valueA);
        } else if (sortType === 'date') {
          const dateA = new Date(valueA);
          const dateB = new Date(valueB);
          return dateB - dateA;
        } else {
          return valueA.localeCompare(valueB);
        }
      });
    }
  
    displaySortedElements(sortedElements) {
      const mediaSection = document.querySelector('.media');
      mediaSection.innerHTML = ''; // Delete current media selecltion
  
      sortedElements.forEach(element => {
        mediaSection.appendChild(element);
      });
    }
  }
  
  // SortTemplate instance creation
  const sortTemplate = new SortTemplate();
  
  // Sélectionnez les éléments qui déclencheront le tri
  const popularityButton = document.querySelector('.filter__dropdown--btn');
  const dateLink = document.querySelector('.filter__dropdown--content a:nth-child(1)');
  const titleLink = document.querySelector('.filter__dropdown--content a:nth-child(3)');
  
  // Events on click
  popularityButton.addEventListener('click', () => {
    sortTemplate.sortElements('popularity');
  });
  
  dateLink.addEventListener('click', () => {
    sortTemplate.sortElements('date');
  });
  
  titleLink.addEventListener('click', () => {
    sortTemplate.sortElements('name');
  });
  