import express from 'express';
import router from './route/routes.route';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const corOptions = {
	credentials: true,
	origin: true,
}
app.use(cors(corOptions))
app.use(bodyParser.json());
app.use('/api',router);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});