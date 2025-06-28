import express from "express";
import { validateHeaders } from "./middlewares/validateHeaders";
import tokenRoutes from './routes/token.routes';

const app = express();
app.use(express.json());
app.use(validateHeaders);
app.use(tokenRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;