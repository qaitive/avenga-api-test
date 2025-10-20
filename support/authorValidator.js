import { expect } from 'chai';
import logger from './logger.js';

class AuthorValidator {
  validateAuthorResponse(author) {
    try {
      expect(author, 'Author must have an id').to.have.property('id').that.satisfies(val => typeof val === 'number');
      logger.debug(`validating author ${author.id}`);
      expect(author, 'Author must have an idBook').to.have.property('idBook').that.satisfies(val => typeof val === 'number');
      expect(author, 'Author must have a firstName').to.have.property('firstName').that.satisfies(val => typeof val === 'string' || val === null);
      expect(author, 'Author must have a lastName').to.have.property('lastName').that.satisfies(val => typeof val === 'string' || val === null);
      return true;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }
  
  validateGetAuthorsResponse(response) {
    try {
      logger.debug('validating get authors response');
      expect(response, 'Response status must be 200').to.have.property('status').that.equals(200);
      const content = response.data;
      expect(content, 'Response data must be an array').to.be.an('array');
      for (const author of content) {
        expect(this.validateAuthorResponse(author), `Author ${author.id} is invalid`).to.be.true;
      }
      return true;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

}

export default new AuthorValidator;