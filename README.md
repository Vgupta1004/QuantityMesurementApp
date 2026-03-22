# QuantityMesurementApp

## Use Case 16: Handle Action Tab Click
### Description
Switch mode, toggle operator row, reset result

The Flow:-
 - querySelectorAll(".action-btn").forEach(btn => btn.addEventListener("click", () => {
 - state.action = btn.dataset.action
 - setActive(actionSelector, btn, ".action-btn")
 - toggleOperators(state.action === "Arithmetic")
 - showResult(0, "") }))