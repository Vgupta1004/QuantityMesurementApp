# QuantityMesurementApp

## Use Case 4: Fetch Conversion Record
### Description
GET /conversions?from=X&to=Y

The Flow:-
 - export async function getConversion(from, to) { }
 - const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`)
 - const data = await res.json()   // json-server returns array even for one result
 - if (!data.length) throw new Error("No conversion found")
 - return data[0]