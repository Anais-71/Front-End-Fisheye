// Generates the user card content for a photographer
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const templatePicture = "assets/photographers/account.png";

    // Redirects to the photographer's page when clicking on their card
    function redirectToPhotographerPage() {
        const url = `photographer.html?photographer_id=${id}`;
        console.log(url);
        window.location.href = url;
    }

    // Generates the DOM of the user card
    function getUserCardDOM() {
        // Create photographer card
        const article = document.createElement('article');
        article.classList.add('photographer__section--article');
        article.addEventListener('click', redirectToPhotographerPage);

        // Recover template image
        const template = document.createElement('template');
        template.setAttribute("src", templatePicture)
        template.setAttribute("aria-hidden", "true")
        template.classList.add('photographer__section--article--template')
        template.setAttribute("tabindex", "-1");
        
        // Recover image
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait of " + name);
        img.setAttribute("aria-label", "Portrait of " + name)
        img.classList.add('photographer__section--article--img')
        img.setAttribute("tabindex", "0");
        
        // Recover name
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("aria-label", name)
        h2.classList.add('photographer__section--article--name')
        h2.setAttribute("tabindex", "0");

        // Recover ID (for identification purposes, hidden)
        const idElement = document.createElement('span');
        idElement.textContent = id;
        idElement.style.display = "none";
        idElement.classList.add('photographer__section--article--id')
        
        // Recover location
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h3.setAttribute("aria-label", "Location of " + name + ":" + city + ", " + country)
        h3.classList.add('photographer__section--article--loc')
        h3.setAttribute("tabindex", "0");
        
        // Recover tagline
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("aria-label", "Tagline of " + name + ":" + tagline)
        h4.classList.add('photographer__section--article--tagline')
        h4.setAttribute("tabindex", "0");
        
        // Recover price
        const p = document.createElement('p');
        p.textContent = price + "€/day";
        p.setAttribute("aria-label", "Daily price of " + name+ ":" + price)
        p.classList.add('photographer__section--article--price')
        p.setAttribute("tabindex", "0");

        // Create DOM elements
        article.appendChild(template);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(idElement); // Renamed to avoid confusion with the previous "id" variable
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);

        return (article);
    }
    return { name, id, picture, city, country, tagline, price, getUserCardDOM }
}

// Adds event handlers for keyboard navigation
// Adds event handlers for keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight" || event.key === "Tab") { // Right arrow or Tab
        focusNextElement();
    } else if (event.key === "ArrowLeft" || (event.key === "Tab" && event.shiftKey)) { // Left arrow or Shift + Tab
        focusPreviousElement();
    }
});

// Moves focus to the next element
function focusNextElement() {
    const focused = document.activeElement;
    const elements = document.querySelectorAll('.photographer__section--article [tabindex="0"]');
    const currentIndex = Array.from(elements).indexOf(focused);
    const nextIndex = (currentIndex + 1) % elements.length;
    elements[nextIndex].focus();
}

// Moves focus to the previous element
function focusPreviousElement() {
    const focused = document.activeElement;
    const elements = document.querySelectorAll('.photographer__section--article [tabindex="0"]');
    const currentIndex = Array.from(elements).indexOf(focused);
    const previousIndex = (currentIndex - 1 + elements.length) % elements.length;
    elements[previousIndex].focus();
}