import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(fileURLToPath(new URL("../review-portal/export/", import.meta.url)))
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
}

createServer(async (request, response) => {
  const requested = decodeURIComponent((request.url ?? "/").split("?")[0])
  const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "")
  const file = resolve(root, relative)
  if (!file.startsWith(`${root}${sep}`)) {
    response.writeHead(403)
    response.end("Forbidden")
    return
  }
  try {
    const body = await readFile(file)
    response.writeHead(200, { "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream" })
    response.end(body)
  } catch {
    response.writeHead(404)
    response.end("Not found")
  }
}).listen(4173, "127.0.0.1", () => {
  console.log("E003 review portal: http://127.0.0.1:4173/")
})
