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