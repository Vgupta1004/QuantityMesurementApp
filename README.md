# QuantityMesurementApp

## Use Case 10: Populate Unit Dropdown
### Description
Fill a select with unit options after getUnits()

The Flow:-
 - function populateDropdown(selectEl, units) { }
 - selectEl.innerHTML = ""
 - Append disabled+selected default option: "-- Select Unit --"
 - units.forEach(u => {

     const opt = document.createElement("option")

     opt.value = u.symbol

     opt.textContent = `${u.label} (${u.symbol})`

     selectEl.appendChild(opt) })