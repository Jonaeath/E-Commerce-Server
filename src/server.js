const { serverPort } = require('./secret')
const app = require('./app')
const connectDB = require('./Config/db')


app.listen(serverPort, async()=>{
    console.log(`My Server is running at http://localhost:${serverPort}`)

    await connectDB()
})