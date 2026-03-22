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