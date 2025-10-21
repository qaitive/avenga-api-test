import { expect } from "chai";
import ApiService from "../support/apiService.js";
import logger from "../support/logger.js";
import BookValidator from "../support/bookValidator.js";
import {
  testBook,
  newBook,
  validBook,
  bookMissingFields,
  bookInvalidData,
  bookEdgeCase,
  fakerBook,
  updatedBook,
  nonExistingData
} from "../testdata/testData.js";

describe("Book API Tests", () => {
  // Get Tests
  describe("Get Books", () => {
    it("should get all books", async () => {
      try {
        const response = await ApiService.getAllBooks();
        expect(BookValidator.validateGetBooksResponse(response)).to.be.true;
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error: " + err.message);
      }
    });

    it("should get book by id and verify validBook", async () => {
      try {
        const response = await ApiService.getBookById(validBook.id);
        expect(response.status).to.equal(200);
        const bookActual = response.data;
        expect(BookValidator.validateBookResponse(bookActual)).to.be.true;
        expect(bookActual).to.deep.include({
          id: validBook.id,
          title: validBook.title,
          description: validBook.description,
          pageCount: validBook.pageCount,
          excerpt: validBook.excerpt,
        });
        expect(bookActual.publishDate).to.not.be.empty;
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        logger.debug("Response:", JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });
    it("should return 404 for invalid book id", async () => {
      try {
        await ApiService.getBookById(nonExistingData.id);
        expect.fail("Expected 404 error");
      } catch (err) {
        expect(err.response.status).to.equal(404);
        logger.debug("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Create Books Tests
  describe("Create Books", () => {
    it("should create new book ", async () => {
      try {
        const response = await ApiService.createBook(newBook);
        expect(response.status).to.equal(200);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
      } catch (err) {
        logger.debug("Response:", JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });
    it("should create book using fakerBook Id and verify Book", async () => {
      try {
        // Create the book to ensure it exists
        const response = await ApiService.createBook(fakerBook);
        logger.debug("Response: " + JSON.stringify(response.data, null, 2));
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(fakerBook);
        const res = await ApiService.getBookById(fakerBook.id,{timeout:3000});
        expect(res.status).to.equal(200);
        expect(res.data).to.deep.include({
          id: fakerBook.id,
          title: fakerBook.title,
          description: fakerBook.description,
          pageCount: fakerBook.pageCount,
          excerpt: fakerBook.excerpt,
        });
        expect(res.data.publishDate).to.not.be.empty;
        logger.debug("Response: " + JSON.stringify(res.data, null, 2));
      } catch (err) {
        logger.debug("Response: " + JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error: " + err.message);
      }
    });

    it("should create a book with missing fields", async () => {
      try {
        const response = await ApiService.createBook(bookMissingFields);
      } catch (err) {
        expect(err.response.status).to.equal(400);
      }
    });

    it("should return 400 for invalid book data", async () => {
      try {
        await ApiService.createBook(bookInvalidData);
      } catch (err) {
        expect(err.response.status).to.equal(400);
      }
    });

    it("should create a book with edge case data", async () => {
      try {
        const response = await ApiService.createBook(bookEdgeCase);
        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(bookEdgeCase.id);
        expect(response.data.title).to.equal(bookEdgeCase.title);
        logger.debug("Response:", JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should return 500 for duplicate id", async () => {
      try {
        await ApiService.createBook(testBook);
      } catch (err) {
        expect(err.response.status).to.equal(500);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for no body", async () => {
      try {
        await ApiService.createBook({});
      } catch (err) {
        expect(err.response.status).to.equal(400);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Update Tests
  describe("Update Books", () => {
    it("should update book", async () => {
      try {
        const response = await ApiService.updateBook(fakerBook.id, updatedBook);
        expect(response.status).to.equal(200);
        const responseBook = response.data;
        expect(responseBook).to.deep.equal(updatedBook);
        console.log("Response:", JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should create and update book with validBook", async () => {
      try {
        const createResponse = await ApiService.createAuthor(validBook);
        expect(createResponse.status).to.equal(200);
        logger.debug(
          "Created author: " + JSON.stringify(createResponse.data, null, 2)
        );
        const response = await ApiService.updateBook(fakerBook.id, validBook);
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(validBook);
        logger.debug("Response:", JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should update book with missing fields", async () => {
      try {
        const response = await ApiService.updateBook(validBook.id, bookMissingFields); 
      } catch (err) {
        expect(err.response.status).to.equal(400);
      }
    });

    it("should return 404 for invalid book id", async () => {
      try {
        await ApiService.getBookById(nonExistingData.id, validBook);
      } catch (err) {
        expect(err.response.status).to.equal(404);
        logger.debug("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for invalid book data", async () => {
      try {
        await ApiService.updateBook(validBook.id, bookInvalidData);
      } catch (err) {
        expect(err.response.status).to.equal(400);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 for no body", async () => {
      try {
        await ApiService.updateBook(fakerBook.id, {});
      } catch (err) {
        expect(err.response.status).to.equal(400);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // Delete Tests
  describe("Delete Books", () => {
    it("should delete book", async () => {
      try {
        const bookId = fakerBook.id;
        const response = await ApiService.deleteBook(bookId);
        expect(response.status).to.equal(200);
        console.log("Response:", JSON.stringify(response.data, null, 2));
      } catch (err) {
        expect.fail("Unexpected error");
      }
    });

    it("should return 404 when deleting non-existent book", async () => {
      try {
        await ApiService.deleteBook(nonExistingData.id);
      } catch (err) {
        expect(err.response.status).to.equal(404);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 400 when deleting with invalid id", async () => {
      try {
        await ApiService.deleteBook("abc");
      } catch (err) {
        expect(err.response.status).to.equal(400);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });

    it("should return 405 when deleting with no id", async () => {
      try {
        await ApiService.deleteBook("");
      } catch (err) {
        expect(err.response.status).to.equal(405);
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
      }
    });
  });

  // E2E Test
  describe("E2E Book Flow", () => {
    it("should perform full book flow with testBook", async () => {
      try {
        // Get all
        const allResponse = await ApiService.getAllBooks();
        const allBooks = allResponse.data;
        expect(allBooks.length).to.equal(200);
        // Create
        const response = await ApiService.createBook(testBook);
        expect(response.status).to.equal(200);

        // Update
        const updateResponse = await ApiService.updateBook(testBook.id, testBook);
        const updatedBook = updateResponse.data;
        expect(updatedBook).to.deep.equal(testBook);

        // Delete
        const deleteResponse = await ApiService.deleteBook(testBook.id);
        expect(deleteResponse.status).to.equal(200);
      } catch (err) {
        console.log("Response:", JSON.stringify(err.response.data, null, 2));
        expect.fail("Unexpected error");
      }
    });
  });
});
