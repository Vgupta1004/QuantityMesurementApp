document.addEventListener("DOMContentLoaded", async () => {

  const state = {
    type:     "Length",
    action:   "Conversion",
    fromVal:  1,
    fromUnit: "km",
    toVal:    null,
    toUnit:   "m",
    operator: "+"
  };

  const DEFAULTS = {
    Length: {
      Conversion: { fromVal: 1,   fromUnit: "km", toVal: null, toUnit: "m"  },
      Comparison: { fromVal: 1,   fromUnit: "km", toVal: 1000, toUnit: "m"  },
      Arithmetic: { fromVal: 10,  fromUnit: "m",  toVal: 5,    toUnit: "m"  }
    },
    Weight: {
      Conversion: { fromVal: 1,   fromUnit: "kg", toVal: null, toUnit: "g"  },
      Comparison: { fromVal: 1,   fromUnit: "kg", toVal: 500,  toUnit: "g"  },
      Arithmetic: { fromVal: 10,  fromUnit: "kg", toVal: 5,    toUnit: "kg" }
    },
    Temperature: {
      Conversion: { fromVal: 100, fromUnit: "C",  toVal: null, toUnit: "F"  },
      Comparison: { fromVal: 100, fromUnit: "C",  toVal: 212,  toUnit: "F"  },
      Arithmetic: { fromVal: 100, fromUnit: "C",  toVal: 50,   toUnit: "C"  }
    },
    Volume: {
      Conversion: { fromVal: 1,   fromUnit: "L",  toVal: null, toUnit: "mL" },
      Comparison: { fromVal: 1,   fromUnit: "L",  toVal: 500,  toUnit: "mL" },
      Arithmetic: { fromVal: 2,   fromUnit: "L",  toVal: 500,  toUnit: "mL" }
    }
  };

  const typeSelector = document.getElementById("type-selector");
  const actionSelector = document.getElementById("action-selector");
  const fromInput  = document.getElementById("from-input");
  const toInput    = document.getElementById("to-input");
  const fromSelect = document.getElementById("from-select");
  const toSelect   = document.getElementById("to-select");
  const toStepper  = document.getElementById("to-stepper");
  const swapBtn    = document.getElementById("swap-btn");
  const vsBadge    = document.getElementById("vs-badge");
  const fromLabel  = document.getElementById("from-label");
  const toLabel    = document.getElementById("to-label");
  const opBar      = document.querySelector(".op-bar");

  // ── Init active states ──
  typeSelector.querySelector(".type-card").classList.add("active");
  actionSelector.querySelectorAll(".action-btn").forEach(b => {
    if (b.dataset.action === "Conversion") b.classList.add("active");
  });
  if (opBar) opBar.querySelector(".op-btn")?.classList.add("active");

  // ── Conversion UI on load ──
  setModeUI("Conversion");
  toggleOperators(false);

  // ── Load initial data ──
  const initUnits = await getUnits("Length");
  populateDropdown(fromSelect, initUnits);
  populateDropdown(toSelect, initUnits);
  writeDefaults("Length", "Conversion"); // write values directly, no events
  await calculate(false);
  await loadHistory();

  // ── Now attach all listeners AFTER initial setup is complete ──
  attachListeners();


  function attachListeners() {

  // Type cards (Length, Weight, etc.)
  typeSelector.querySelectorAll(".type-card").forEach(card => {
    card.addEventListener("click", async (e) => {
      e.preventDefault();
      if (card.dataset.type === state.type) return;
      
      state.type = card.dataset.type;
      setActive(typeSelector, card, ".type-card");
      
      try {
        const units = await getUnits(state.type);
        populateDropdown(fromSelect, units);
        populateDropdown(toSelect, units);

        applyModePresets(state.type, state.action, units);
        await calculate(false);
      } catch (err) {
        showResult("Server unavailable", "");
      }
    });
  });

  // Action tabs (Conversion, Comparison, Arithmetic)
  actionSelector.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (btn.dataset.action === state.action) return;
      
      state.action = btn.dataset.action;
      setActive(actionSelector, btn, ".action-btn");
      toggleOperators(state.action === "Arithmetic");
      setModeUI(state.action);

      const units = Array.from(fromSelect.options)
        .filter(opt => opt.value !== "")
        .map(opt => ({ symbol: opt.value }));
      
      applyModePresets(state.type, state.action, units);
      calculate(false);
    });
  });

  // Operator buttons (+, -, *, /)
  if (opBar) {
    opBar.querySelectorAll(".op-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        state.operator = btn.dataset.op;
        setActive(opBar, btn, ".op-btn");
        calculate(true);
      });
    });
  }

  // Input Listeners
  fromInput.addEventListener("input", () => {
    state.fromVal = parseFloat(fromInput.value);
    calculate(true);
  });

  toInput.addEventListener("input", () => {
    state.toVal = parseFloat(toInput.value);
    calculate(true);
  });

  fromSelect.addEventListener("change", () => {
    state.fromUnit = fromSelect.value;
    calculate(true);
  });

  toSelect.addEventListener("change", () => {
    state.toUnit = toSelect.value;
    calculate(true);
  });

  // Steppers - PREVENT DEFAULT IS KEY HERE
  document.getElementById("from-up").addEventListener("click", (e) => {
    e.preventDefault();
    fromInput.value = (parseFloat(fromInput.value) || 0) + 1;
    state.fromVal = parseFloat(fromInput.value);
    calculate(true);
  });

  document.getElementById("from-down").addEventListener("click", (e) => {
    e.preventDefault();
    fromInput.value = (parseFloat(fromInput.value) || 0) - 1;
    state.fromVal = parseFloat(fromInput.value);
    calculate(true);
  });

  document.getElementById("to-up").addEventListener("click", (e) => {
    e.preventDefault();
    toInput.value = (parseFloat(toInput.value) || 0) + 1;
    state.toVal = parseFloat(toInput.value);
    calculate(true);
  });

  document.getElementById("to-down").addEventListener("click", (e) => {
    e.preventDefault();
    toInput.value = (parseFloat(toInput.value) || 0) - 1;
    state.toVal = parseFloat(toInput.value);
    calculate(true);
  });

  // Swap Button - PREVENT DEFAULT IS KEY HERE
  swapBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const tmpUnit = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tmpUnit;
    
    state.fromUnit = fromSelect.value;
    state.toUnit = toSelect.value;
    
    const tmpVal = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = tmpVal;
    
    state.fromVal = parseFloat(fromInput.value);
    state.toVal = parseFloat(toInput.value);
    calculate(true);
  });
}

  function applyModePresets(type, action, units) {
    const defaults = DEFAULTS[type]?.[action];
    if (!defaults) return;

    const normalizeNumber = val => {
      if (val === null || val === undefined || val === "") return null;
      const parsed = parseFloat(val);
      return Number.isFinite(parsed) ? parsed : null;
    };

    // Preserve user-entered fromVal with priority, otherwise existing state, else default
    const manualFrom = normalizeNumber(fromInput.value);
    state.fromVal = manualFrom !== null ? manualFrom : (!isNaN(state.fromVal) ? state.fromVal : defaults.fromVal);
    fromInput.value = state.fromVal;

    // Preserve user-entered toVal in Comparison/Arithmetic; Conversion auto-manages toVal
    if (action === "Conversion") {
      state.toVal = null;
      toInput.value = "";
    } else {
      const manualTo = normalizeNumber(toInput.value);
      state.toVal = manualTo !== null ? manualTo : (!isNaN(state.toVal) ? state.toVal : defaults.toVal);
      toInput.value = state.toVal;
    }

    // Keep unit selections if valid, else default
    const hasUnit = (symbol) => units.some(u => u.symbol === symbol);
    state.fromUnit = hasUnit(state.fromUnit) ? state.fromUnit : defaults.fromUnit;
    state.toUnit   = hasUnit(state.toUnit)   ? state.toUnit   : defaults.toUnit;

    fromSelect.value = state.fromUnit;
    toSelect.value   = state.toUnit;
  }


  // ── Write defaults directly into state + DOM (no events fired) ──
  function writeDefaults(type, action) {
    const d = DEFAULTS[type]?.[action];
    if (!d) return;

    // Write state
    state.fromVal  = d.fromVal;
    state.fromUnit = d.fromUnit;
    state.toUnit   = d.toUnit;
    state.toVal    = (d.toVal !== null && d.toVal !== undefined) ? d.toVal : null;

    // Write DOM directly (no .value assignment that triggers events —
    // listeners are already attached but these are programmatic writes,
    // 'input' event only fires on user interaction, 'change' fires on selects)
    fromInput.value  = d.fromVal;
    fromSelect.value = d.fromUnit;
    toSelect.value   = d.toUnit;
    toInput.value    = (state.toVal !== null) ? state.toVal : "";
  }


  // ── Set UI for mode ──
  function setModeUI(action) {
    if (action === "Conversion") {
      fromLabel.textContent   = "From";
      toLabel.textContent     = "To";
      toInput.readOnly        = true;
      toStepper.style.display = "none";
      swapBtn.style.display   = "grid";
      vsBadge.style.display   = "none";
    } else {
      fromLabel.textContent   = "Value A";
      toLabel.textContent     = "Value B";
      toInput.readOnly        = false;
      toStepper.style.display = "flex";
      swapBtn.style.display   = "none";
      vsBadge.style.display   = "grid";
    }
  }


  // ── Calculate ──
  async function calculate(saveToHistory) {
    if (!state.fromUnit || !state.toUnit)               return;
    if (state.fromVal === null || isNaN(state.fromVal)) return;
    if (state.action !== "Conversion") {
      if (state.toVal === null || isNaN(state.toVal))   return;
    }

    try {

      if (state.action === "Conversion") {
        if (state.fromUnit === state.toUnit) {
          toInput.value = state.fromVal;
          showResult(state.fromVal, state.toUnit);
          return;
        }
        const conv = await getConversion(state.fromUnit, state.toUnit);
        const res  = applyConversion(state.fromVal, conv);
        toInput.value = res;
        showResult(res, state.toUnit);
        if (saveToHistory) {
          await saveHistory({
            type: state.type, action: state.action,
            expression: `${state.fromVal} ${state.fromUnit} → ${state.toUnit}`,
            result: `${res} ${state.toUnit}`,
            timestamp: new Date().toISOString()
          });
          renderHistory(await getHistory());
        }

      } else if (state.action === "Comparison") {
        let base1 = state.fromVal;
        let base2 = state.toVal;
        if (state.fromUnit !== state.toUnit) {
          const conv = await getConversion(state.toUnit, state.fromUnit);
          base2 = applyConversion(state.toVal, conv);
        }
        const sentence = compareValues(
          state.fromVal, state.fromUnit,
          state.toVal,   state.toUnit,
          base1, base2
        );
        showResult(sentence, "");
        if (saveToHistory) {
          await saveHistory({
            type: state.type, action: state.action,
            expression: `${state.fromVal} ${state.fromUnit} vs ${state.toVal} ${state.toUnit}`,
            result: sentence,
            timestamp: new Date().toISOString()
          });
          renderHistory(await getHistory());
        }

      } else if (state.action === "Arithmetic") {
        let v2 = state.toVal;
        if (state.fromUnit !== state.toUnit) {
          const conv = await getConversion(state.toUnit, state.fromUnit);
          v2 = applyConversion(state.toVal, conv);
        }
        const res = performArithmetic(state.fromVal, v2, state.operator);
        showResult(res, state.fromUnit);
        if (saveToHistory) {
          await saveHistory({
            type: state.type, action: state.action,
            expression: `${state.fromVal} ${state.fromUnit} ${state.operator} ${state.toVal} ${state.toUnit}`,
            result: `${res} ${state.fromUnit}`,
            timestamp: new Date().toISOString()
          });
          renderHistory(await getHistory());
        }
      }

    } catch (err) {
      console.error("calculate() error:", err);
      showResult("Error: " + err.message, "");
    }
  }


  // ── Load history ──
  async function loadHistory() {
    try {
      renderHistory(await getHistory());
    } catch (err) {
      renderHistory([]);
    }
  }

});