const FooterRepository = require("../repositories/FooterRepository");

class FooterController {
  static async getFooterById(req, res) {
    try {
      const footer = await FooterRepository.getFooterById(req.params.id);
      res.json(footer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateFooter(req, res) {
    try {
      const footer = await FooterRepository.updateFooter(req.params.id, req.body);
      res.json(footer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = FooterController;