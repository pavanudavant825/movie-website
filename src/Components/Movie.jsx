import React from 'react'
import { useEffect, useState } from "react"

const Movie = () => {
    const [movies, setMovies]=useState([]);
    const [loading,setLoading]=useState(true);
    const [records,setRecords]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    async function fetchData() {  
      try{
       let url=`https://api.themoviedb.org/3/movie/top_rated?api_key=8fbc49a1f1232aa28da9b37a8f8574e3`;

        let response= await fetch(url);
        let data1 =await response.json(); 
        console.log(data1);
        setMovies(data1.results);
        setRecords(data1.results);
        setLoading(false);
      }
      catch(error){
        console.log(error);
      }
   }

   useEffect(() => {
       fetchData();
   }, [])

  const handleSubmit = () => {
    if(searchQuery.trim().length){
    const filteredMovies= movies.filter((user) =>
    user.original_title.toLowerCase().includes(searchQuery.toLowerCase()));
    setRecords(filteredMovies);
   }
   else{
    setRecords(records);
   }
  }

  return (
    <>
     <div className='input-box'>
      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="search movies..."/>
      <button type="button" className="search-btn" onClick={handleSubmit}>SEARCH</button>
    </div>
    {loading && <div className='loader'><h1>Loading...</h1></div>}
    {
      !loading && records.length===0?
    <div className='nomovie'><h1>No Movie Found !</h1></div>:
     <div className='card-container'>
     {
     records.map((curElem)=>{
      const posterUrl = `https://image.tmdb.org/t/p/original/${curElem.poster_path}`;
        return (
        <div className='card' key={curElem.id}>
        <h2 className='img1'><img src={posterUrl} alt="" /></h2>
        <h1 className='title'>{curElem.original_title}</h1>
        <h2 className='rating'>Ratings : {(curElem.vote_average).toFixed(1)}</h2>
        <h2 className='date'>Release Date : {curElem.release_date}</h2>
        <h2 className='para'>{curElem.overview}</h2>
        <button className='but'>ADD TO FAVORITE</button>
        </div>
        )
        }
        )
      }
      </div>
    }
    </>
  )
}

export default Movie