import React from 'react';
import { render, screen } from '@testing-library/react';
import API_RESULT from './mocks/api';
import App from  '../App';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Filters', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Testa se o input de número funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const numberFilter = await screen.findByTestId('value-filter');

    userEvent.type(numberFilter, '15');
    expect(await screen.findByTestId('value-filter')).toHaveValue(15);
  });

  it('Testa se o botão de deletar (individual), remove o filtro', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const HABITANTES_FILTRO = 2000000;
    const column_filter = await screen.findByTestId('column-filter');
    const value_filter = screen.getByTestId('comparison-filter');
    const input_number = screen.getByTestId('value-filter');
    const btn_config = screen.getByTestId('button-filter');

    userEvent.selectOptions(column_filter, 'population');
    userEvent.selectOptions(value_filter, 'maior que');
    userEvent.type(input_number, HABITANTES_FILTRO);
    userEvent.click(btn_config);

    const txt_pop = await screen.findAllByText('population');

    // um do paragrafo outro da tabela e mais um do novo option
    expect(txt_pop).toHaveLength(3);

    const btn_remove = screen.getByTestId('btn-remove-individual');
    userEvent.click(btn_remove);

    const new_txt_pop = await screen.findAllByText('population');
    // um da tabela outros dois das options (select)
    expect(new_txt_pop).toHaveLength(3);
  });

  it('Testa se o botão de remover todos os filtros funciona', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const HABITANTES_FILTRO = 2000000;
    const ORBITAL_FILTRO = 400;
    const column_filter = await screen.findByTestId('column-filter');
    const value_filter = screen.getByTestId('comparison-filter');
    const input_number = screen.getByTestId('value-filter');
    const btn_config = screen.getByTestId('button-filter');

    userEvent.selectOptions(column_filter, 'orbital_period');
    userEvent.selectOptions(value_filter, 'menor que');
    userEvent.type(input_number, ORBITAL_FILTRO);
    userEvent.click(btn_config);

    userEvent.selectOptions(column_filter, 'population');
    userEvent.selectOptions(value_filter, 'maior que');
    userEvent.type(input_number, HABITANTES_FILTRO);
    userEvent.click(btn_config);

    const txt_pop = await screen.findAllByText('population');
    const txt_orb = await screen.findAllByText('orbital_period');

    // um do paragrafo outro da tabela e mais um do novo option
    expect(txt_pop).toHaveLength(3);
    expect(txt_orb).toHaveLength(3);

    const btn_removeAll = screen.getByTestId('button-remove-filters');
    userEvent.click(btn_removeAll);

    const new_txt_pop = await screen.findAllByText('population');
    const new_txt_orb = await screen.findAllByText('orbital_period');
    
    // um da tabela outros dois das options (select)
    expect(new_txt_pop).toHaveLength(3);
    expect(new_txt_orb).toHaveLength(3);
  });

  it('Testa se sem selecionar nenhuma ordem a lista inicia em ordem alfabética', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const planets_name = await screen.findAllByTestId('planet-name');

    expect(planets_name).toHaveLength(10);
    expect(planets_name[0]).toContainHTML('Alderaan');
    expect(planets_name[planets_name.length - 1]).toContainHTML('Yavin IV');
  });

  it('Testa se funciona a ordem crescente', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const select_column = await screen.findByTestId('column-sort');
    const asc_btn = screen.getByTestId('column-sort-input-asc');
    const send_btn = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(select_column, 'diameter');
    userEvent.click(asc_btn);
    userEvent.click(send_btn);
    
    const planets_name = await screen.findAllByTestId('planet-name');
    expect(planets_name[0]).toContainHTML('Endor');
    expect(planets_name[planets_name.length - 1]).toContainHTML('Bespin');
  });

  it('Testa se funciona a ordem descendente', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const select_column = await screen.findByTestId('column-sort');
    const desc_btn = screen.getByTestId('column-sort-input-desc');
    const send_btn = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(select_column, 'rotation_period');
    userEvent.click(desc_btn);
    userEvent.click(send_btn);
    
    const planets_name = await screen.findAllByTestId('planet-name');
    expect(planets_name[0]).toContainHTML('Kamino');
    expect(planets_name[planets_name.length - 1]).toContainHTML('Bespin');
  });

  it('Testa os elementos com `unknown` ficam ao final da lista', async () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(API_RESULT),
    }));

    render(<App />)

    const select_column = await screen.findByTestId('column-sort');
    const asc_btn = screen.getByTestId('column-sort-input-asc');
    const send_btn = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(select_column, 'population');
    userEvent.click(asc_btn);
    userEvent.click(send_btn);
    
    const planets_name = await screen.findAllByTestId('planet-name');
    expect(planets_name[0]).toContainHTML('Yavin IV');
    expect(planets_name[planets_name.length - 1]).toContainHTML('Hoth');
    expect(planets_name[planets_name.length - 2]).toContainHTML('Dagobah');
  });
})