const juiceService = require('../services/juice.service');
const { juiceSchema } = require('../validators/juice.validator');
const ResponseUtil = require('../utils/response.util');

class JuiceController {
  async getAllJuices(req, res) {
    try {
      const juices = await juiceService.findAll();
      return ResponseUtil.success(res, juices, 'Juices retrieved successfully');
    } catch (error) {
      return ResponseUtil.error(res, 'Error fetching juices');
    }
  }

  async getJuiceById(req, res) {
    try {
      const juice = await juiceService.findById(req.params.id);
      if (!juice) {
        return ResponseUtil.error(res, 'Juice not found', 404);
      }
      return ResponseUtil.success(res, juice, 'Juice retrieved successfully');
    } catch (error) {
      return ResponseUtil.error(res, 'Error fetching juice');
    }
  }

  async createJuice(req, res) {
    try {
      const { error } = juiceSchema.validate(req.body);
      if (error) {
        return ResponseUtil.error(res, 'Validation error', 400, error.details);
      }

      if (!req.file) {
        return ResponseUtil.error(res, 'Image is required', 400);
      }

      const juiceData = {
        ...req.body,
        image: req.file.path
      };

      const newJuice = await juiceService.create(juiceData);
      return ResponseUtil.success(res, newJuice, 'Juice created successfully', 201);
    } catch (error) {
      return ResponseUtil.error(res, 'Error creating juice');
    }
  }

  async updateJuice(req, res) {
    try {
      const { error } = juiceSchema.validate(req.body);
      if (error) {
        return ResponseUtil.error(res, 'Validation error', 400, error.details);
      }

      const juiceData = {
        ...req.body,
        ...(req.file && { image: req.file.path })
      };

      const updatedJuice = await juiceService.update(req.params.id, juiceData);
      if (!updatedJuice) {
        return ResponseUtil.error(res, 'Juice not found', 404);
      }
      return ResponseUtil.success(res, updatedJuice, 'Juice updated successfully');
    } catch (error) {
      return ResponseUtil.error(res, 'Error updating juice');
    }
  }

  async deleteJuice(req, res) {
    try {
      const deleted = await juiceService.delete(req.params.id);
      if (!deleted) {
        return ResponseUtil.error(res, 'Juice not found', 404);
      }
      return ResponseUtil.success(res, null, 'Juice deleted successfully', 204);
    } catch (error) {
      return ResponseUtil.error(res, 'Error deleting juice');
    }
  }
}

module.exports = new JuiceController();