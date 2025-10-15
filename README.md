# mesh-network.nl

This repository contains the website [mesh-network.nl](http://mesh-network.nl/).
It is mainly intended as a place to point people to for explainers about
Meshtastic. People who find rogue nodes, people who are new on the mesh, et
cetera.

## Technology

The website only consists of some statically hosted pages. No build steps, just
styled HTML pages with a bit of JavaScript sprinkled in where needed. It is
hosted on Github Pages, which just serves the root of this repository and that's
that. The form that is on the website currently makes use of the free tier of
FormSpark.

The only slightly more interesting thing about this website is the use of a
[custom 404 page](./404.html) that does some URL mangling. This allows us to use
pretty-looking "dynamic" URLs like `www.mesh-network.nl/twente/node/1a2b3c`.
JavaScript on the 404 page redirects the user slightly to
`www.mesh-network.nl/twente/#node/1a2b3c` (note the hash), so that the [twente
index page](./twente/index.html) can update its form accordingly.

## Local development

I use a little [development server written in Go](./dev-server.go). To run it,
make sure you have Go and `make` installed and just run `make` in the checked
out repository directory.
