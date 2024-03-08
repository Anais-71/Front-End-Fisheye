// Observer class to track changes in media likes
class LikesObserver {
    constructor(priceElement, photographerData) {
        this.totalLikes = 0;
        this.priceElement = priceElement;
        this.photographerData = photographerData;
        this.updatePrice();
    }

    // Update the total likes and display it
    update(likes) {
        this.totalLikes = likes;
        this.updatePrice();
    }

    // Update element with total likes
    updatePrice() {
        const photographerPrice = this.photographerData.price;
        this.priceElement.innerHTML = `${this.totalLikes}   
        <span><i class="fa-solid fa-heart"></i></span> 
        <span class="price__wrapper" aria-label="Prix journalier ${photographerPrice} euros par jour">${photographerPrice} € / jour</span>`;
    }
}

// Main function
document.addEventListener("DOMContentLoaded", function () {
    // Recovery of parent elements
    const Container = document.querySelector('.photograph__header');
    const DetailsContainer = document.querySelector('.photograph__header--details');
    const ImgContainer = document.querySelector('.photograph__header--img');
    const MediaContainer = document.querySelector('.media');
    const priceElement = document.querySelector('.price');

    // Recovery of photographer ID from URL
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get('photographer_id');

    // Recovery and display of photographers' data
    fetch(`https://anais-71.github.io/Front-End-Fisheye/data/photographers.json`)
        .then(response => response.json())
        .then(data => {
            // Find the photographer data by ID
            const photographerData = data.photographers.find(photographer => photographer.id === parseInt(photographerId));
            if (photographerData) {
                // Creation of the likes observer within the .price div
                const likesObserver = new LikesObserver(priceElement, photographerData);
                displayPhotographerDetails(photographerData, Container);
                displayPhotographerMedia(data, photographerData, MediaContainer, likesObserver);
            }
        })
        .catch(error => {
            console.error('Error loading photographer data:', error);
        });

    // Function to display media
    function displayPhotographerMedia(data, photographerData, MediaContainer, observer) {
        const photographerName = photographerData.name.split(/[\s-]+/)[0];
        let totalLikes = 0;

        const filteredMedia = data.media.filter(media => media.photographerId === photographerData.id);
        filteredMedia.forEach(mediaItem => {
            const mediaItemContainer = document.createElement('div');
            mediaItemContainer.classList.add('media__item');

            if (mediaItem.image) {
                const img = document.createElement('img');
                img.setAttribute('src', `../../assets/photographers/${photographerName}/${mediaItem.image}`);
                img.setAttribute('alt', mediaItem.title);
                img.setAttribute('aria-label', mediaItem.title);
                img.classList.add('media__item--media');
                mediaItemContainer.appendChild(img);
            } else if (mediaItem.video) {
                const vid = document.createElement('video');
                vid.setAttribute('src', `../../assets/photographers/${photographerName}/${mediaItem.video}`);
                vid.setAttribute('alt', mediaItem.title);
                vid.setAttribute('aria-label', mediaItem.title);
                vid.setAttribute('controls', true);
                vid.setAttribute('tab-index', 0);
                vid.classList.add('media__item--media');
                mediaItemContainer.appendChild(vid);
            }

            const descContainer = document.createElement('div');
            descContainer.classList.add('media__item--desc');

            const title = document.createElement('h3');
            title.textContent = mediaItem.title;
            title.setAttribute('aria-label', "title of the content: " + mediaItem.title)
            title.classList.add('media__item--desc--title');

            const fav = document.createElement('i');
            fav.classList.add('fa-solid', 'fa-heart');
            fav.setAttribute('alt', "Like icon");
            fav.setAttribute('aria-label', "Like icon");
            fav.classList.add('media__item--desc--fav');

            const likes = document.createElement('span');
            const likesCount = String(mediaItem.likes).match(/\d+/)[0];
            likes.textContent = likesCount;
            likes.setAttribute('aria-label', "number of likes " + likesCount);
            likes.classList.add('media__item--desc--likes');

            fav.addEventListener('click', () => {
                mediaItem.likes++;
                totalLikes++;
                observer.update(totalLikes);
                likes.textContent = mediaItem.likes;
            });

            descContainer.appendChild(title);
            descContainer.appendChild(likes);
            descContainer.appendChild(fav);

            mediaItemContainer.appendChild(descContainer);
            MediaContainer.appendChild(mediaItemContainer);
            totalLikes += mediaItem.likes;
        });
        observer.update(totalLikes);
    }

    // Function to display photographer details
    function displayPhotographerDetails(photographerData, container) {
        // Elements recovery and creation
        const h2 = document.createElement('h2');
        h2.textContent = photographerData.name;
        h2.setAttribute("aria-label", photographerData.name);
        h2.classList.add('photograph__header--details--name');

        const h3 = document.createElement('h3');
        h3.textContent = photographerData.city + ", " + photographerData.country;
        h3.setAttribute("aria-label", "Location of " + photographerData.name + ":" + photographerData.city + ", " + photographerData.country);
        h3.classList.add('photograph__header--details--loc');

        const h4 = document.createElement('h4');
        h4.textContent = photographerData.tagline;
        h4.setAttribute("aria-label", "Tagline of " + photographerData.name + ": " + photographerData.tagline);
        h4.classList.add('photograph__header--details--tagline');

        const img = document.createElement('img');
        img.setAttribute("src", "../../assets/photographers/" + photographerData.portrait);
        img.setAttribute("alt", "Portrait of " + photographerData.name);
        img.setAttribute("aria-label", "Portrait of " + photographerData.name);
        img.classList.add('photograph__header--img');

        // Add elements to the container
        DetailsContainer.appendChild(h2);
        DetailsContainer.appendChild(h3);
        DetailsContainer.appendChild(h4);
        ImgContainer.appendChild(img);
    }

    // Keyboard navigation
    Container.setAttribute('tabindex', '0');
    Container.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextPhotographer = Container.nextElementSibling;
            if (nextPhotographer) {
                nextPhotographer.focus();
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevPhotographer = Container.previousElementSibling;
            if (prevPhotographer) {
                prevPhotographer.focus();
            }
        }
    });
});
