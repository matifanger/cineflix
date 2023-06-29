export const getRandomMovie = () => {
    const movies = ['fast', 'transformers', 'harry', 'saw', 'spider', 'rocky', 'batman', 'terminator']
    return movies[Math.floor(Math.random() * movies.length)]
}
