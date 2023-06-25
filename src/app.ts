import e from 'express'
import router from './routes'

const app = e()

app.use(e.urlencoded({ extended: true }))
app.use(router)


export default app
