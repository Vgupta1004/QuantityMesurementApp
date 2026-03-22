# QuantityMesurementApp

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