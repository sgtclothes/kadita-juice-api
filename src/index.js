require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const juiceRoutes = require("./routes/juice.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./middleware/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/juices", juiceRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

async function startServer() {
    try {
        await sequelize.sync();
        console.log("Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
