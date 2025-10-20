import { expect } from 'chai';
import logger from './logger.js';

class BookValidator {
 validateBookResponse(book) {
    try {
      expect(book, 'Book must have an id').to.have.property('id').that.is.a('number');
      logger.debug(`validating book ${book.id}`);
      expect(book, 'Book must have a title').to.have.property('title').that.satisfies(val => typeof val === 'string' || val === null);
      expect(book, 'Book must have a description').to.have.property('description').that.satisfies(val => typeof val === 'string' || val === null);
      expect(book, 'Book must have a pageCount').to.have.property('pageCount').that.is.a('number');
      expect(book, 'Book must have an excerpt').to.have.property('excerpt').that.satisfies(val => typeof val === 'string' || val === null);
      expect(book, 'Book must have a publishDate').to.have.property('publishDate');
      const isoDate = book.publishDate.replace('Z', '+00:00');
      expect(Date.parse(isoDate), `Invalid ISO datetime format: ${book.publishDate}`).to.be.a('number').and.to.not.be.NaN;
      return true;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

  validateGetBooksResponse(response) {
    try {
      expect(response, 'Response status must be 200').to.have.property('status').that.equals(200);
      const allBooks = response.data;
      expect(allBooks.length).to.equal(200);
      expect(allBooks, 'Response data must be an array').to.be.an('array');
      for (const book of allBooks) {
        expect(this. validateBookResponse(book), `Book ${book.id} is invalid`).to.be.true;
      }
      return true;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

}

export default new BookValidator;