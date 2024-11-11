<<<<<<<< HEAD:app.ts
import { Hono } from 'hono'
import { logger } from "hono/logger";

const app = new Hono()

app.use('*', logger())
app.get('/', (c) => c.text('Hono!'))

export default app
========
import app from "./app";

Bun.serve({
  fetch: app.fetch
});
>>>>>>>> a39638b (Update docker configuration to meet server specs):index.ts
