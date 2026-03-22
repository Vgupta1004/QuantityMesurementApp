function applyConversion(value, convObj) {
  if (isNaN(value)) throw new Error("Invalid number");

  // Same unit — return as is
  if (convObj.factor === 1 && convObj.formula === null) {
    return parseFloat(value.toFixed(6));
  }

  // Factor based
  if (convObj.factor !== null) {
    return parseFloat((value * convObj.factor).toFixed(6));
  }

  // Formula based (Temperature)
  try {
    const expr = convObj.formula.replace("x", value);
    return parseFloat(eval(expr).toFixed(6));
  } catch (err) {
    throw new Error("Bad formula");
  }
}

function compareValues(v1, u1, v2, u2, base1, base2) {
  if (isNaN(v1) || isNaN(v2)) return "Invalid values — cannot compare";

  if (base1 > base2) return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
  if (base1 < base2) return `${v1} ${u1} is LESS than ${v2} ${u2}`;
  return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}

function performArithmetic(v1, v2normalised, op) {
  switch (op) {
    case "+":
      return parseFloat((v1 + v2normalised).toFixed(6));
    case "-":
      return parseFloat((v1 - v2normalised).toFixed(6));
    case "*":
      return parseFloat((v1 * v2normalised).toFixed(6));
    case "/":
      if (v2normalised === 0) throw new Error("Divide by zero");
      return parseFloat((v1 / v2normalised).toFixed(6));
    default:
      throw new Error("Unknown operator");
  }
}