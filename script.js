// Do a bit of poor-man's-routing here for Github pages

document.addEventListener("DOMContentLoaded", () => {
  const parts = window.location.pathname.substring(1).split("/");

  if (parts.length > 0 && parts[0] == "twente") {
    if (parts.length > 2 && parts[1] == "node") {
      // Future work: log somewhere that someone showed an interest in this particular node
      console.log("Node:", parts[2]);
      // But for now: set it as a hidden input on the form for when people contact us
      document.getElementById("node-id").value = parts[2];
    }

    if (parts.length > 1 && parts[1] == "verzonden") {
      document.getElementById("verzonden").classList.add("selected");
      return;
    }

    document.getElementById("twente").classList.add("selected");
    return;
  }

  // Fall back to root
  document.getElementById("root").classList.add("selected");
});
