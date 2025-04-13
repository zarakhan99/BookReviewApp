# BookReviewApi

A RESTful API for managing books, genres, and user reviews. This API allows users to browse genres, books and their reviews. A user can create their own reviews and post them about a book they have read. 

## Features

- **CRUD Operations**: Users can Create, Read, Update, and Delete books, genres, and reviews.
- **User Authentication**: Verification of users signing up, logging in and JWT tokens
- **Role-based Access**: Adms have special privilages within the application to manage it.
- **Data Validation**: Ensures input is valid with the requiired data.
- **Logging**: Tracks system and records problems and errors using ILogger.

## Usage

To use the BookReview API, you first need to authenticate and use the following endpoints:

### Authentication

- **POST /api/account/register**: Register a new user.
- **POST /api/account/login**: Login and receive a JWT token.

### Book Management

- **GET /api/books**: Retrieve a list of all books.
- **GET /api/books/{id}**: Retrieve a book by it's id.
- **Get /api/Books/ByGenre/{GenreId}**: Retrieve books by genre id.
- **(Admin Only) POST /api/books**: Add a new book.
- **(Admin Only) PUT /api/books/{id}**: Update details of an existing book using it's id.
- **(Admin Only)DELETE /api/books/{id}**: Delete a book using it's id.

### BookGenre Management (Admin Only)

- **GET /api/bookgenres**: Retrieve a list of all bookgenres.
- **GET /api/bookgenres/{id}**: Retrieve a bookgenre by it's id.
- **(Admin Only) POST /api/bookgenres**: Adds a new bookgenre.
- **(Admin Only) PUT /api/bookgenres/{id}**: Updates details of an existing bookgenre using it's id.
- **(Admin Only)DELETE /api/booksgenres/{id}**: Deletes a bookgenre using it's id.

### Genre and Review Management

- **GET /api/genres**: Get a list of all genres.
- **(Authorised)POST /api/reviews**: Add a review for a book (Must be a authenticated user with a token).
- **GET /api/reviews**: Retrieve reviews for a specific book.

For Protected routes, you must supply a valid JWT Token in the `Authorization` header

