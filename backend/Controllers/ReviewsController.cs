using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims; 
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using BookReviewApi.Models;

// Controller handles review endpoints for creating, reading, updating, and deleting reviews - uses ReviewService to perform CRUD operations
namespace BookReviewApi.Controllers 
{
    [Route("api/[controller]")] // The controller's base URL will be api/Reviews
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService; // Review service interface 
        private readonly ILogger<ReviewsController> _logger; // Logger service 
        //private readonly UserManager<IdentityUser> _userManager;

        // Injecting the dependicies in the contructor - calls methods from services
        public ReviewsController(IReviewService reviewService, ILogger<ReviewsController> logger) //UserManager<IdentityUser> userManager
        {
            _reviewService = reviewService; //inject instance of review interface - methods from the service are automatically provided 
            _logger = logger;
            //_userManager = userManager; // Injecting ILogger manages  to log warnng and errors 
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            try
            {
                _logger.LogInformation("Fetching all reviews."); //Logging the start of the operation
                var reviews = await _reviewService.GetAllReviewsAsync(); // Calls review service to get retrieve all reviews
                if (reviews == null || !reviews.Any()) // If no reviews exist it logs a warning and returns a not found message
                {
                    _logger.LogWarning("No reviews found.");
                    return NotFound("No reviews found.");
                }
                return Ok(reviews); // Retruns list of reviews with a 200 status code
            }
            catch (Exception ex) // Error handling, logging a error and returning a 500 internal message if something goes wrong 
            {
                _logger.LogError(ex, "An error occurred while fetching reviews."); 
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            try
            {
                _logger.LogInformation($"Fetching review with ID {id}"); //Loggs the start of the operation 
                var review = await _reviewService.GetReviewByIdAsync(id); // Calls the service to retrives reviews that matches id

                if (review == null) // If it comes up empty a warning is logged and not found reposnse is displayed
                {
                    _logger.LogWarning($"Review with ID {id} not found.");
                    return NotFound($"Review with ID {id} not found.");
                }

                return Ok(review); // Otherwise returns the review 
            }
            catch (Exception ex) // Error handling, logging a error and returning a 500 internal message if something goes wrong
            {
                _logger.LogError(ex, "An error occurred while fetching the review.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        // Get api/Reviews/ByBook/1
        [HttpGet("ByBook/{bookId}")]
        public async Task<ActionResult<Book>> GetReviewsForBook(int bookId)
        {
            try
            {
                _logger.LogInformation("Fetching all reviews."); //Loggs the start of the operation 
                var reviews = await _reviewService.GetReviewsForBookAsync(bookId); //Calls service to get reviews by book id

                if (reviews ==null || !reviews.Any()) // if no reviews are found then a warning is logged and a not found is returned 
                {
                     _logger.LogWarning($"Reviews for book ID {bookId} not found.");
                    return NotFound($"Review for book ID with {bookId} not found.");
                }
                return Ok(reviews); // Returns a list of reviews for the book id

            }
            catch (Exception ex)
            {
                // Log any exceptions that occur during the process and returns 500 internal error status code 
                _logger.LogError(ex, "An error occurred while fetching reviews for the book.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
            
        }

        // Get api/Reviews/ByUser/1
        [HttpGet("ByUser/{memberId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByUser(string memberId)
        {
            try
            {
                _logger.LogInformation("Fetching all reviews."); //Loggs the start of the operation 
                var reviews = await _reviewService.GetReviewsByUserAsync(memberId); //Calls service to get reviews by member id

                if (reviews == null || !reviews.Any()) // if no reviews are found then a warning is logged and a not found is returned 
                {
                     _logger.LogWarning($"Reviews for books with member ID {memberId} not found.");
                    return NotFound($"Reviews for books with member ID {memberId} not found.");
                }
                return Ok(reviews); // Returns a list of reviews for the member id

            }
            catch (Exception ex)
            {
                // Log any exceptions that occur during the process and returns 500 internal error status code 
                _logger.LogError(ex, "An error occurred while fetching reviews for the book by member ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
            
        }

        [Authorize(Roles = "Admin")]
        // PUT: api/Reviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
           if (id != review.ReviewId) // Checks if id matches the review in Url 
            {
                _logger.LogWarning("Review ID mismatch."); // logs warning and returns bad request reponse if it doesnt 
                return BadRequest("Review ID mismatch."); 
            }
            
            var exReview = await _reviewService.GetReviewByIdAsync(id); //Calls review service to get review Id
            
            if (exReview == null) // If review doesnt exist in database log a warning and return not found response 
            {
                _logger.LogWarning($"Review with ID {id} not found for update."); 
                return NotFound($"Review with ID {id} not found.");
            }
            // if it does exist update the fields 
            exReview.Rating = review.Rating;
            exReview.ReviewComment = review.ReviewComment;
            exReview.ReviewDate = DateTime.UtcNow; 
            
            try
            {
                await _reviewService.UpdateReviewAsync(id, exReview); // Calls review service to update the review in the database
                _logger.LogInformation($"Review with ID {id} updated."); // Logs and returns no content for successful update 
                return NoContent();
            }
            catch (DbUpdateConcurrencyException) // Exception to log errors and return status code if problem updating the database
            {
                _logger.LogError($"An error occurred while updating the review.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating review.");
            }
        }

        [Authorize] // User must have a account 
        // POST: api/Reviews
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            try
            {
                if (review == null) // If a review is null and not provided
                {
                    _logger.LogWarning("Received empty review object."); // Warning is logged and bad request repsonse is returned
                    return BadRequest("Review data cannot be null.");
                }

                review.ReviewDate = DateTime.UtcNow; // Review date is automaticlly created to the time review is posted

                await _reviewService.AddReviewAsync(review); // Calls review service and adds the review to the database 
                _logger.LogInformation($"Review with ID {review.ReviewId} created."); 
                return CreatedAtAction("GetReview", new { id = review.ReviewId }, review); //Returns a 201 creation response with the location
            }
            catch (Exception ex)  // Log any exceptions that occur during the process and returns 500 internal error status code 
            {
                _logger.LogError(ex, "An error occurred while creating the review.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        
        [Authorize]
         // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                // Get the review by ID
                var review = await _reviewService.GetReviewByIdAsync(id);
                if (review == null)
                {
                    _logger.LogWarning($"Review with ID {id} not found.");
                    return NotFound($"Review with ID {id} not found.");
                }
 
                // Proceed with deletion
                await _reviewService.DeleteReviewAsync(id);
                _logger.LogInformation($"Review with ID {id} deleted.");
                return NoContent(); // HTTP 204
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the review.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error.");
            }
        }
    }
}
