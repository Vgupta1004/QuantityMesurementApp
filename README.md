# QuantityMesurementApp

Start the Backend:

```
json-server --watch db.json --port 3000
```

### ⚠️ Troubleshooting: Page Refreshing Automatically
If the website resets every time you perform a calculation, it's because **VS Code Live Server** detects a change in `db.json`. 

**To fix this:** Go to VS Code Settings -> `Live Server › Settings: Ignore Files` and add `db.json` to the list.

----

## Use Case 1: Create db.json
### Description
Define the JSON Server database schema and seed data

The Flow:-
	
1. Create db.json at project root.

2. Add "units" array with objects: { id, type, label, symbol }.

3. Add "conversions" array with objects: { id, from, to, factor, formula }.

4. Add "history" array — start empty: [].

5. Verify GET http://localhost:3000/units returns the full array.

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

## Use Case 3: Fetch Units by Type
### Description
GET /units?type=X from json-server
The Flow:-
 - export async function getUnits(type) { }
 - const res = await fetch(`http://localhost:3000/units?type=${type}`)
 - if (!res.ok) throw new Error(`HTTP ${res.status}`)
 - return await res.json()

## Use Case 4: Fetch Conversion Record
### Description
GET /conversions?from=X&to=Y

The Flow:-
 - export async function getConversion(from, to) { }
 - const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`)
 - const data = await res.json()   // json-server returns array even for one result
 - if (!data.length) throw new Error("No conversion found")
 - return data[0]

## Use Case 5: Save to History
### Description
POST /history

The Flow:-
 - export async function saveHistory(record) { }
 - const res = await fetch(`${BASE_URL}/history`, {

     method: "POST",

     headers: { "Content-Type": "application/json" },

     body: JSON.stringify(record)

   })
 - return await res.json()

## Use Case 6: Load History
### Description
GET /history?_sort=timestamp&_order=desc

The Flow:-
 - export async function getHistory() { }
 - const res = await fetch(`${BASE_URL}/history?_sort=timestamp&_order=desc`)
 - return await res.json()

## Use Case 7: Apply Conversion
### Description
Multiply by factor OR evaluate formula string

The Flow:-
 - function applyConversion(value, convObj) { }
 - if (convObj.factor !== null)

     return parseFloat((value * convObj.factor).toFixed(6))
 - else (formula path):

     const expr = convObj.formula.replace("x", value)

     return parseFloat(eval(expr).toFixed(6))

## Use Case 8: Compare Two Values
### Description
Normalise both to base unit, then compare

The Flow:-
 - function compareValues(v1, u1, v2, u2, base1, base2) { }
 - if (base1 > base2) return `${v1} ${u1} is GREATER than ${v2} ${u2}`
 - if (base1 < base2) return `${v1} ${u1} is LESS than ${v2} ${u2}`
 - return `${v1} ${u1} is EQUAL to ${v2} ${u2}`

## Use Case 9: Arithmetic Operation
### Description
Apply +/−/×/÷ after normalising TO value to FROM unit

The Flow:-
 - function performArithmetic(v1, v2normalised, op) { }
 - switch(op):
   "+": return parseFloat((v1 + v2normalised).toFixed(6))

   "-": return parseFloat((v1 - v2normalised).toFixed(6))

   "*": return parseFloat((v1 * v2normalised).toFixed(6))

   "/": if (v2normalised === 0) throw Error("Divide by zero")

        return parseFloat((v1 / v2normalised).toFixed(6))
 - default: throw Error("Unknown operator")

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

## Use Case 11: Set Active Button
### Description
Highlight selected type card / action tab / operator button

The Flow:-
 - function setActive(parentEl, clickedEl, childSelector) { }
 - parentEl.querySelectorAll(childSelector).forEach(el => el.classList.remove("active"))
 - clickedEl.classList.add("active")

## Use Case 12: Show Result
### Description
Write calculated value and unit to the RESULT panel

The Flow:-
 - function showResult(value, unitSymbol) { }
 - document.querySelector("#result-value").textContent = value
 - document.querySelector("#result-unit").textContent = unitSymbol
 - Add "highlight" class; setTimeout 1500 ms to remove it

## Use Case 13:  Toggle Operator Row
### Description
Show or hide the +/−/×/÷ buttons based on action mode

The Flow:-
 - function toggleOperators(show) { }
 - document.querySelector("#operator-selector").style.display = show ? "flex" : "none"

## Use Case 14: Render History List
### Description
Clear and rebuild the history panel from an array of records

The Flow:-
 - function renderHistory(records) { }
 - const list = document.querySelector("#history-list")
 - list.innerHTML = ""
 - if (!records.length) { list.innerHTML = "<li>No history yet.</li>"; return }
 - records.forEach(r => {

     const li = document.createElement("li")

     li.textContent = `${r.expression}  =  ${r.result}  (${new Date(r.timestamp).toLocaleString()})`

     list.appendChild(li) })

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

## Use Case 16: Handle Action Tab Click
### Description
Switch mode, toggle operator row, reset result

The Flow:-
 - querySelectorAll(".action-btn").forEach(btn => btn.addEventListener("click", () => {
 - state.action = btn.dataset.action
 - setActive(actionSelector, btn, ".action-btn")
 - toggleOperators(state.action === "Arithmetic")
 - showResult(0, "") }))

## Use Case 17: Execute Calculation
### Description
Run conversion, comparison or arithmetic and display result

The Flow:-
1.   async function calculate() { try {

2.   if (state.action === "Conversion") {

       const conv = await getConversion(state.fromUnit, state.toUnit)

       const res = applyConversion(state.fromVal, conv)

       showResult(res, state.toUnit) }

3.   else if (state.action === "Comparison") {

       // convert both to base, call compareValues(), showResult(sentence, "") }

4.   else { // Arithmetic

       // normalise toVal to fromUnit, call performArithmetic(), showResult() }

5.   const record = { type:state.type, action:state.action, expression:..., result:..., timestamp: new Date().toISOString() }

6.   await saveHistory(record)

7.   renderHistory(await getHistory())

   } catch(e) { showResult("Error: " + e.message, "") } }
