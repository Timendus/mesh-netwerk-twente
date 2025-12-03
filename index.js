document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-deeplink]").forEach((elm) => {
    const link = document.createElement("a");
    link.href = "#" + elm.id;
    link.textContent = "#";
    elm.insertAdjacentElement("afterbegin", link);
  });
});
