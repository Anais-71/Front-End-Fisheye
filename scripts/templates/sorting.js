document.addEventListener('DOMContentLoaded', function() {
    // Class for sorting elements
    class SortTemplate {
        // Method to sort elements based on sort type
        sortElements(sortType) {
            const sortedElements = this.sort(sortType);
            this.displaySortedElements(sortedElements);
        }

        // Method to perform sorting
        sort(sortType) {
            let selector;
            switch (sortType) {
                case 'name':
                    selector = '.media__item--desc--title';
                    break;
                case 'popularity':
                    selector = '.media__item--desc--likes';
                    break;
                case 'date':
                    selector = '.media__item--desc--date';
                    break;
                default:
                    console.error('Invalid sort type');
                    return [];
            }

            // Get elements to sort
            const elements = Array.from(document.querySelectorAll('.media__item'));
            return elements.sort((a, b) => {
                const valueA = a.querySelector(selector).textContent;
                const valueB = b.querySelector(selector).textContent;

                if (sortType === 'popularity') {
                    return parseInt(valueB) - parseInt(valueA); // Sort by popularity
                } else if (sortType === 'date') {
                    const dateA = new Date(valueA);
                    const dateB = new Date(valueB);
                    return dateB - dateA; // Sort by date
                } else {
                    return valueA.localeCompare(valueB); // Sort alphabetically
                }
            });
        }

        // Method to display sorted elements
        displaySortedElements(sortedElements) {
            const mediaSection = document.querySelector('.media');
            mediaSection.innerHTML = ''; // Clear current media selection

            sortedElements.forEach(element => {
                mediaSection.appendChild(element); // Append sorted elements to media section
            });
        }
    }

    // SortTemplate instance creation
    const sortTemplate = new SortTemplate();

    // Select elements triggering sorting
    const popularityButton = document.querySelector('.filter__dropdown--btn');
    const dateLink = document.querySelector('.filter__dropdown--content a:nth-child(1)');
    const titleLink = document.querySelector('.filter__dropdown--content a:nth-child(3)');

    // Events on click
    popularityButton.addEventListener('click', () => {
        sortTemplate.sortElements('popularity');
    });

    dateLink.addEventListener('click', () => {
        sortTemplate.sortElements('date');
    });

    titleLink.addEventListener('click', () => {
        sortTemplate.sortElements('name');
    });

    // Class for dropdown functionality
    class Dropdown {
        constructor() {
            // Select dropdown elements
            this.dropdownBtn = document.querySelector('.filter__dropdown--btn');
            this.dropdownContent = document.querySelector('.filter__dropdown--content');
            this.dropdownIcon = document.querySelector('.filter__dropdown--icon');
            this.dropdownDiv = document.querySelectorAll('.filter__dropdown--divider');

            this.isOpen = false; // Track dropdown state

            this.events(); // Call method to add event listeners
        }

        // Method to open dropdown
        openDropdown() {
            this.dropdownContent.style.display = "block";
            this.dropdownBtn.style.borderBottomRightRadius = "0px";
            this.dropdownBtn.style.borderBottomLeftRadius = "0px";
            this.dropdownBtn.setAttribute('aria-expanded', 'true');
            this.dropdownDiv.forEach(div => {
                div.style.display = "block";
            });

            // Change dropdown icon
            this.dropdownIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.88 20.5466L16 14.44L22.12 20.5466L24 18.6666L16 10.6666L8 18.6666L9.88 20.5466Z" fill="white"/>
                </svg>
            `;

            this.isOpen = true; // Update dropdown state
        }

        // Method to close dropdown
        closeDropdown() {
            this.dropdownContent.style.display = "none";
            this.dropdownBtn.style.borderBottomRightRadius = "5px";
            this.dropdownBtn.style.borderBottomLeftRadius = "5px";
            this.dropdownBtn.setAttribute('aria-expanded', 'false');
            this.dropdownDiv.forEach(div => {
                div.style.display = "none";
            });

            // Change dropdown icon
            this.dropdownIcon.innerHTML = `
                <svg class="filter__dropdown--icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.88 11.4534L16 17.56L22.12 11.4534L24 13.3334L16 21.3334L8 13.3334L9.88 11.4534Z" fill="white"/>
                </svg>
            `;

            this.isOpen = false; // Update dropdown state
        }

        // Method to add event listeners
        events() {
            // Event listener for dropdown button click
            this.dropdownBtn.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeDropdown(); // Close dropdown if open
                } else {
                    this.openDropdown(); // Open dropdown if closed
                }
            });
        }
    }

    const dropdownInstance = new Dropdown(); // Create Dropdown instance
});