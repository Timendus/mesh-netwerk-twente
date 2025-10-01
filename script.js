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

  if (parts.length > 0 && parts[0] == "generator") {
    document.getElementById("generator").classList.add("selected");
    return;
  }

  // Fall back to root
  document.getElementById("root").classList.add("selected");
});

// Setup label generator

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#generator form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const url =
      "http://www.mesh-network.nl/twente/node/" + data.get("gen-node-id");
    const qr = qrcodegen.QrCode.encodeText(url, qrcodegen.QrCode.Ecc.MEDIUM);
    const svg = toSvgString(qr, 0, "#ffffff", "#000000");

    document.body.innerHTML = `
      <section class='label'>
        <img src="meshtastic.png"/>
        <h1>Mesh Network Twente</h1>

        <div class="columns">
          ${svg}
          <div>
            <p class="tech">${data.get("gen-tech")}</p>
            <p class="battery">${data.get("gen-battery")}</p>
            <p class="power">${data.get("gen-power")}</p>
          </div>
        </div>

        <p class="url">${url}</p>
      </section>
    `;

    window.setTimeout(() => {
      window.print();
    }, 1000);

    return false;
  });
});

// Returns a string of SVG code for an image depicting the given QR Code, with the given number
// of border modules. The string always uses Unix newlines (\n), regardless of the platform.
function toSvgString(qr, border, lightColor, darkColor) {
  if (border < 0) throw new RangeError("Border must be non-negative");
  let parts = [];
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.getModule(x, y))
        parts.push(`M${x + border},${y + border}h1v1h-1z`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${
    qr.size + border * 2
  } ${qr.size + border * 2}" stroke="none">
	<rect width="100%" height="100%" fill="${lightColor}"/>
	<path d="${parts.join(" ")}" fill="${darkColor}"/>
</svg>
`;
}
