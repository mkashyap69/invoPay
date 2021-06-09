const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const cluster = require('cluster');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authrouter');
const clientRouter = require('./routers/clientrouter');
const invoiceRouter = require('./routers/invoicerouter');
const payRouter = require('./routers/payRouter');
const errorController = require('./controller/errorController');

require('dotenv').config();

const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  paths: '*',
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: true,
  preflightContinue: false,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(mongoSanitize());

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

if (cluster.isMaster) {
  // sendInvoiceMail(
  //   'MAN Pvt Ltd.',
  //   'Sourav',
  //   'mk168804@gmail.com',
  //   '12393nnw434',
  //   '12/05/2021',
  //   500,
  //   [
  //     { item: 'Maida', rate: 20 },
  //     { item: 'Maggi', rate: 90 },
  //     { item: 'Cologne', rate: 250 },
  //   ],
  //   'https://www.google.com',
  //   'https://www.google.com'
  // );

  const numCpus = require('os').cpus().length;

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    console.log('Cluster Died');
    cluster.fork();
  });
} else {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/client', clientRouter);
  app.use('/api/v1/invoice', invoiceRouter);
  app.use('/api/v1/payment', payRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });

  app.use(errorController);

  const port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log('Server Started');
  });
}
