# QuantityMesurementApp

## Use Case 6: Load History
### Description
GET /history?_sort=timestamp&_order=desc

The Flow:-
 - export async function getHistory() { }
 - const res = await fetch(`${BASE_URL}/history?_sort=timestamp&_order=desc`)
 - return await res.json()