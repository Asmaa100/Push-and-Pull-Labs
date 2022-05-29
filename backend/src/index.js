import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log('[SERVER] Listening...');
});

app.use(express.json());
app.use(cors());

const messages = [];

app.get('/messages', (req, res) => {
    const messagesCount = req.query.count;
    res.json(messages.slice(messagesCount));
});

app.post('/messages', (req, res) => {
    const {body} = req;
    messages.push(body);
    res.sendStatus(204);
});

const subscribers = {};
app.get('/long-messages', (req, res) => {
    const ID = Math.ceil(Math.random()*1000);
    subscribers[ID] = res;
});

app.post('/long-messages', (req, res) => {
    const {body} = req;
    Object.entries(subscribers).forEach(([ID, response]) => {
        response.json(body);
        delete subscribers[ID];
    });
    res.sendStatus(204);
});


export default app;
