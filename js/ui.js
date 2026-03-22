function populateDropdown(selectEl, units) {
  if (!selectEl) {
    console.warn("populateDropdown: selectEl is null");
    return;
  }

  // Clear existing options
  selectEl.innerHTML = "";

  // Default disabled prompt
  const defaultOpt = document.createElement("option");
  defaultOpt.value    = "";
  defaultOpt.textContent = "-- Select Unit --";
  defaultOpt.disabled = true;
  defaultOpt.selected = true;
  selectEl.appendChild(defaultOpt);

  // One option per unit
  units.forEach(u => {
    const opt = document.createElement("option");
    opt.value       = u.symbol;
    opt.textContent = `${u.label} (${u.symbol})`;
    selectEl.appendChild(opt);
  });
}

function setActive(parentEl, clickedEl, childSelector) {
  if (!parentEl) {
    console.warn("setActive: parentEl is null");
    return;
  }

  // Remove active from all siblings
  parentEl.querySelectorAll(childSelector).forEach(el => {
    el.classList.remove("active");
  });

  // Add active to clicked
  clickedEl.classList.add("active");
}

function showResult(value, unitSymbol) {
  const resultValue = document.querySelector("#result-value");
  const resultUnit  = document.querySelector("#result-unit");

  // Write value — show "—" if null
  resultValue.textContent = (value === null || value === undefined) ? "—" : value;
  resultUnit.textContent  = unitSymbol;

  // Highlight animation
  const panel = document.getElementById("result-panel");
  panel.classList.add("highlight");
  setTimeout(() => panel.classList.remove("highlight"), 1500);
}

function toggleOperators(show) {
  const opRow = document.querySelector("#operator-selector");

  if (!opRow) {
    console.warn("toggleOperators: #operator-selector not found");
    return;
  }

  opRow.style.display = show ? "flex" : "none";
}

function renderHistory(records) {
  const list = document.querySelector("#history-list");

  // Clear current list
  list.innerHTML = "";

  // Guard — treat undefined as empty array
  if (!records || !records.length) {
    list.innerHTML = "<li>No history yet.</li>";
    return;
  }

  // One <li> per record
  records.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.expression} = ${r.result} (${new Date(r.timestamp).toLocaleString()})`;
    list.appendChild(li);
  });
}