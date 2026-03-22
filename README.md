# QuantityMesurementApp

## Use Case 2: Initialise App on Page Load
### Description
Wire up event listeners and load default data
The Flow:-
 - Wrap all code in: document.addEventListener("DOMContentLoaded", async () => { ... })
 - Declare state = { type:"Length", action:"Conversion", fromVal:null, fromUnit:"", toVal:null, toUnit:"", operator:"+" }
 - Call attachEventListeners().
 - Call loadUnits("Length") to populate FROM and TO dropdowns.
 - Set first type-card and first action-button as active.
 - Hide operator row: toggleOperators(false).
 - Call loadHistory().