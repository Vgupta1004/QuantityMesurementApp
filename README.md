# QuantityMesurementApp

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