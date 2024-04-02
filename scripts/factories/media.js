export default class MediaFactory {
    static createMediaElement(mediaItem, photographerName) {
        let mediaElement;
        if (mediaItem.image) {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute('src', `assets/photographers/${photographerName}/${mediaItem.image}`);
            mediaElement.setAttribute('lang', 'en');
            mediaElement.setAttribute('alt', 'image', mediaItem.title);
            mediaElement.setAttribute('aria-label','image',  mediaItem.title);
        } else if (mediaItem.video) {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('src', `assets/photographers/${photographerName}/${mediaItem.video}`);
            mediaElement.setAttribute('controls', true);
            mediaElement.setAttribute('lang', 'en');
            mediaElement.setAttribute('alt', 'vidéo', mediaItem.title);
            mediaElement.setAttribute('aria-label', 'vidéo', mediaItem.title);
        }

        mediaElement.setAttribute('tabindex', 0);
        mediaElement.classList.add('media__item--media');
        return mediaElement;
    }
}