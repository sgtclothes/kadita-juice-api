const juiceService = require("../services/juice.service");
const { Juice } = require("../models");
const ResponseUtil = require("../utils/response.util");

class AdminController {

    async getDashboardData(req, res) {
        try {
            const [juiceCount, categoryCount] = await Promise.all([
                juiceService.count(),
                Juice.sequelize.query("SELECT COUNT(DISTINCT category) AS count FROM Juices"),
            ]);

            const result = {
                juiceCount,
                categoryCount: categoryCount[0][0].count,
            };

            return ResponseUtil.success(res, result, "Dashboard data retrieved successfully");
        } catch (error) {
            console.log(error.message);
            return ResponseUtil.error(res, "Error retrieving dashboard data");
        }
    }
}

module.exports = new AdminController();
