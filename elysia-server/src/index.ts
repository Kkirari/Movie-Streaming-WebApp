import staticPlugin from "@elysiajs/static"
import { Elysia } from "elysia"
import { tlsConfig } from "./config/tls.config"
import { AccountController } from "./controllers/account.controller"
import { MovieController } from "./controllers/movie.controller"
import cors from "@elysiajs/cors"
import { MongoDB } from "./config/database.config"
import { TagsController } from "./controllers/tag.controller"

MongoDB.connect()

const app = new Elysia()
  .use(cors())
  .use(AccountController)
  .use(MovieController)
  .use(TagsController)
  .use(staticPlugin({
    assets: "public/client",
    prefix: "",
  }))
  .get("/", () => "Hello Elysia")
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig,
  })

let protocol = "http"
if ("cert" in tlsConfig) protocol = "https"

console.log(
  `🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`
)
