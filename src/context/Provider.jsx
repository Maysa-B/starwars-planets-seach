import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starContext from './starContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filtersAvailables, setFiltersAvailables] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [usedFilters, setUsedFilters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numberFilter, setNumberFilter] = useState([]);
  const [order, setOrder] = useState({
    column: '',
    sort: '',
  });

  useEffect(() => {
    const fetchDados = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const fetching = await fetch(URL);
      const result = await fetching.json();
      const planetas = [];
      result.results.forEach((curr) => {
        const obj = curr;
        delete obj.residents;
        planetas.push(obj);
      });
      setPlanets(planetas);
      setIsFetching(false);
    };

    fetchDados();
  }, []);

  const changeOrder = (column, sort) => {
    setOrder({ column, sort });
  };

  const removeNumericFilter = (name) => {
    const newArray = usedFilters.filter((filter) => filter !== name);
    const removeFilter = numberFilter.filter((filter) => filter.column !== name);
    setNumberFilter(removeFilter);
    setUsedFilters(newArray);
    setFiltersAvailables([...filtersAvailables, name]);
  };

  const removeAllFilters = () => {
    setNumberFilter([]);
    setUsedFilters([]);
    setFiltersAvailables([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  };

  const handleNewNumericFilter = (column, comparison, value) => {
    const newAvailables = filtersAvailables.filter((filter) => filter !== column);
    const obj = {
      column,
      comparison,
      value: Number(value),
    };
    setUsedFilters([...usedFilters, column]);
    setFiltersAvailables(newAvailables);
    setNumberFilter([...numberFilter, obj]);
  };

  const contextContent = {
    data: planets,
    filterByName: {
      name: nameFilter,
    },
    filterByNumericValues: numberFilter,
    setNameFilter,
    handleNewNumericFilter,
    filtersAvailables,
    usedFilters,
    removeNumericFilter,
    removeAllFilters,
    order,
    changeOrder,
  };

  return (
    <section>
      {isFetching ? '' : (
        <starContext.Provider value={ contextContent }>
          {children}
        </starContext.Provider>
      )}
    </section>

  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
