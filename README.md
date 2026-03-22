# QuantityMesurementApp

## Use Case 12: Show Result
### Description
Write calculated value and unit to the RESULT panel

The Flow:-
 - function showResult(value, unitSymbol) { }
 - document.querySelector("#result-value").textContent = value
 - document.querySelector("#result-unit").textContent = unitSymbol
 - Add "highlight" class; setTimeout 1500 ms to remove it