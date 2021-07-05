import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from '../misc/config';
import ShowGird from '../Components/show/ShowGird';
import ActorGird from '../Components/actor/ActorGird';
import { useLastQuery } from '../misc/Custom-hook';
import { SearchInput,RadioInputsWrapper,SearchButtonWrapper } from './Home.styled';
import CustomRadio from '../Components/CustomRadio';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  console.log(searchOption);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGird data={results} />
      ) : (
        <ActorGird data={results} />
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        placeholder="Search For Something"
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
        <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
  
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
