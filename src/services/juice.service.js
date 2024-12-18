const { Juice } = require("../models");

class JuiceService {
    async findAll() {
        return await Juice.findAll();
    }

    async count() {
        return await Juice.count();
    }

    async findById(id) {
        return await Juice.findByPk(id);
    }

    async create(juiceData) {
        return await Juice.create(juiceData);
    }

    async update(id, juiceData) {
        const juice = await Juice.findByPk(id);
        if (!juice) return null;
        return await juice.update(juiceData);
    }

    async delete(id) {
        const juice = await Juice.findByPk(id);
        if (!juice) return false;
        await juice.destroy();
        return true;
    }
}

module.exports = new JuiceService();
