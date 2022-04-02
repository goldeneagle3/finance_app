export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "__API_TITLE__",
      version: "1.0.0",
      description: "__API_DESCRIPTION__",
    },
    servers: [
      {
        // Adding a Environment Value
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};