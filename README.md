# QuantityMesurementApp

## Use Case 3: Fetch Units by Type
### Description
GET /units?type=X from json-server
The Flow:-
 - export async function getUnits(type) { }
 - const res = await fetch(`http://localhost:3000/units?type=${type}`)
 - if (!res.ok) throw new Error(`HTTP ${res.status}`)
 - return await res.json()