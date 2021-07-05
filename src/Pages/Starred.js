import React,{useEffect, useState} from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import {useShows} from '../misc/Custom-hook';
import {apiGet} from '../misc/config';
import ShowGird from "../Components/show/ShowGird"

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect (()=>{
    if(starred && starred.length > 0 ){
       const promises = starred.map(showId => apiGet(`/shows/${showId}`));

       Promise.all(promises)
       .then(apiData => apiData.map(show => ({show})))
       .then(results =>{

        setShows(results);
        setIsLoading(false);

       }).catch(err=>{
         setError(err.message);
         setIsLoading(false);
       })
    }else{
      setIsLoading(false);
    }
  },[starred]);




  return <MainPageLayout>

    {isLoading && <div>Show are still Loading</div>}{error && <div>Error occured: {error}</div>}
    
    {!isLoading && !shows && <div>No shows were Added</div>}
  {
    !isLoading && !error && shows && <ShowGird data={shows}/>
  }

    
    </MainPageLayout>;
};

export default Starred;
