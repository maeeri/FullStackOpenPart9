import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get(`/bmi?:query`, (req, res) => {
    const obj = req.query;
    const height = Number(obj.height);
    const weight = Number(obj.weight);
    const bmiObj = calculateBmi(height, weight);
    res.send(bmiObj);
});

app.post('/exercises', (req, res) => {
    if (!req.body) {
        res.sendStatus(404);
    }
    // eslint-disable-next-line 
    const { daily_exercises, target }: any = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exObj = calculateExercises(daily_exercises, target);
    res.send(exObj);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
