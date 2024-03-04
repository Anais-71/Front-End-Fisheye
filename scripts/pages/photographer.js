document.addEventListener("DOMContentLoaded", function () {
    // Parent element recovery
    const photographerDetailsContainer = document.querySelector('.photograph__header');

    // Photographer ID recovery from URL
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get('photographer_id');


    // Photographers data recovery and display
    fetch(`../../data/photographers.json`)
        .then(response => response.json())
        .then(data => {
            // Find the photographer data by ID
            const photographerData = data.photographers.find(photographer => photographer.id === parseInt(photographerId));
            if (photographerData) {
                displayPhotographerDetails(photographerData, photographerDetailsContainer);
            }
        })
        .catch(error => {
            console.error('Error loading photographer data:', error);
        });

    function displayPhotographerDetails(photographerData, container) {
        // Elements recovery and creation
        const div = document.createElement('div');
        div.classList.add('photograph__header--details');

        const h2 = document.createElement('h2');
        h2.textContent = photographerData.name;
        h2.setAttribute("aria-label", photographerData.name)
        h2.classList.add('photograph__header--details--name');

        const h3 = document.createElement('h3');
        h3.textContent = photographerData.city + ", " + photographerData.country;
        h3.setAttribute("aria-label", "Localisation de " + photographerData.name + ":" + photographerData.city + ", " + photographerData.country)
        h3.classList.add('photograph__header--details--loc');

        const h4 = document.createElement('h4');
        h4.textContent = photographerData.tagline;
        h4.setAttribute("aria-label", "Slogan de " + photographerData.name + ": " + photographerData.tagline)
        h4.classList.add('photograph__header--details--tagline');

        const img = document.createElement('img');
        img.setAttribute("src", "../../assets/photographers/" + photographerData.portrait);
        img.setAttribute("alt", "Portrait de " + photographerData.name);
        img.setAttribute("aria-label", "Portrait de " + photographerData.name)
        img.classList.add('photograph__header--img');

        // Add elements to the container
        container.appendChild(div)
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        container.appendChild(img);

        // Keyboard navigation
        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                const nextPhotographer = container.nextElementSibling;
                if (nextPhotographer) {
                    nextPhotographer.focus();
                }
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevPhotographer = container.previousElementSibling;
                if (prevPhotographer) {
                    prevPhotographer.focus();
                }
            }
        });
    }
});
