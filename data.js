const resultsContainer = document.getElementById('results');

function createSection(title, content) {
    const section = document.createElement('div');
    section.className = 'section';
    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.appendChild(h2);
    if (typeof content === 'string') {
        section.innerHTML += content;
    } else {
        section.appendChild(content);
    }
    resultsContainer.appendChild(section);
}

function formatMovie(movie) {
    return `
        <div class="movie-card">
            <strong>${movie.název}</strong><br>
            Režisér: ${movie.režisér}<br>
            Rok: ${movie.rok}<br>
            Cena: ${movie.cena} Kč<br>
            ${movie.žánr ? `Žánr: ${movie.žánr}` : `Žánr kód: ${movie.žánr_kod}`}
        </div>
    `;
}

const movies = [
    { název: "Pelíšky", režisér: "Jan Hřebejk", rok: 1999, cena: 299, žánr_kod: "K" },
    { název: "Vratné lahve", režisér: "Jan Svěrák", rok: 2007, cena: 349, žánr_kod: "K" },
    { název: "Želary", režisér: "Ondřej Trojan", rok: 2003, cena: 279, žánr_kod: "D" },
    { název: "Šarlatán", režisér: "Agnieszka Holland", rok: 2020, cena: 399, žánr_kod: "D" },
    { název: "Osmy", režisér: "Jan Svěrák", rok: 2012, cena: 329, žánr_kod: "K" },
    { název: "Čertí brko", režisér: "Marek Najbrt", rok: 2021, cena: 379, žánr_kod: "K" },
    { název: "Babička", režisér: "Ondřej Trojan", rok: 2015, cena: 289, žánr_kod: "H" }
];

console.log("=== POLE FILMŮ ===");
console.log(movies);
console.log("");

const moviesDiv = document.createElement('div');
moviesDiv.className = 'movie-list';
movies.forEach(movie => {
    moviesDiv.innerHTML += formatMovie(movie);
});
createSection("POLE FILMŮ", moviesDiv);

const genres = {
    K: "Komedie",
    D: "Drama",
    H: "Historický",
    A: "Akční",
    T: "Thriller"
};

console.log("=== SLOVNÍK ŽÁNRŮ ===");
console.log(genres);
console.log("");

const genresList = Object.entries(genres).map(([code, name]) => 
    `<div class="info-item"><strong>${code}:</strong> ${name}</div>`
).join('');
createSection("SLOVNÍK ŽÁNRŮ", genresList);

const uniqueDirectors = new Set(movies.map(movie => movie.režisér));

console.log("=== SET: JEDINEČNÍ REŽISÉŘI ===");
console.log(uniqueDirectors);
console.log("Počet jedinečných režisérů:", uniqueDirectors.size);
console.log("");

const directorsList = Array.from(uniqueDirectors).map(director => 
    `<div class="info-item">${director}</div>`
).join('');
const directorsInfo = `<div class="info-item"><strong>Počet jedinečných režisérů:</strong> ${uniqueDirectors.size}</div>${directorsList}`;
createSection("SET: JEDINEČNÍ REŽISÉŘI", directorsInfo);

const movieMap = new Map();
movies.forEach(movie => {
    movieMap.set(movie.název, movie);
});

console.log("=== MAP: DOHLEDÁNÍ FILMU PODLE NÁZVU ===");
console.log("Mapa obsahuje", movieMap.size, "filmů");
console.log("");

createSection("MAP: DOHLEDÁNÍ FILMU PODLE NÁZVU", `<div class="info-item"><strong>Mapa obsahuje:</strong> ${movieMap.size} filmů</div>`);

const moviesFrom2010 = movies.filter(movie => movie.rok >= 2010);

console.log("=== FILTRACE: FILMY OD ROKU 2010 VČETNĚ ===");
console.log(moviesFrom2010);
console.log("Počet filmů:", moviesFrom2010.length);
console.log("");

const filteredDiv = document.createElement('div');
filteredDiv.className = 'movie-list';
moviesFrom2010.forEach(movie => {
    filteredDiv.innerHTML += formatMovie(movie);
});
const filteredInfo = `<div class="info-item"><strong>Počet filmů:</strong> ${moviesFrom2010.length}</div>`;
const filteredSection = document.createElement('div');
filteredSection.innerHTML = filteredInfo;
filteredSection.appendChild(filteredDiv);
createSection("FILTRACE: FILMY OD ROKU 2010 VČETNĚ", filteredSection);

const moviesWithGenre = moviesFrom2010.map(movie => ({
    ...movie,
    žánr: genres[movie.žánr_kod] || "Neznámý"
}));

console.log("=== PŘEVOD: FILMY S PLNÝM NÁZVEM ŽÁNRU ===");
console.log(moviesWithGenre);
console.log("");

const withGenreDiv = document.createElement('div');
withGenreDiv.className = 'movie-list';
moviesWithGenre.forEach(movie => {
    withGenreDiv.innerHTML += formatMovie(movie);
});
createSection("PŘEVOD: FILMY S PLNÝM NÁZVEM ŽÁNRU", withGenreDiv);

