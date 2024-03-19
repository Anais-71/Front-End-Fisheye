document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab' && !event.shiftKey) {
        focusNextElement(); // next element with tab
    } else if (event.key === 'Tab' && event.shiftKey) { 
        focusPreviousElement(); // previous element with tab + shift
    } else if (event.key === 'Enter') {
        clickFocusedElement(); // Click with enter
    }
});

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

function clickFocusedElement() {
    var focused = document.activeElement;
    if (focused.tagName === 'BUTTON' || focused.tagName === 'A') {
        focused.click();
    }
}