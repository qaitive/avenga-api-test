import { expect } from "chai";
import ApiService from "../support/apiService.js";
import AuthorValidator from "../support/authorValidator.js";
import logger from "../support/logger.js";
import {
  testAuthor,
  updatedAuthor,
  validAuthor,
  nonExistingData,
  authorMissingFields,
  authorInvalidData,
  authorEdgeCase,
  fakerAuthor,
  fakerBook,
} from "../testdata/testData.js";

describe("Author API Tests", () => {
  // Get Tests
  describe("Get Authors", () => {
    it("should get all authors", async () => {
      try {
        const response = await ApiService.getAllAuthors();
        expect(AuthorValidator.validateGetAuthorsResponse(response)).to.be.true;
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error: " + err.message);
      }
    });

    it("should get author by id and verify response", async () => {
      try {
        const response = await ApiService.getAuthorById(validAuthor.id);
        expect(response.status).to.equal(200);
        const authorActual = response.data;
        expect(AuthorValidator.validateAuthorResponse(authorActual)).to.be.true;
        expect(authorActual).to.deep.include({
          id: validAuthor.id,
          idBook: validAuthor.idBook,
          firstName: validAuthor.firstName,
          lastName: validAuthor.lastName,
        });
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error: " + err.message);
      }
    });

    it("should get authors by book id", async () => {
      try {
        const bookId = fakerBook.id;
        const response = await ApiService.getAuthorsByBookId(bookId);
        expect(AuthorValidator.validateGetAuthorsResponse(response)).to.be.true;
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });

    it("should return 404 for invalid author id", async () => {
      try {
        await ApiService.getAuthorById(nonExistingData.id);
        expect.fail("Expected 404 error");
      } catch (err) {
        expect(err.response.status).to.equal(404);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Create Tests
  describe("Create Authors", () => {
    it("should create new author", async () => {
      try {
        const response = await ApiService.createAuthor(fakerAuthor);
        expect(response.status).to.equal(200);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });

    it("should create author using fakerAuthor Id and verify Author", async () => {
      try {
        // Create the author to ensure it exists
        const response = await ApiService.createAuthor(fakerAuthor);
        expect(response.status).to.equal(200);
        logger.debug("Created author: " + JSON.stringify(response.data, null, 2));
        // Get the author by its randomized ID
        const res = await ApiService.getAuthorById(fakerAuthor.id);
        expect(res.status).to.equal(200);
        expect(res.data).to.deep.include({
          id: fakerAuthor.id,
          firstName: fakerAuthor.firstName,
          lastName: fakerAuthor.lastName,
        });
        expect(res.data, "Author must have an idBook")
          .to.have.property("idBook")
          .that.satisfies((val) => typeof val === "number");
        logger.debug("Response: " + JSON.stringify(res.data, null, 2));
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error: " + err.message);
      }
    });

    it("should return 400 with author missing fields", async () => {
      try {
        const response = await ApiService.createAuthor(authorMissingFields);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for invalid author data", async () => {
      try {
        await ApiService.createAuthor(authorInvalidData);
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should create an author with edge case data", async () => {
      try {
        const response = await ApiService.createAuthor(authorEdgeCase);
        expect(response.status).to.equal(200);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should return 500 for duplicate id", async () => {
      try {
        await ApiService.createAuthor(testAuthor);
      } catch (err) {
        expect(err.response.status).to.equal(500);
        console.log("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for no body", async () => {
      try {
        await ApiService.createAuthor({});
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.response("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Update Tests
  describe("Update Authors", () => {
    it("should update author", async () => {
      try {
        const response = await ApiService.updateAuthor(fakerAuthor.id, updatedAuthor);
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(updatedAuthor);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should create and update author with validAuthor", async () => {
      try {
        const createResponse = await ApiService.createAuthor(validAuthor);
        expect(createResponse.status).to.equal(200);
        logger.debug("Created author: " + JSON.stringify(createResponse.data, null, 2));
        const response = await ApiService.updateAuthor(validAuthor.id, validAuthor);
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(validAuthor);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should update author with missing fields", async () => {
      try {
        const response = await ApiService.updateAuthor(
          authorMissingFields.id,
          authorMissingFields
        );
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for invalid author data", async () => {
      try {
        await ApiService.updateAuthor(testAuthor.id, authorInvalidData);
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 404 for non-existing author", async () => {
      try {
        await ApiService.updateAuthor(nonExistingData.id, validAuthor);
      } catch (err) {
        expect(err.response.status).to.equal(404);
        console.log("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for no body", async () => {
      try {
        await ApiService.updateAuthor(fakerAuthor.id, {});
      } catch (err) {
        expect(err.response.status).to.equal(400);
        console.log("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Delete Tests
  describe("Delete Authors", () => {
    it("should delete author", async () => {
      try {
        const authorId = fakerAuthor.id;
        const createResponse = await ApiService.createAuthor(fakerAuthor);
        expect(createResponse.status).to.equal(200);
        logger.debug("Created author: " + JSON.stringify(createResponse.data, null, 2));
        const response = await ApiService.deleteAuthor(authorId);
        expect(response.status).to.equal(200);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should return 404 when deleting non-existent author", async () => {
      try {
        await ApiService.deleteAuthor(nonExistingData.id);
      } catch (err) {
        expect(err.response.status).to.equal(404);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 when deleting with invalid id", async () => {
      try {
        await ApiService.deleteAuthor("abc");
        expect.fail("Expected 400 error");
      } catch (err) {
        expect(err.response.status).to.equal(400);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 405 when deleting with no id", async () => {
      try {
        await ApiService.deleteAuthor("");
        expect.fail("Expected 405 error");
      } catch (err) {
        expect(err.response.status).to.equal(405);
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // E2E Test
  describe("E2E Author Flow", () => {
    it("should perform full author flow with testAuthor", async () => {
      try {
        // Get all
        const allResponse = await ApiService.getAllAuthors();
        expect(AuthorValidator.validateGetAuthorsResponse(allResponse)).to.be.true;
        const allAuthors = allResponse.data;
        expect(allAuthors.length).to.be.at.least(1);
        logger.debug("Response: " + JSON.stringify(allResponse.data, null, 2));

        // Create
        const createResponse = await ApiService.createAuthor(fakerAuthor);
        expect(createResponse.status).to.equal(200);
        logger.debug("Created author: " + JSON.stringify(createResponse.data, null, 2));

        // Update
        const updateResponse = await ApiService.updateAuthor(
          fakerAuthor.id,
          fakerAuthor
        );
        expect(updateResponse.status).to.equal(200);
        expect(updateResponse.data).to.deep.equal(fakerAuthor);
        logger.debug("Updated author: " + JSON.stringify(updateResponse.data, null, 2));
        
        // Delete
        const deleteResponse = await ApiService.deleteAuthor(fakerAuthor.id);
        expect(deleteResponse.status).to.equal(200);
        logger.debug(
          "Response: " + JSON.stringify(deleteResponse.data, null, 2)
        );
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });
  });
});
