function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const templatePicture = "assets/photographers/account.png";

    function getUserCardDOM() {
        //photographer card creation
        const article = document.createElement('article');
        article.classList.add('photographer__section--article');
        
        // Keyboard navigation
        article.setAttribute('tabindex', '0');
        article.addEventListener('keydown', (event) => {
            // Right arrow
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                const nextPhotographer = article.nextElementSibling;
                if (nextPhotographer) {
                    nextPhotographer.focus();
                }
            }
            // Left arrow
            else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevPhotographer = article.previousElementSibling;
                if (prevPhotographer) {
                    prevPhotographer.focus();
                }
            }
        });

        //img template recovery
        const template = document.createElement('template');
        template.setAttribute("src", templatePicture)
        template.setAttribute("aria-hidden", "true")
        template.classList.add('photographer__section--article--template')
        
        //image recovery
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de " + name);
        img.setAttribute("aria-label", "Portrait de " + name)
        img.classList.add('photographer__section--article--img')
        
        //name recovery
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe")
        h2.classList.add('photographer__section--article--name')
        
        //location recovery
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h3.setAttribute("aria-label", "Localisation de " + name)
        h3.classList.add('photographer__section--article--loc')
        
        //tagline recovery
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("aria-label", "Slogan de " + name)
        h4.classList.add('photographer__section--article--tagline')
        
        //price
        const p = document.createElement('p');
        p.textContent = price + "€/jour";
        p.setAttribute("aria-label", "Prix journalier de " + name)
        p.classList.add('photographer__section--article--price')

        //DOM elements creation
        article.appendChild(template);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);

        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
