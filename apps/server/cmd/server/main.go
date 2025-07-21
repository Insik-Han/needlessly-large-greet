package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"connectrpc.com/connect"
	connectcors "connectrpc.com/cors"
	"github.com/fatih/color"
	"github.com/rs/cors"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	greetv1 "apps/server/gen/greet/v1"
	"apps/server/gen/greet/v1/greetv1connect"
)

type GreetServer struct{}

func (s *GreetServer) Greet(
	ctx context.Context,
	req *connect.Request[greetv1.GreetRequest],
) (*connect.Response[greetv1.GreetResponse], error) {
	log.Println("Request headers: ", req.Header())
	res := connect.NewResponse(&greetv1.GreetResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.Msg.Name),
	})
	res.Header().Set("Greet-Version", "v1")
	return res, nil
}

func withCORS(h http.Handler) http.Handler {
	middleware := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:3001"},
		AllowedMethods: connectcors.AllowedMethods(),
		AllowedHeaders: connectcors.AllowedHeaders(),
		ExposedHeaders: connectcors.ExposedHeaders(),
	})
	return middleware.Handler(h)
}

func main() {
	greeter := &GreetServer{}
	mux := http.NewServeMux()

	path, handler := greetv1connect.NewGreetServiceHandler(greeter)
	mux.Handle(path, handler)

	port := "8080"
	addr := fmt.Sprintf("localhost:%s", port)

	green := color.New(color.FgGreen).SprintFunc()
	cyan := color.New(color.FgCyan).SprintFunc()
	white := color.New(color.FgWhite).SprintFunc()

	fmt.Printf("%s Go ConnectRPC Server is %s\n", green("✔"), green("READY"))
	fmt.Printf("   %s Listening on: %s\n", white("•"), cyan(fmt.Sprintf("http://%s", addr)))
	fmt.Println()

	log.Println("Starting server...")
	err := http.ListenAndServe(
		fmt.Sprintf(":%s", port),
		h2c.NewHandler(withCORS(mux), &http2.Server{}),
	)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
