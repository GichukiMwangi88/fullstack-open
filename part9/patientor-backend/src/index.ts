import express from 'express';

import diagnosesRouter from './routes/diagnosesRoutes';
import patientRouter from './routes/patientsRoute';

const app = express();
app.use(express.json());

import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Ping ping');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
