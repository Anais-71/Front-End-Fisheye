document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        focusNextElement(); // Focus next element with right arrow
    } else if (event.key === 'ArrowLeft') { 
        focusPreviousElement(); // Focus previous element with left arrow
    } else if (event.key === 'Enter' || event.key === ' ') {
        click(); // Click with Enter or space
    }
});

// eslint-disable-next-line no-unused-vars, no-undef
function handleDropdownKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        dropdown.openDropdown();
    }
}

function focusNextElement() {
    var focused = document.activeElement;
    if (focused.nextElementSibling) {
        focused.nextElementSibling.focus();
    }
}

function focusPreviousElement() {
    var focused = document.activeElement;
    if (focused.previousElementSibling) {
        focused.previousElementSibling.focus();
    }
}

function click() {
    var focused = document.activeElement;
    // Ajuster la vérification selon vos besoins
    if (focused.tagName === 'BUTTON' || focused.tagName === 'A') {
        focused.click();
    } else {
        var clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        focused.dispatchEvent(clickEvent);
    }
}