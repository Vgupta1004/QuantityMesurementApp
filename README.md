# QuantityMesurementApp

## Use Case 15: Handle Type Card Click
### Description
Update state, reload units, reset result

The Flow:-
 - querySelectorAll(".type-card").forEach(card => card.addEventListener("click", async () => {
 - state.type = card.dataset.type
 - setActive(typeSelector, card, ".type-card")
 - fromInput.value = ""; toInput.value = ""; showResult(0, "")
 - const units = await getUnits(state.type)
 - populateDropdown(fromSelect, units)
 - populateDropdown(toSelect, units)
 - state.fromUnit = ""; state.toUnit = "" }))