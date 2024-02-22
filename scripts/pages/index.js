async function getPhotographers() {
    const reponse = await fetch("../../data/photographers.json");
    const photographer = await reponse.json();
    return photographer;
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

