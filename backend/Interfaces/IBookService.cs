using BookReviewApi.Models;

public interface IBookService // interface with http methods to be used in BookService
{
    Task <IEnumerable<Book>> GetAllBooksAsync();
    Task <Book> GetBookByIdAsync(int id);
    Task <IEnumerable<Book>> GetBookByGenreAsync(int genreId);
    Task <IEnumerable<Genre>> GetGenresByBookAsync(int bookId);
    Task UpdateBookAsync(int id, Book book);
    Task AddBookAsync(Book book);
    Task DeleteBookAsync(int id);
}