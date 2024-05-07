import { Hono } from 'hono';
import { userRoute } from './routes/userRoute';
import { blogRoute } from './routes/blogRoute';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

app.use('/*', cors());
app.route('/api/user', userRoute);
app.route('/api/blog', blogRoute);

export default app