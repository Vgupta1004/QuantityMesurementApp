# QuantityMesurementApp

## Use Case 8: Compare Two Values
### Description
Normalise both to base unit, then compare

The Flow:-
 - function compareValues(v1, u1, v2, u2, base1, base2) { }
 - if (base1 > base2) return `${v1} ${u1} is GREATER than ${v2} ${u2}`
 - if (base1 < base2) return `${v1} ${u1} is LESS than ${v2} ${u2}`
 - return `${v1} ${u1} is EQUAL to ${v2} ${u2}`