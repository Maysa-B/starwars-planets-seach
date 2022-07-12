import React from 'react';
import { render, screen } from '@testing-library/react';
import API_RESULT from './mocks/api';
import App from  '../App';
import userEvent from '@testing-library/user-event';

// colunas 13 - planets 10
const NUMBER_CELLS = 130;

describe('Testes da tabela', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se ao abrirmos a aplicação o fetch é chamado corretamente', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const columns = await screen.findAllByRole('cell');

    expect(columns).toHaveLength(NUMBER_CELLS);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/')
  });

  it('Verifica se o filtro de nome funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const PLANET_NAME = 'tatooine';
    const FILTERED_LENGTH = 13;
    const columns = await screen.findAllByRole('cell');
    expect(columns).toHaveLength(NUMBER_CELLS);
    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, PLANET_NAME);

    const columns_filtered = await screen.findAllByRole('cell');
    expect(columns_filtered).toHaveLength(FILTERED_LENGTH);
  });

  it('Verifica se o filtro de número (maior que) funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />);

    const HABITANTES_FILTRO = 2000000;
    const column_filter = await screen.findByTestId('column-filter');
    const value_filter = screen.getByTestId('comparison-filter');
    const input_number = screen.getByTestId('value-filter');
    const btn_config = screen.getByTestId('button-filter')

    userEvent.selectOptions(column_filter, 'population');
    userEvent.selectOptions(value_filter, 'maior que');
    userEvent.type(input_number, HABITANTES_FILTRO);
    userEvent.click(btn_config);

    API_RESULT.results.forEach((planet) => {
      if (Number(planet.population) > HABITANTES_FILTRO) {
        expect(screen.getByText(planet.name)).toBeInTheDocument();
      }
    })    
  });

  it('Verifica se o filtro de número (menor que) funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />);

    const ORBITAL_FILTRO = 400;
    const column_filter = await screen.findByTestId('column-filter');
    const value_filter = screen.getByTestId('comparison-filter');
    const input_number = screen.getByTestId('value-filter');
    const btn_config = screen.getByTestId('button-filter')

    userEvent.selectOptions(column_filter, 'orbital_period');
    userEvent.selectOptions(value_filter, 'menor que');
    userEvent.type(input_number, ORBITAL_FILTRO);
    userEvent.click(btn_config);

    API_RESULT.results.forEach(async (planet) => {
      if (Number(planet.orbital_period) < ORBITAL_FILTRO) {
        expect(await screen.findByText(planet.name)).toBeInTheDocument();
      }
    });
  });

  it('Verifica se o filtro de número (igual a) funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />);

    const WATER_FILTRO = 100;
    const column_filter = await screen.findByTestId('column-filter');
    const value_filter = screen.getByTestId('comparison-filter');
    const input_number = screen.getByTestId('value-filter');
    const btn_config = screen.getByTestId('button-filter')

    userEvent.selectOptions(column_filter, 'surface_water');
    userEvent.selectOptions(value_filter, 'igual a');
    userEvent.type(input_number, WATER_FILTRO);
    userEvent.click(btn_config);

    API_RESULT.results.forEach(async (planet) => {
      if (Number(planet.surface_water) === WATER_FILTRO) {
        expect(await screen.findByText(planet.name)).toBeInTheDocument();
      }
    });
  });
})
