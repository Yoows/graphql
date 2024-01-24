package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
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
	var port = envPortOr("3000")
	http.HandleFunc("/", IndexHandler)
	/*******************/
	http.Handle("/styles/", http.StripPrefix("/styles/", http.FileServer(http.Dir("./styles"))))
	http.Handle("/scripts/", http.StripPrefix("/scripts/", http.FileServer(http.Dir("./scripts/"))))
	http.Handle("/templates/", http.StripPrefix("/templates/", http.FileServer(http.Dir("./templates/"))))
	/*******************/
	/*******************/
	log.Println("")
	fmt.Println("\n\t\033[1;32m ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞")
	fmt.Print("\t| o Server started and listenning on port", port, "™®|\n")
	fmt.Print("\t|\t   http://localhost"+port, "\t\t|")
	fmt.Println("\n\t\033[1;32m ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞")
	log.Fatal(http.ListenAndServe(port, nil))
}

func envPortOr(port string) string {
	// If `PORT` variable in environment exists, return it
	if envPort := os.Getenv("PORT"); envPort != "" {
		return ":" + envPort
	}
	// Otherwise, return the value of `port` variable from function argument
	return ":" + port
}
