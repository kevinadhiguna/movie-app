import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// Components
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {}
  });
  
  const API_KEY = process.env.REACT_APP_API_KEY;

  const apiurl = `http://www.omdbapi.com/?apikey=${API_KEY}`;
  
  const search = (e) => {
    if(e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        //console.log(data);
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
    // console.log(state.s); /* this will save any chars that users has input/inputted */
  }
  
  const openPopup = id => {
    axios(apiurl + "&i=" +id).then(({ data }) => {
      let result = data;
      console.log(result);
      
      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup =() => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
      </header>
      <main>
        <Search 
          handleInput={handleInput} 
          search={search}
        />
        <Results 
          results={state.results}
          openPopup={openPopup} 
        />
        {(typeof state.selected.Title != "undefined") ? 
          <Popup 
            selected={state.selected} 
            closePopup={closePopup} 
          /> : false 
        }
      </main>
    </div>
  );
}

export default App;
