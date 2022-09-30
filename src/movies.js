// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(film => film.director)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let stevenS = moviesArray.filter(movie => movie.director==="Steven Spielberg" && movie.genre.includes("Drama"))
    return stevenS.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if(!moviesArray.length) return 0;
    let average = (moviesArray.reduce((acc, currentVal) => acc + currentVal.score,0))
    return (average/moviesArray.length)//.toFixed(2)
  }

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaFilms = moviesArray.filter(film => film.genre.includes("Drama"));
    let dramaScore =(dramaFilms.reduce((acc, currentVal) => acc + currentVal.score,0))
    if(!dramaFilms.length) return 0;
  return (dramaScore/dramaFilms.length)//.toFixed(1)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let moviesArrayCopy = JSON.parse(JSON.stringify(moviesArray));
  moviesArrayCopy.sort((a,b) => {
    if(a.year===b.year) return -1;
    else return a.year-b.year});
  return moviesArrayCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let moviesArrayCopy = JSON.parse(JSON.stringify(moviesArray));
  let onlyTitles = moviesArrayCopy.map(movie=>movie.title);
  let alphabeticalOrderTwenty = onlyTitles.sort();
  return alphabeticalOrderTwenty.splice(0,20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let moviesArrayCopy = JSON.parse(JSON.stringify(moviesArray));
  let hoursToMinutes = moviesArrayCopy.map(film => { 
    let temp = film.duration[0]*60 + film.duration.slice(1)
    let finalTemp = temp.split("h")
    let inMinutes = Number(finalTemp[0]) + Number(finalTemp[1].slice(0,-3));
    // let sumMin = temp.reduce((accumulator, film) => accumulator + film.duration,0);
    return {...film ,
  duration: inMinutes}});
  return hoursToMinutes;
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if(!moviesArray.length) return null;
  let everyYearArray = moviesArray.map(movie => movie.year);
  let yearsInOrder = everyYearArray.sort((a,b)=>a-b);
  let oneYearAverage = function(year){
    let thatYearAvg = 0;
    let count = 0;
    moviesArray.forEach(movie=>{
      if(movie.year === year){
        thatYearAvg += movie.score;
        count ++;
      }
    });
    return thatYearAvg/count;
  }
  let yearScorePairs =[];
  let bestYear;
  for (let i = yearsInOrder[0]; i<=yearsInOrder[yearsInOrder.length-1];i++){
    yearScorePairs.push([i,oneYearAverage(i)])
    yearScorePairs.sort((a,b)=>{ if(a[1]===a[2]) return a - b;
      else return a[1]-b[1]});
  }
  bestYear = yearScorePairs[yearScorePairs.length-1]
  return `The best year was ${bestYear[0]} with an average score of ${bestYear[1]}`
}
