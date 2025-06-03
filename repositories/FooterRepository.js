const Footer = require('../models/Footer');

class FooterRepository {
  static async getFooterById(id) {
    return await Footer.findByPk(id);
  }

  static async updateFooter(id, userData) {
    const footer = await Footer.findByPk(id);
    if (!footer) throw new Error('Footer not found');
    return await footer.update(userData);
  }

  static async deleteFooter(id) {
    const footer = await Footer.findByPk(id);
    if (!footer) throw new Error('Footer not found');
    return await footer.destroy();
  }
}

module.exports = FooterRepository;