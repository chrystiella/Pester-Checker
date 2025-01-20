const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar").firstElementChild;
const strengthText = document.getElementById("strength-text");
const suggestions = document.getElementById("suggestions");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = analyzePassword(password);
  updateStrengthBar(strength.score);
  updateFeedback(strength);
});

function analyzePassword(password) {
  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) {
    score++;
  } else {
    feedback.push("Password should be at least 8 characters.");
  }

  // Uppercase letter check
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add an uppercase letter.");
  }

  // Lowercase letter check
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add a lowercase letter.");
  }

  // Number check
  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push("Include at least one number.");
  }

  // Special character check
  if (/[\W_]/.test(password)) {
    score++;
  } else {
    feedback.push("Add a special character (e.g., @, #, $, %).");
  }

  // Length > 12 for extra security
  if (password.length > 12) {
    score++;
  }

  return {
    score: score,
    feedback: feedback,
  };
}

function updateStrengthBar(score) {
  const colors = ["#ff4d4d", "#ff944d", "#ffd24d", "#94ff4d", "#4dff88", "#4dff4d"];
  const widthPercent = (score / 6) * 100;

  strengthBar.style.width = `${widthPercent}%`;
  strengthBar.style.backgroundColor = colors[score - 1] || colors[0];
}

function updateFeedback(strength) {
  const strengthLevels = ["Very Weak", "Weak", "Okay", "Good", "Strong", "Very Strong"];
  strengthText.textContent = strengthLevels[strength.score - 1] || "Very Weak";

  suggestions.innerHTML = ""; // Clear previous suggestions
  strength.feedback.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    suggestions.appendChild(listItem);
  });
}
