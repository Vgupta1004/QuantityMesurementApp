document.addEventListener("DOMContentLoaded", async () => {

  // State object
  const state = {
    type:     "Length",
    action:   "Conversion",
    fromVal:  null,
    fromUnit: "",
    toVal:    null,
    toUnit:   "",
    operator: "+"
  };

  // Set first type-card active
  const typeSelector = document.getElementById("type-selector");
  const firstCard = typeSelector.querySelector(".type-card");
  if (firstCard) firstCard.classList.add("active");

  // Set first action-btn active
  const actionSelector = document.getElementById("action-selector");
  const firstAction = actionSelector.querySelector(".action-btn");
  if (firstAction) firstAction.classList.add("active");

});