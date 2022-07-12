import React, { useContext, useState } from 'react';
import starContext from '../context/starContext';

const Filters = () => {
  const { setNameFilter, filterByName, handleNewNumericFilter,
    filtersAvailables, usedFilters, removeNumericFilter,
    removeAllFilters, changeOrder } = useContext(starContext);
  const [colunaFilter, setColunaFilter] = useState(filtersAvailables[0]);
  const [valorFilter, setValorFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [orderType, setOrderType] = useState('ASC');
  const [columnOrder, setColumnOrder] = useState('population');

  const newFilter = () => {
    handleNewNumericFilter(colunaFilter, valorFilter, numberFilter);
    setValorFilter('maior que');
    setNumberFilter(0);
    setColunaFilter(filtersAvailables[0]);
  };

  return (
    <section className="p-6 bg-zinc-800 text-zinc-500 font-sans flex-col justify-center">
      <div className="ml-96">
        <input
          placeholder="Type a name"
          className="ml-96 w-56 bg-amber-200 border-2 m-2 h-8
        text-center
        rounded border-amber-300 focus-visible:outline-8
        outline-offset-0 outline-amber-100"
          data-testid="name-filter"
          type="text"
          value={ filterByName.name }
          onChange={ ({ target }) => setNameFilter(target.value.toLowerCase()) }
        />
      </div>
      <div className="flex items-center justify-around">
        <label
          className="flex-col"
          htmlFor="coluna-select"
        >
          <p className="w-28 text-center font-bold">Coluna</p>
          <select
            className="w-28 bg-amber-200 border-2 h-8
            text-center
            rounded border-amber-300 focus-visible:outline-8
            outline-offset-0 outline-amber-100"
            value={ colunaFilter }
            onChange={ ({ target }) => setColunaFilter(target.value) }
            id="coluna-select"
            data-testid="column-filter"
          >
            {filtersAvailables.map((filter) => <option key={ filter }>{filter}</option>)}
          </select>
        </label>
        <label className="flex-col" htmlFor="valor-select">
          <p className="w-28 text-center font-bold">Valor</p>
          <select
            className="w-28 bg-amber-200 border-2 h-8
            text-center
            rounded border-amber-300 focus-visible:outline-8
            outline-offset-0 outline-amber-100"
            value={ valorFilter }
            onChange={ ({ target }) => setValorFilter(target.value) }
            id="valor-select"
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          className="w-28 bg-amber-200 border-2 h-8
          text-center
          rounded border-amber-300 focus-visible:outline-8
          outline-offset-0 outline-amber-100"
          type="number"
          value={ numberFilter }
          onChange={ ({ target }) => setNumberFilter(target.value) }
          data-testid="value-filter"
        />
        <button
          className="bg-amber-300 font-bold p-1.5 rounded"
          data-testid="button-filter"
          type="button"
          onClick={ newFilter }
        >
          Adicionar filtro
        </button>
        <label htmlFor="sort-select">
          <p className="w-28 text-center font-bold">Ordene</p>
          <select
            className="w-28 bg-amber-200 border-2 h-8
            text-center
            rounded border-amber-300 focus-visible:outline-8
            outline-offset-0 outline-amber-100"
            onChange={ ({ target }) => setColumnOrder(target.value) }
            id="sort-select"
            data-testid="column-sort"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label className="flex" htmlFor="asc-radio">
          <p className="font-bold pr-1">Ascendente</p>
          <input
            onClick={ () => setOrderType('ASC') }
            id="asc-radio"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="order"
          />
        </label>
        <label className="flex" htmlFor="desc-radio">
          <p className="font-bold pr-1">Descendente</p>
          <input
            className="checked:"
            onClick={ () => setOrderType('DESC') }
            id="desc-radio"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="order"
          />
        </label>
        <button
          className="bg-amber-300 font-bold p-1.5 rounded"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => changeOrder(columnOrder, orderType) }
        >
          Ordenar
        </button>
      </div>
      <div>
        {usedFilters.map((filter) => (
          <section data-testid="filter" key={ filter }>
            <p>{filter}</p>
            <button
              data-testid="btn-remove-individual"
              type="button"
              onClick={ () => removeNumericFilter(filter) }
            >
              X
            </button>
          </section>
        ))}
        { usedFilters.length !== 0 && (
          <button
            onClick={ () => removeAllFilters() }
            data-testid="button-remove-filters"
            type="button"
          >
            Remover todos os filtros
          </button>)}
      </div>
    </section>
  );
};

export default Filters;
