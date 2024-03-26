export default class Lightbox {
    constructor(mediaData, initialIndex) {
        this.currentIndex = initialIndex;
        this.mediaItems = mediaData;

        // DOM Elements
        this.body = document.querySelector('main')
        this.mainContainer = document.querySelector('.lightbox');
        this.closeButton = document.querySelector('.lightbox__close');
        this.nextButton = document.querySelector('.lightbox__next');
        this.prevButton = document.querySelector('.lightbox__prev');
        this.titleElement = document.querySelector('.lightbox__title');
        this.mediaContainer = document.querySelector('.lightbox__container');

        this.attachEvents();
        this.render();
    }

    // Attach event listeners
    attachEvents() {
        // Event listeners for buttons
        this.closeButton.addEventListener('click', () => this.closeLightBox());
        this.nextButton.addEventListener('click', () => this.next());
        this.prevButton.addEventListener('click', () => this.prev());

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.prev();
            } else if (event.key === 'ArrowRight') {
                this.next();
            } else if (event.key === 'Escape') {
                this.closeLightBox();
            }
        });
    }

    // Open lightbox
    openLightBox() {
        this.mainContainer.style.display = 'block';
        this.mainContainer.setAttribute('aria-hidden', 'false');
        this.body.setAttribute('aria-hidden', 'true'); 
        this.render();
    }

    // Close lightbox
    closeLightBox() {
        this.mainContainer.style.display = 'none';
        this.mainContainer.setAttribute('aria-hidden', 'true');
        this.body.setAttribute('aria-hidden', 'false'); 
    }

    // Go to next item
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
        this.render();
    }

    // Go to previous item
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
        this.render();
    }

    // Render content
    render() {
        // Clear previous content
        this.mediaContainer.innerHTML = '';

        // Create new media element
        const currentMedia = this.mediaItems[this.currentIndex];
        if (currentMedia.type === 'image') {
            const image = document.createElement('img');
            image.src = currentMedia.url;
            this.mediaContainer.appendChild(image);
        } else if (currentMedia.type === 'video') {
            const video = document.createElement('video');
            video.src = currentMedia.url;
            video.controls = true;
            this.mediaContainer.appendChild(video);
        }

        // Update title
        this.titleElement.textContent = currentMedia.title;
    }
}