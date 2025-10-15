package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("."))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		_, err := os.Stat("." + r.URL.Path)
		if os.IsNotExist(err) {
			http.ServeFile(w, r, "./404.html")
			return
		}
		fs.ServeHTTP(w, r)
	})

	log.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
