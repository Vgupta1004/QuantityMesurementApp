# QuantityMesurementApp

## Use Case 11: Set Active Button
### Description
Highlight selected type card / action tab / operator button

The Flow:-
 - function setActive(parentEl, clickedEl, childSelector) { }
 - parentEl.querySelectorAll(childSelector).forEach(el => el.classList.remove("active"))
 - clickedEl.classList.add("active")