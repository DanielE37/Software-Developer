document.getElementById("calcBtn").addEventListener("click", calculateTip);
const themeToggle = document.getElementById("themeSwitcher");
const themeLabel = document.getElementById("themeLabel");

// Handle Tip Calculation
function calculateTip() {
  const bill = parseFloat(document.getElementById("billAmount").value);
  const tips = document.getElementsByName("tip");
  let tipPercent = 0;

  for (let tip of tips) {
    if (tip.checked) {
      if (tip.value === "custom") {
        const customVal = parseFloat(document.getElementById("CustomTip").value);
        if (!isNaN(customVal)) {
          tipPercent = customVal;
        } else {
          showResult("Please enter a valid custom tip.");
          return;
        }
      } else {
        tipPercent = parseFloat(tip.value);
      }
      break;
    }
  }

  if (isNaN(bill) || bill <= 0) {
    showResult("Please enter a valid bill amount.");
    return;
  }

  if (tipPercent <= 0) {
    showResult("Please select a tip percentage.");
    return;
  }

  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount;

  showResult(`💷 Tip: £${tipAmount.toFixed(2)}<br>💰 Total: £${total.toFixed(2)}`);
}

function showResult(message) {
  document.getElementById("result").innerHTML = message;
}

// Handle Theme Toggle
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.checked = theme === "dark";
  themeLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}

// Initial theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  setTheme(newTheme);
});
