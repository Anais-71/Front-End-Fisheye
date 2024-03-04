function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const templatePicture = "assets/photographers/account.png";

    function redirectToPhotographerPage() {
        const url = `photographer.html?photographer_id=${id}`;
        console.log(url);
        window.location.href = url;
    }

    function getUserCardDOM() {
        //photographer card creation
        const article = document.createElement('article');
        article.classList.add('photographer__section--article');
        article.addEventListener('click', redirectToPhotographerPage);
        
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
        h2.setAttribute("aria-label", name)
        h2.classList.add('photographer__section--article--name')

        //ID
        const id = document.createElement('id');
        id.textContent = id;
        id.style.display = "none";
        id.classList.add('photographer__section--article--id')
        
        //location recovery
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h3.setAttribute("aria-label", "Localisation de " + name + ":" + city + ", " + country)
        h3.classList.add('photographer__section--article--loc')
        
        //tagline recovery
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("aria-label", "Slogan de " + name + ":" + tagline)
        h4.classList.add('photographer__section--article--tagline')
        
        //price
        const p = document.createElement('p');
        p.textContent = price + "€/jour";
        p.setAttribute("aria-label", "Prix journalier de " + name+ ":" + price)
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
    return { name, id, picture, city, country, tagline, price, getUserCardDOM }
}
