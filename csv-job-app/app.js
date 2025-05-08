// app.js
require('dotenv').config()
const express = require('express');
const cors = require('cors'); 
const fileUploadRoutes = require('./routes/uploadRoutes');
const jobRoutes = require('./routes/jobRoutes');
const templateRoutes = require('./routes/templateRoutes');
const { createClient } = require('redis');
const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const { queue } = require('./jobs/queue');
const path = require('path');
const sequelize = require('./config/db');
require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { router: bullBoardRouter } = createBullBoard([
  new BullAdapter(queue)
]);

app.use('/admin/queues', bullBoardRouter);
app.use('/template', templateRoutes);
app.use('/upload', fileUploadRoutes);
app.use('/jobs', jobRoutes);

// sync db
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing DB:', err);
  });
