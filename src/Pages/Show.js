/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../Components/show/ShowMainData';
import Cast from '../Components/show/Cast';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import { ShowPageWrapper, InfoBlock } from './Show.styled';
import { useShow } from '../misc/Custom-hook';




const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShow(id);

  console.log('show', show);

  if (isLoading) {
    return <div>Data is updated</div>;
  }

  if (error) {
    return <div>Error Occured :{error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
