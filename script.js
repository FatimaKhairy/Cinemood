
let movies = []
let favoriteMovies = JSON.parse (localStorage.getItem("favoriteMovies")) || []
const API_KEY = "d011b02ec347731321954be8bc2fa906"
let favoritesContainer;
function saveFavorites(){
    localStorage.setItem(
        "favoriteMovies", JSON.stringify(favoriteMovies)
    )
}

const logo = document.querySelector("#cinemood-logo")
const logoMoods = [
    "./happy.png",
    "./sad.png",
    "./neutral.png",
    "./angry.png",
    "./surprise.png"
]

let currentMood = 0
setInterval(() =>{
    currentMood = (currentMood+1) % logoMoods.length
    logo.src = logoMoods[currentMood]
}, 2000)

function renderFavorites(){
    favoritesContainer.innerHTML = ""
    const favoriteList = movies.filter(movie => favoriteMovies.includes(movie.id))
    favoriteList.forEach(movie => {
        const favoriteCard = document.createElement("div")
        favoriteCard.classList.add("movie-card")
        const title = document.createElement("h3")
        title.textContent = movie.title
        const removeBtn = document.createElement("button")
        removeBtn.textContent = "Remove from favorites"
        removeBtn.addEventListener("click", ()=>{
            favoriteMovies = favoriteMovies.filter(id => id !== movie.id)
            saveFavorites();
            renderFavorites();

            const movieCards =  document.querySelectorAll("#moviesContainer .movie-card")
            movieCards.forEach(card =>{
                const title = card.querySelector("h3");
                if (title && title.textContent === movie.title){
                    const button = card.querySelector("button")
                    if (button) {
                        button.textContent = "Add to Favourites"
                    }
                }
            })
        })
        favoriteCard.appendChild(title)
        favoriteCard.appendChild(removeBtn)
        favoritesContainer.appendChild(favoriteCard)
    })
}


// Task 1: Reading json
async function loadMovies() {
    const response = await fetch("./movies_sample.json")
    movies = await response.json()
    // console.log(movies)

    // Sort movies by rating
    const sortMovies = document.querySelector("#sortMovies")
    sortMovies.addEventListener("change", filterMovies)


    // Task 5
    favoritesContainer = document.createElement("div")
    favoritesContainer.id = "favoritesContainer"

    const favoritesTitle = document.createElement("h2")
    favoritesTitle.textContent = "My favorite Movies"
    favoritesTitle.classList.add("mainTitle")
    favoritesTitle.style.fontWeight = "600"
    favoritesTitle.style.fontSize = "2rem"


    const moviesContainer = document.querySelector("#moviesContainer")
    moviesContainer.after(favoritesTitle)
    favoritesTitle.after(favoritesContainer)

    // Task 4 Gener Filter
    const genreFilter = document.createElement("select")
    genreFilter.id = "genreFilter"

    const genres = [
        "all", "action", "adventure",
        "animation", "comedy", "drama",
        "family", "fantasy", "music",
        "romance", "sci-fi", "thriller", "mystery",
    ]

    genres.forEach(genre => {
        const option = document.createElement("option")
        option.value = genre
        option.textContent = genre === "all"? "All genres" : genre;

        genreFilter.appendChild(option)
    });

    document.querySelector(".filters").appendChild(genreFilter)

    // Mood Buttons
    const moodContainer = document.createElement("div")
    moodContainer.id = "moodButtons"
    moodContainer.classList.add("mood-buttons")
    const moods = ["happy", "sad", "neutral", "surprise", "angry"]

    moods.forEach(mood => {
        const button = document.createElement("button")
        button.textContent = mood
        button.dataset.mood = mood
        moodContainer.appendChild(button)
    });
    document.body.insertBefore(moodContainer, document.querySelector("#moviesContainer"))

    // Selected Mood
    let selectedMood = "";

    function filterMovies(){
        const selectedGenre = genreFilter.value
        const searchText = document.querySelector("#searchInput").value.toLowerCase()
        const filteredMovies = movies.filter(movie => {
            const matchSearch = movie.title.toLowerCase().includes(searchText) || movie.title_fa.includes(searchText)
            const matchGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre)
            const matchMood = selectedMood === "" || movie.moods.includes(selectedMood);
            return matchSearch && matchGenre && matchMood
        })
        if (sortMovies.value === "rating"){
            filteredMovies.sort((a, b) => b.rating - a.rating);
        }
        displayMovies(filteredMovies)
    }

    genreFilter.addEventListener("change", filterMovies)

    moodContainer.addEventListener("click", function(event){
        if (event.target.tagName === "BUTTON"){
            const clickMood = event.target.dataset.mood
            if (selectedMood === clickMood){
                selectedMood = ""
            } else {
                selectedMood = clickMood
            }
            filterMovies()
        }
    })

    // Task 2
    filterMovies();
    renderFavorites();
    loadMoviePosters().then(() => {
        filterMovies()
        renderFavorites()
    })

    // Task 3: Searching movie
    const searchInput = document.querySelector("#searchInput")
    searchInput.addEventListener("input", filterMovies)
}
    // Display Movie Cards
    function displayMovies(movieList){
        const moviesContainer = document.querySelector("#moviesContainer")

    // Clear previous cards
        moviesContainer.innerHTML = "";
        movieList.forEach(movie => {
            const card = document.createElement("div")
            card.classList.add("movie-card")
            if (movie.poster){
                const poster = document.createElement("img")
                poster.src = movie.poster
                poster.alt = movie.title
                poster.style.width = "180px"
                card.appendChild(poster)
            }

            const title = document.createElement("h3")
            title.textContent = movie.title

            const persianTitle = document.createElement("p")
            persianTitle.classList.add("persian-title")
            persianTitle.textContent = movie.title_fa

            const year = document.createElement("p")
            year .textContent = movie.year

            const rating = document.createElement("p")
            rating.textContent = `Rating: ${movie.rating}`

            card.appendChild(title)
            card.appendChild(persianTitle)
            card.appendChild(year)
            card.appendChild(rating)

            const favoriteBtn = document.createElement("button")
            function updateFavoriteBtn(){
                if (favoriteMovies.includes(movie.id)){
                    favoriteBtn.textContent = "Remove from favorites"
                } else {
                    favoriteBtn.textContent = "Add to favorites"
                }
            }
            updateFavoriteBtn()

            favoriteBtn.addEventListener("click", ()=>{
                if (favoriteMovies.includes(movie.id)){
                    favoriteMovies = favoriteMovies.filter(id => id !== movie.id)
                } else {
                    favoriteMovies.push(movie.id)
                }

                saveFavorites()
                updateFavoriteBtn()
                renderFavorites()
            })
            card.appendChild(favoriteBtn)
            moviesContainer.appendChild(card)
        });
    }

    // Movie posters from TMDB
    async function loadMoviePosters() {
        for (const movie of movies){
            try {
                const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie.title)}&year=${movie.year}`;
                const response = await fetch(url)
                const data = await response.json()
                console.log(data)
                if (data.results && data.results.length > 0){
                    const posterPath = data.results[0].poster_path
                    if (posterPath){
                        movie.poster = `https://image.tmdb.org/t/p/w500${posterPath}`
                    }
                }
            } catch (error){
                console.log("Poster error: ", movie.title, error)
            }
        }
    }
loadMovies()
