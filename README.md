# QuantityMesurementApp

## Use Case 1: Create db.json
### Description
Define the JSON Server database schema and seed data

The Flow:-
	
1. Create db.json at project root.

2. Add "units" array with objects: { id, type, label, symbol }.

3. Add "conversions" array with objects: { id, from, to, factor, formula }.

4. Add "history" array — start empty: [].

5. Verify GET http://localhost:3000/units returns the full array.
