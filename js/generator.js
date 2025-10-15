// Setup label generator

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#generator form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const url =
      "https://www.mesh-network.nl/twente/node/" + data.get("gen-node-id");
    const qr = qrcodegen.QrCode.encodeText(url, qrcodegen.QrCode.Ecc.MEDIUM);
    const svg = toSvgString(qr, 0, "#ffffff", "#000000");

    document.body.innerHTML = `
      <section class="labels">
        <section class='label'>
          <img src="/style/meshtastic.png"/>
          <h1>Mesh Network Twente</h1>

          <div class="columns">
            ${svg}
            <ul>
              <li><img src="/style/tech.png"/>${data.get("gen-tech")}</li>
              <li><img src="/style/battery.png"/>${data.get("gen-battery")}</li>
              <li><img src="/style/power.png"/>${data.get("gen-power")}</li>
            </ul>
          </div>

          <p class="url">${url}</p>
        </section>

        <section class='label narrow'>
          <img src="/style/meshtastic.png"/>
          <h1>Mesh Network Twente</h1>

          <div class="rows">
            <ul>
              <li><img src="/style/tech.png"/>${data.get("gen-tech")}</li>
              <li><img src="/style/battery.png"/>${data.get("gen-battery")}</li>
              <li><img src="/style/power.png"/>${data.get("gen-power")}</li>
            </ul>
            ${svg}
          </div>

          <p class="url">${url}</p>
        </section>
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
