import { faker } from "@faker-js/faker";

const id = faker.number.int({ min: 100, max: 200 });

export const fakerBook = {
  id,
  title: `Book ${id}`,
  description: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  pageCount: Number(`${id}00`),
  excerpt:
    "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  publishDate: faker.date.recent({ days: 365 }).toISOString(),
};
export const updatedBook = {
  id,
  title: "Updated Title",
  description: "Updated description",
  pageCount: 321,
  excerpt: "Updated excerpt",
  publishDate: "2025-09-01T00:00:00",
};

export const fakerAuthor = {
  id,
  idBook: id,
  firstName: `First Name ${id}`,
  lastName: `Last Name ${id}`,
};

export const updatedAuthor = {
  id,
  idBook: 100,
  firstName: "Updated",
  lastName: "Author",
};

export const testBook = {
  id: 255,
  title: "Book 255",
  description: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  pageCount: 2900,
  excerpt:
    "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  publishDate: "1998-07-02T11:24:58.1862489+00:00",
};

export const newBook = {
  id: faker.number.int({ min: 500, max: 1000 }),
  title: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  pageCount: faker.number.int({ min: 100, max: 500 }),
  excerpt: faker.lorem.sentence(),
  publishDate: faker.date.recent({ days: 365 }).toISOString(),
};

// Additional Book Test Data
export const validBook = {
  id: 99,
  title: "Book 99",
  description: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  pageCount: 9900,
  excerpt:
    "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  publishDate: "2025-07-11T11:15:45.5121184+00:00",
};

export const bookMissingFields = {
  id: 1000,
  title: "Incomplete Book",
  // No description, excerpt, or publishDate
};

export const bookInvalidData = {
  id: "invalid_id",
  title: "",
  description: "Invalid book with empty title and invalid ID.",
  pageCount: -50,
  excerpt: "This should fail due to negative page count.\n",
  publishDate: "not-a-date",
};

export const bookEdgeCase = {
  id: 0,
  title: "Zero ID Book",
  description: "",
  pageCount: 0,
  excerpt: "",
  publishDate: "2025-01-01T00:00:00+00:00",
};

// Additional Author Test Data

export const testAuthor = {
  id: "555",
  idBook: "555",
  firstName: "John",
  lastName: "Doe",
};
export const validAuthor = {
  id: 1,
  idBook: 1,
  firstName: "First Name 1",
  lastName: "Last Name 1",
};

export const authorInvalidData = {
  id: "abc",
  idBook: "invalid",
  firstName: "",
  lastName: "Invalid",
};

export const authorMissingFields = {
  id: "1000",
  idBook: "1000",
  // No firstName, lastName
};

export const authorEdgeCase = {
  id: "0",
  idBook: "0",
  firstName: "Anonymous",
  lastName: "",
};

export const nonExistingData = {
  id: 99999,
  idBook: "0",
  firstName: "Anonymous",
  lastName: "",
};
