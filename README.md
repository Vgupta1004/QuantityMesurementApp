# QuantityMesurementApp

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