async function getPhotographers() {
    const response = await fetch('https://anais-71.github.io/Front-End-Fisheye/data/photographers.json');
    const photographers = await response.json();
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer__section");

    photographers.forEach((photographer) => {
        // DOM elements creation
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

    console.log(photographers)
}

async function init() {
    // photographers data recovery 
    const { photographers } = await getPhotographers();
    console.log(photographers);
    displayData(photographers);
}

init();
