import express from 'express'

const envIsBuild = process.env.NODE_ENV === 'production'
const outDir = `dist`
const port = `4000`
async function startServer() {
  const app = express()
  if (envIsBuild) {
    app.use(express.static(`${outDir}/client`, { maxAge: 3600000 }))
  }

  app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`)
}

startServer()
