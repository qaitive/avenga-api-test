import axios from 'axios';
import config from '../config/config.js';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: config.API_BASE_URL,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Author Endpoints
  async getAllAuthors() {
    return this.client.get('/Authors');
  }

  async getAuthorById(id) {
    return this.client.get(`/Authors/${id}`);
  }

  async getAuthorsByBookId(bookId) {
    return this.client.get(`/Authors/authors/books/${bookId}`);
  }

  async createAuthor(author) {
    return this.client.post('/Authors', author);
  }

  async updateAuthor(id, author) {
    return this.client.put(`/Authors/${id}`, author);
  }

  async deleteAuthor(id) {
    return this.client.delete(`/Authors/${id}`);
  }

  // Book Endpoints
  async getAllBooks() {
    return this.client.get('/Books');
  }

  async getBookById(id) {
    return this.client.get(`/Books/${id}`);
  }

  async createBook(book) {
    return this.client.post('/Books', book);
  }

  async updateBook(id, book) {
    return this.client.put(`/Books/${id}`, book);
  }

  async deleteBook(id) {
    return this.client.delete(`/Books/${id}`);
  }
}

export default new ApiService();