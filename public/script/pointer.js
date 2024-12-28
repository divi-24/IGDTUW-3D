let pointer = document.getElementById("mousepointer");

document.body.addEventListener("mousemove", (e) => {
  if (screen.width > 900) {
    pointer.style.left = String(e.clientX - 20) + "px";
    pointer.style.top = String(e.clientY - 20) + "px";
  }
});

document.body.addEventListener("mouseleave", () => {
  if (screen.width > 900) {
    pointer.style.display = "none";
  }
});
document.body.addEventListener("mouseenter", () => {
  if (screen.width > 900) {
    pointer.style.display = "flex";
  }
});