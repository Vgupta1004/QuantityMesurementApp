# QuantityMesurementApp

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