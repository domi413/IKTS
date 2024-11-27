//const el = document.querySelector("div.a-enter-vr.a-hidden.embedded");
window.addEventListener("load", function () {
    setTimeout(makevisible, 5000);
}, false);
function makevisible() {
  const el = document.querySelector("div.a-enter-vr.a-hidden.embedded");
  console.log(el.classList);
  if (el.classList) {
    el.classList.replace("a-hidden", "fullscreen");
    console.log(el.classList);
  }
}
