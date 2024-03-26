// Import class for images and videos creation
import MediaFactory from '../factories/media.js';
import Lightbox from '../models/lightbox.js';

// Class for managing likes
class LikesObserver {
    constructor(priceElement, photographerData) {
        // Initialize total likes
        this.totalLikes = 0;
        this.priceElement = priceElement;
        this.photographerData = photographerData;
        this.likedContentIds = this.getLikedContentIdsFromLocalStorage(); // Retrieves IDs of already liked content from local storage
        this.updatePrice(); // Updates the displayed price with current total likes
    }

    // Method to toggle like for the photographer's content
    toggleLike() {
        const contentId = this.photographerData.id;

        // If the content is already liked, remove like; otherwise, add like
        if (this.isContentLikedByUser(contentId)) {
            this.removeLikedContentIdFromLocalStorage(contentId);
            this.totalLikes--;
        } else {
            this.addLikedContentIdToLocalStorage(contentId);
            this.totalLikes++;
        }

        this.updatePrice();
    }

    // Method to update total likes
    update(likes) {
        this.totalLikes = likes;
        this.updatePrice();
    }

    // Method to update the displayed price based on total likes
    updatePrice() {
        const photographerPrice = this.photographerData.price;
        this.priceElement.innerHTML = `${this.totalLikes}   
        <span class="price__fav" aria-label="mentions j'aime"><i class="fa-solid fa-heart"></i></span> 
        <span class="price__wrapper" aria-label="Prix journalier :">${photographerPrice} € / jour</span>`;
    }

    // Method to retrieve liked content IDs from local storage
    getLikedContentIdsFromLocalStorage() {
        const likedContentIdsString = localStorage.getItem('likedContentIds');
        return likedContentIdsString ? JSON.parse(likedContentIdsString) : [];
    }

    // Method to check if content is liked by user
    isContentLikedByUser(contentId) {
        return this.likedContentIds.includes(contentId);
    }

    // Method to add content ID to liked content IDs in local storage
    addLikedContentIdToLocalStorage(contentId) {
        this.likedContentIds.push(contentId);
        localStorage.setItem('likedContentIds', JSON.stringify(this.likedContentIds));
    }

    // Method to remove content ID from liked content IDs in local storage
    removeLikedContentIdFromLocalStorage(contentId) {
        const index = this.likedContentIds.indexOf(contentId);
        if (index !== -1) {
            this.likedContentIds.splice(index, 1);
            localStorage.setItem('likedContentIds', JSON.stringify(this.likedContentIds));
        }
    }
}

