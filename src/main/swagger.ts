import swaggerJSDoc from "swagger-jsdoc";
import { swaggerPaths } from "@interfaces/docs";

const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scraper Mailer API",
      version: "0.1.0",
      description: "REST API for automation, data scraping, and user management, including official journal and military information handling.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: swaggerPaths,
  },
  apis: ["./src/interfaces/http/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerConfig);
