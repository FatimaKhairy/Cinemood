
Name: Fatima Khairy

Challange: Web 3 - Interactive Movie Finder

Features and process: 
1. I created html, css, and js files.
2. In order to read the movies' information from JSON, I used fetch() and the loadMovies() function.
3. After receiving the information, I used DOM and displayMovies() function to create and display movie cards on the web page. Each card includes: Movie poster, English and Persian title, published year, rating, and an (Add to favorite) button. These elements are the stored in the moviesContainer div.
4. I added a search box (seatchInput) which enables users to search both English and Persian titles. By using (filter) the user's input will be compared to each movie's title; if matched, it will appear as the result.
5. I added a variable called (genreFilter) and used the (change) event to allow user filter the movies based on the genres gien in the movies_sample.json file. When the user selects a genre, javascript will hceck if the genre exists or not. If it exists, the movies will appear as the result. There is also an option called (ALL genres) that shows all of the moies regardless of their genres.
6. Besides the genres, I created a (mood) array inside the (moosContainer) div so that the movies can be filtered by the mood as well. For that, I added the (click) event to the moodContainer to check what mood is clicked and suggests movies that match that category. 
7. I also added 2 sorting options. One is the default order that displays movies based on their order in the json file. The second one, highest rating, shows movies from the highes rating to the lowest. For that, js uses the (sort) method to compare the rating. 
8. I created (favoritesContainer) dic to store the user's favorite movies when (add to favorite) button is clicked. This section displays the movie title and a (Remove from favories) button. When (Remove from favories) is clicked, the movie will be removed from the favorites section and the (Remove from favorites) button in the main movie lists will change to (Add to favorites) again.
9. I signed into TMDB and requested for an API key. After filling the form and entering information about my project I was given the API Read Access Token.Then I added loadMoviePoster() function to receive the posters from TMDB. By using fetch(), the search request will be sent to TMDB, then with (await response.json()) the response will be sent as js data. The (data/results[0].poster_path) shows the first poster's path and at the end the full address will becreated and and stored in the movie.poster to be displayed in the card. 
10. I used CSS to add style and animation to my website. Moreover, I made the title dynamic to show all five moods through pictures.

Thank you!

