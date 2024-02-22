function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        //photographer card creation
        const article = document.createElement('article');
            //image recovery
        const img = document.createElement('img');
        img.setAttribute("src", picture)
            //name recovery
        const h2 = document.createElement('h2');
        h2.textContent = name;
            //location recovery
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
            //tagline recovery
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
            //price
        const p = document.createElement('p');
        p.textContent = price + "€/jour";

        //DOM elements creation
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);

        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}