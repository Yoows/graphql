package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
)

type ErrorPageResponse struct {
	Code int
	Text string
}

// Load HTML templates
var templates = template.Must(template.ParseGlob("./*.html"))

// RenderTemplate renders the specified template with the given data
func RenderTemplate(w http.ResponseWriter, tmpl string, i interface{}) {
	htmlFile := tmpl + ".html"
	err := templates.ExecuteTemplate(w, htmlFile, i)
	if err != nil {
		StatusInternalServerError(w, err)
	}
}
func StatusInternalServerError(w http.ResponseWriter, err interface{}) {
	ErrorPageResponse := ErrorPageResponse{
		Code: 500,
		Text: "Oops 🫢! Some posts took vacation!",
	}
	w.WriteHeader(http.StatusInternalServerError)
	log.Print(err.(error))
	RenderTemplate(w, "error", ErrorPageResponse)
}
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	RenderTemplate(w, "index", nil)
}

func main() {

	http.HandleFunc("/", IndexHandler)
	/*******************/
	http.Handle("/styles/", http.StripPrefix("/styles/", http.FileServer(http.Dir("./styles"))))
	http.Handle("/scripts/", http.StripPrefix("/scripts/", http.FileServer(http.Dir("./scripts/"))))
	http.Handle("/templates/", http.StripPrefix("/templates/", http.FileServer(http.Dir("./templates/"))))
	/*******************/
	/*******************/
	log.Println("")
	fmt.Println("\n\t\033[1;32m ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞")
	fmt.Print("\t| o Server started and listenning on port", ":8080", "™®|\n")
	fmt.Print("\t|\t   http://localhost"+":8080", "\t\t|")
	fmt.Println("\n\t\033[1;32m ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
