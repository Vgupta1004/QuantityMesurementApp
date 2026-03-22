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

  // DOM elements
  const typeSelector   = document.getElementById("type-selector");
  const actionSelector = document.getElementById("action-selector");
  const fromInput      = document.getElementById("from-input");
  const toInput        = document.getElementById("to-input");
  const fromSelect     = document.getElementById("from-select");
  const toSelect       = document.getElementById("to-select");

  // Set first type-card active
  const firstCard = typeSelector.querySelector(".type-card");
  if (firstCard) firstCard.classList.add("active");

  // Set first action-button active
  const firstAction = actionSelector.querySelector(".action-btn");
  if (firstAction) firstAction.classList.add("active");

  // Hide operator row on load
  toggleOperators(false);

  // Load units for default type
  await loadUnits(state.type);

  // Load history
  await loadHistory();

  // UC-JS-15 — Type card click handlers
  typeSelector.querySelectorAll(".type-card").forEach(card => {
    card.addEventListener("click", async () => {

      // Update state
      state.type = card.dataset.type;

      // Highlight clicked card
      setActive(typeSelector, card, ".type-card");

      // Clear inputs and result
      fromInput.value = "";
      toInput.value   = "";
      showResult("—", "");

      // Reload units for new type
      try {
        const units = await getUnits(state.type);
        populateDropdown(fromSelect, units);
        populateDropdown(toSelect, units);
        state.fromUnit = "";
        state.toUnit   = "";
      } catch (err) {
        console.error("getUnits failed:", err);
        showResult("Server unavailable", "");
      }

    });
  });

  // UC-JS-16 — Action tab click handlers
  actionSelector.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      // Update state
      state.action = btn.dataset.action;

      // Highlight clicked button
      setActive(actionSelector, btn, ".action-btn");

      // Show operator row only in Arithmetic mode
      toggleOperators(state.action === "Arithmetic");

      // Reset result
      showResult("—", "");

    });
  });


  // ── helpers ──

  async function loadUnits(type) {
    try {
      const units = await getUnits(type);
      populateDropdown(fromSelect, units);
      populateDropdown(toSelect, units);
      state.fromUnit = "";
      state.toUnit   = "";
    } catch (err) {
      console.error("loadUnits failed:", err);
      showResult("Server unavailable", "");
    }
  }

  async function loadHistory() {
    try {
      const records = await getHistory();
      renderHistory(records);
    } catch (err) {
      console.error("loadHistory failed:", err);
      renderHistory([]);
    }
  }

});