const prices = moviesFrom2010.map(movie => movie.cena);
const averagePrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

console.log("=== AGREGACE: CENY FILMŮ OD ROKU 2010 ===");
console.log("Průměrná cena:", averagePrice, "Kč");
console.log("Minimální cena:", minPrice, "Kč");
console.log("Maximální cena:", maxPrice, "Kč");
console.log("");

const statsDiv = document.createElement('div');
statsDiv.className = 'stats';
statsDiv.innerHTML = `
    <div class="stat-box">
        <strong>Průměrná cena</strong>
        ${averagePrice} Kč
    </div>
    <div class="stat-box">
        <strong>Minimální cena</strong>
        ${minPrice} Kč
    </div>
    <div class="stat-box">
        <strong>Maximální cena</strong>
        ${maxPrice} Kč
    </div>
`;
createSection("AGREGACE: CENY FILMŮ OD ROKU 2010", statsDiv);

const searchedDirector = "Jan Svěrák";
const directorExists = movies.some(movie => movie.režisér === searchedDirector);

const searchedTitle = "Pelíšky";
const titleExists = movies.some(movie => movie.název === searchedTitle);

console.log("=== VYHLEDÁVÁNÍ: EXISTENCE FILMU ===");
console.log(`Existuje film režiséra "${searchedDirector}"?`, directorExists);
console.log(`Existuje film s názvem "${searchedTitle}"?`, titleExists);
console.log("");

const searchResults = `
    <div class="info-item">
        <strong>Existuje film režiséra "${searchedDirector}"?</strong> ${directorExists ? 'Ano' : 'Ne'}
    </div>
    <div class="info-item">
        <strong>Existuje film s názvem "${searchedTitle}"?</strong> ${titleExists ? 'Ano' : 'Ne'}
    </div>
`;
createSection("VYHLEDÁVÁNÍ: EXISTENCE FILMU", searchResults);

const searchedMovieFromMap = "Šarlatán";
const movieDetail = movieMap.get(searchedMovieFromMap);

console.log("=== VYHLEDÁVÁNÍ: DETAIL FILMU Z MAP ===");
console.log(`Detail filmu "${searchedMovieFromMap}":`, movieDetail);
console.log("");

const detailDiv = document.createElement('div');
if (movieDetail) {
    detailDiv.innerHTML = formatMovie(movieDetail);
} else {
    detailDiv.innerHTML = `<div class="info-item">Film "${searchedMovieFromMap}" nebyl nalezen.</div>`;
}
createSection(`VYHLEDÁVÁNÍ: DETAIL FILMU Z MAP ("${searchedMovieFromMap}")`, detailDiv);

const sortedMovies = [...movies].sort((movieA, movieB) => {
    return movieA.název.localeCompare(movieB.název, 'cs');
});

console.log("=== TŘÍDĚNÍ: FILMY PODLE NÁZVU (ČESKÉ POŘADÍ) ===");
console.log(sortedMovies);
console.log("");

const sortedDiv = document.createElement('div');
sortedDiv.className = 'movie-list';
sortedMovies.forEach(movie => {
    sortedDiv.innerHTML += formatMovie(movie);
});
createSection("TŘÍDĚNÍ: FILMY PODLE NÁZVU (ČESKÉ POŘADÍ)", sortedDiv);

const sortedByYear = [...movies].sort((movieA, movieB) => movieA.rok - movieB.rok);

console.log("=== TŘÍDĚNÍ: FILMY PODLE ROKU (VZESTUPNĚ) ===");
console.log(sortedByYear);
console.log("");

const sortedByYearDiv = document.createElement('div');
sortedByYearDiv.className = 'movie-list';
sortedByYear.forEach(movie => {
    sortedByYearDiv.innerHTML += formatMovie(movie);
});
createSection("TŘÍDĚNÍ: FILMY PODLE ROKU (VZESTUPNĚ)", sortedByYearDiv);

console.log("=== SOUHRN ===");
console.log("Celkový počet filmů:", movies.length);
console.log("Počet jedinečných režisérů:", uniqueDirectors.size);
console.log("Počet filmů v Map:", movieMap.size);
console.log("Počet filmů od roku 2010:", moviesFrom2010.length);

const summaryDiv = document.createElement('div');
summaryDiv.innerHTML = `
    <div class="stats">
        <div class="stat-box">
            <strong>Celkový počet filmů</strong>
            ${movies.length}
        </div>
        <div class="stat-box">
            <strong>Počet jedinečných režisérů</strong>
            ${uniqueDirectors.size}
        </div>
        <div class="stat-box">
            <strong>Počet filmů v Map</strong>
            ${movieMap.size}
        </div>
        <div class="stat-box">
            <strong>Počet filmů od roku 2010</strong>
            ${moviesFrom2010.length}
        </div>
    </div>
`;
createSection("SOUHRN", summaryDiv);

