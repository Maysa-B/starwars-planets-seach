import React, { useContext } from 'react';
import starContext from '../context/starContext';
import '../index.css';

const Table = () => {
  const { data, filterByName, filterByNumericValues, order } = useContext(starContext);
  const headTable = Object.keys(data[0]);
  const toBeRender = data.filter(
    (planet) => planet.name.toLowerCase().includes(filterByName.name),
  ).filter((planet) => (filterByNumericValues
    && filterByNumericValues.every(({ comparison, column, value }) => {
      if (comparison === 'maior que') return Number(planet[column]) > value;
      if (comparison === 'menor que') return Number(planet[column]) < value;
      return Number(planet[column]) === value;
    })))
    .sort((planetA, planetB) => {
      const a = planetA.name.toLowerCase();
      const b = planetB.name.toLowerCase();
      const returnA = -1;
      const returnB = 1;
      if (a > b) return returnB;
      return returnA;
    })
    .sort((planetA, planetB) => {
      const { column, sort } = order;
      const returnA = -1;
      const returnB = 1;
      if (planetA[column] === 'unknown') return returnB;
      if (planetB[column] === 'unknown') return returnA;
      if (sort === 'ASC') {
        return Number(planetA[column]) - Number(planetB[column]);
      }
      return Number(planetB[column]) - Number(planetA[column]);
    });

  return (
    <table className="text-zinc-500 font-sans">
      <thead className="bg-zinc-800 text-amber-300 border-amber-300 border">
        <tr>
          {headTable.map((title) => (
            <th className="border-amber-300 p-2 border" key={ title }>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {toBeRender.map((planet) => (
          <tr className="odd:bg-amber-200 even:bg-amber-400" key={ planet.name }>
            <td className="text-center" data-testid="planet-name">{planet.name}</td>
            <td className="text-center">{planet.rotation_period}</td>
            <td className="text-center">{planet.orbital_period}</td>
            <td className="text-center">{planet.diameter}</td>
            <td className="text-center">{planet.climate}</td>
            <td className="text-center">{planet.gravity}</td>
            <td className="text-center">{planet.terrain}</td>
            <td className="text-center">{planet.surface_water}</td>
            <td className="text-center">{planet.population}</td>
            <td className="text-center">
              {planet.films.map((film) => (
                <a href={ film } key={ film }>{film}</a>))}
            </td>
            <td className="text-center">{planet.created}</td>
            <td className="text-center">{planet.edited}</td>
            <td className="text-center">{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
