function populateDropdown(selectEl, units) {
  if (!selectEl) {
    console.warn("populateDropdown: selectEl is null");
    return;
  }

  selectEl.innerHTML = "";

  const defaultOpt       = document.createElement("option");
  defaultOpt.value       = "";
  defaultOpt.textContent = "-- Select Unit --";
  defaultOpt.disabled    = true;
  defaultOpt.selected    = true;
  selectEl.appendChild(defaultOpt);

  units.forEach(u => {
    const opt       = document.createElement("option");
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
  parentEl.querySelectorAll(childSelector).forEach(el => {
    el.classList.remove("active");
  });
  clickedEl.classList.add("active");
}

function showResult(value, unitSymbol) {
  const resultValue = document.querySelector("#result-value");
  const resultUnit  = document.querySelector("#result-unit");
  resultValue.textContent = (value === null || value === undefined) ? "—" : value;
  resultUnit.textContent  = unitSymbol;
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
  list.innerHTML = "";

  if (!records || !records.length) {
    list.innerHTML = "<li>No history yet.</li>";
    return;
  }

  records.forEach(r => {
    const li       = document.createElement("li");
    li.textContent = `${r.expression} = ${r.result} (${new Date(r.timestamp).toLocaleString()})`;
    list.appendChild(li);
  });
}