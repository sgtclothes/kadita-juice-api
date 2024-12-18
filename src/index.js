require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const juiceRoutes = require('./routes/juice.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/error-handler');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/juices', juiceRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database connected successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();