// Wait for DOM content to be loaded before executing
document.addEventListener("DOMContentLoaded", function () {
    const Container = document.querySelector('.photograph__header');
    const ImgContainer = document.querySelector('.photograph__header--img');
    const MediaContainer = document.querySelector('.media');
    const priceElement = document.querySelector('.price');
    const modalHeader = document.querySelector('.contact__modal--header');

    // Retrieve photographer ID from URL parameters
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get('photographer_id');

    // Fetch photographer data from JSON file and process
    fetch(`https://anais-71.github.io/Front-End-Fisheye/data/photographers.json`)
        .then(response => response.json())
        .then(data => {
            // Find photographer data by ID
            const photographerData = data.photographers.find(photographer => photographer.id === parseInt(photographerId));
            if (photographerData) {
                // Create LikesObserver instance within the price element
                const likesObserver = new LikesObserver(priceElement, photographerData);
                // Display photographer details and media
                displayPhotographerDetails(photographerData, Container);
                displayPhotographerMedia(data, photographerData, MediaContainer, likesObserver);

                // Attach event listener to each media item to open lightbox
                const mediaItems = document.querySelectorAll('.media__item--media');
                mediaItems.forEach((mediaItem, index) => {
                    mediaItem.addEventListener('click', () => {
                        const mediaData = getMediaDataForLightbox(data, photographerData);
                        const lightbox = new Lightbox(mediaData, index);
                        lightbox.openLightBox();
                    });

                    mediaItem.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            const mediaData = getMediaDataForLightbox(data, photographerData);
                            const lightbox = new Lightbox(mediaData, index);
                            lightbox.openLightBox();
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading photographer data:', error);
        });

    // Function to prepare media data for the lightbox
    function getMediaDataForLightbox(data, photographerData) {
        const photographerName = photographerData.name.split(' ')[0];
        const mediaData = [];
        data.media.forEach(mediaItem => {
            if (mediaItem.photographerId === photographerData.id) {
                mediaData.push({
                    type: mediaItem.image ? 'image' : 'video',
                    url: `assets/photographers/${photographerName}/${mediaItem.image || mediaItem.video}`,
                    title: mediaItem.title,
                    likes: mediaItem.likes
                });
            }
        });
        return mediaData;
    }

    // Function to display media
    function displayPhotographerMedia(data, photographerData, MediaContainer, observer) {
        const photographerName = photographerData.name.split(' ')[0];
        let totalLikes = 0;

        // Filter media by photographer ID and display each item
        const filteredMedia = data.media.filter(media => media.photographerId === photographerData.id);
        filteredMedia.forEach(mediaItem => {
            const mediaItemContainer = document.createElement('div');
            mediaItemContainer.classList.add('media__item');

            const mediaElement = MediaFactory.createMediaElement(mediaItem, photographerName);
            mediaItemContainer.appendChild(mediaElement);

            // Create description elements for the media item
            const descContainer = document.createElement('div');
            descContainer.classList.add('media__item--desc');

            const title = document.createElement('h3');
            title.textContent = mediaItem.title;
            title.setAttribute('aria-hidden', 'true');
            title.classList.add('media__item--desc--title');

            const date = document.createElement('p'); // hidden - date recovered for sorting needs
            date.textContent = mediaItem.date;
            date.style.display = "none";
            date.classList.add('media__item--desc--date');

            const fav = document.createElement('i');
            fav.classList.add('fa-solid', 'fa-heart');
            fav.setAttribute('alt', 'Bouton "j\'aime"');
            fav.setAttribute('aria-label', 'Bouton "j\'aime"');
            fav.classList.add('media__item--desc--fav');
            fav.setAttribute('tabindex', 0);

            const likes = document.createElement('span');
            const likesCount = String(mediaItem.likes).match(/\d+/)[0];
            likes.textContent = likesCount;
            likes.setAttribute('aria-label', 'Nombre de mentions "j\'aime"');
            likes.classList.add('media__item--desc--likes');

            // Event listener to handle liking of media items
            fav.addEventListener('click', () => {
                if (!fav.classList.contains('liked')) {
                    mediaItem.likes++;
                    totalLikes++;
                    observer.update(totalLikes);
                    likes.textContent = mediaItem.likes;
                    fav.classList.add('liked');
                }
            });

            // Add keyboard event listener to handle liking of media items
            fav.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    if (!fav.classList.contains('liked')) {
                        mediaItem.likes++;
                        totalLikes++;
                        observer.update(totalLikes);
                        likes.textContent = mediaItem.likes;
                        fav.classList.add('liked');
                    }
                }
            });

            // Append elements to media item container
            descContainer.appendChild(title);
            descContainer.appendChild(likes);
            descContainer.appendChild(fav);
            descContainer.appendChild(date);

            mediaItemContainer.appendChild(descContainer);
            MediaContainer.appendChild(mediaItemContainer);
            totalLikes += mediaItem.likes;
        });
        observer.update(totalLikes); // Update total likes count displayed in observer
    }

    // Function to display photographer details
    function displayPhotographerDetails(photographerData, container) {
        // Create and append elements for photographer details
        const h2 = document.createElement('h2');
        h2.textContent = photographerData.name;
        h2.setAttribute("aria-label", photographerData.name);
        h2.classList.add('photograph__header--details--name');

        const h3 = document.createElement('h3');
        h3.textContent = photographerData.city + ", " + photographerData.country;
        h3.setAttribute("aria-label", "Localisation de " + photographerData.name + ": " + photographerData.city + ", " + photographerData.country);
        h3.classList.add('photograph__header--details--loc');

        const h4 = document.createElement('h4');
        h4.textContent = photographerData.tagline;
        h4.setAttribute("aria-label", "Slogan de " + photographerData.name + ": " + photographerData.tagline);
        h4.classList.add('photograph__header--details--tagline');

        const img = document.createElement('img');
        img.setAttribute("src", "assets/photographers/" + photographerData.portrait);
        img.setAttribute("alt", "Portrait de " + photographerData.name);
        img.setAttribute("aria-label", "Portrait de " + photographerData.name);
        img.classList.add('photograph__header--img');

        const name = document.createElement('h2');
        name.textContent = photographerData.name;
        name.setAttribute("aria-label", photographerData.name);

        // Append elements to the container
        container.appendChild(h2);
        container.appendChild(h3);
        container.appendChild(h4);
        ImgContainer.appendChild(img);
        modalHeader.appendChild(name);
    }
});