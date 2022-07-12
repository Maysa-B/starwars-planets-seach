import React from 'react';
import Provider from './context/Provider';
import FilterPage from './pages/FilterPage';

function App() {
  return (
    <Provider>
      <FilterPage />
    </Provider>
  );
}

export default App;
