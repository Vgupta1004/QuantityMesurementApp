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