import { app } from './app'
import { connection } from './connectDB'

const port = process.env.BACKEND_APP_PORT;

app.listen(port);

console.log(`Rodando em ${port}`)