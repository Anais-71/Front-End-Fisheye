document.addEventListener('DOMContentLoaded', function() {

    class Dropdown {
        constructor() {
            this.dropdownBtn = document.querySelector('.filter__dropdown--btn');
            this.dropdownContent = document.querySelector('.filter__dropdown--content');
            this.dropdownIcon = document.querySelector('.filter__dropdown--icon');
            this.dropdownDiv = document.querySelectorAll('.filter__dropdown--divider');
            
            this.isOpen = false; // Whatch dropdown state
            
            this.events();
        }
        
        openDropdown() {
            this.dropdownContent.style.display = "block";
            this.dropdownBtn.style.borderBottomRightRadius = "0px";
            this.dropdownBtn.style.borderBottomLeftRadius = "0px";
            this.dropdownBtn.setAttribute('aria-expanded', 'true');
            this.dropdownDiv.forEach(div => {
                div.style.display = "block";
            });
            
            // Icon change
            this.dropdownIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.88 20.5466L16 14.44L22.12 20.5466L24 18.6666L16 10.6666L8 18.6666L9.88 20.5466Z" fill="white"/>
                </svg>
            `;
            
            this.isOpen = true; // Dropdown state update
        }
        
        closeDropdown() {
            this.dropdownContent.style.display = "none";
            this.dropdownBtn.style.borderBottomRightRadius = "5px";
            this.dropdownBtn.style.borderBottomLeftRadius = "5px";
            this.dropdownBtn.setAttribute('aria-expanded', 'false');
            this.dropdownDiv.forEach(div => {
                div.style.display = "none";
            });
            
            // Icon change
            this.dropdownIcon.innerHTML = `
                <svg class="filter__dropdown--icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.88 11.4534L16 17.56L22.12 11.4534L24 13.3334L16 21.3334L8 13.3334L9.88 11.4534Z" fill="white"/>
                </svg>
            `;
            
            this.isOpen = false; // Dropdown state update
        }
        
        events() {
            this.dropdownBtn.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeDropdown();
                } else {
                    this.openDropdown();
                }
            });
            
            // Event handler on the underlying element to prevent dropdown menu from closing when clicked
            this.dropdownContent.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            
            // Event handler to close dropdown menu when click outside
            document.addEventListener('click', (event) => {
                if (this.isOpen && !this.dropdownBtn.contains(event.target) && !this.dropdownContent.contains(event.target)) {
                    this.closeDropdown();
                }
            });
        }
    }
    
    const dropdownInstance = new Dropdown(); // Dropdown instance creation
    
});
