document.addEventListener("DOMContentLoaded", () => {
  const sizeInput = document.getElementById("size");
  const thresholdInput = document.getElementById("threshold");

  const sizeValue = document.getElementById("sizeValue");
  const thresholdValue = document.getElementById("thresholdValue");

  const saveBtn = document.getElementById("saveBtn");

  console.log("Popup loaded");

  // Load saved settings
  chrome.storage.sync.get(["size", "threshold"], (res) => {
    const size = res.size ?? 400;
    const threshold = res.threshold ?? 15;

    sizeInput.value = size;
    thresholdInput.value = threshold;

    sizeValue.textContent = size;
    thresholdValue.textContent = threshold;
  });

  // Just update UI (NO saving yet)
  sizeInput.addEventListener("input", () => {
    sizeValue.textContent = sizeInput.value;
  });

  thresholdInput.addEventListener("input", () => {
    thresholdValue.textContent = thresholdInput.value;
  });

  // SAVE BUTTON
  saveBtn.addEventListener("click", () => {
    chrome.storage.sync.set({
      size: Number(sizeInput.value),
      threshold: Number(thresholdInput.value)
    });

    saveBtn.textContent = "Saved!";
    setTimeout(() => {
      saveBtn.textContent = "Save Settings";
    }, 1000);
  });
});