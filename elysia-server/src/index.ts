import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { tlsConfig } from "./config/tls.config";
import { exampleController } from "./controllers/example.controller";
import cors from "@elysiajs/cors";


const app = new Elysia()
  .use(cors())
  .use(exampleController)
  .use(staticPlugin({
    assets: 'public/client',
    prefix: ''
  }))
  .get("/", () => "Hello Elysia")
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  });

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(
  `🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`
);
