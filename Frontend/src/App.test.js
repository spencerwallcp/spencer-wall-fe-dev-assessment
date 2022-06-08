import { cleanup, render, screen, within } from '@testing-library/react'
import App from './App'

const axios = require('axios');

jest.mock("axios");

//mock the api data

const mockTodos = [
  {
    id: 1,
    description: "AAA Todo",
    isComplete: false
  },
  {
    id: 2,
    description: "BBB Todo",
    isComplete: false
  },
  {
    id: 3,
    description: "CCC Todo",
    isComplete: false
  },
  ];

  jest.spyOn(console, "error").mockImplementation(() => {});

  describe('Todo items initial page load tests', () => {

      beforeEach(cleanup)

      test('Renders the footer text on page', () => {
        render(<App />)
        const footerElement = screen.getByText(/clearpoint.digital/i)
        expect(footerElement).toBeInTheDocument()
        cleanup

      })

      test('Correct number of Todo items rendered on page', async () => {

        axios.get.mockResolvedValue({ data: mockTodos });

        render(<App />)

        const table = await screen.findByRole('table')
        const rows = await within(table).findAllByRole('row')
        expect(rows).toHaveLength(4) // 1 title row and 3 lines of data from the API

      })

      test('Todo items are sorted correctly on page', async () => {

        axios.get.mockResolvedValue({ data: mockTodos });

        render(<App />)

        const table = await screen.findByRole('table')
        const rows = await within(table).findAllByRole('row')
        const row1cols = await within(rows[1]).findAllByRole('cell')
        const row2cols = await within(rows[2]).findAllByRole('cell')
        const row3cols = await within(rows[3]).findAllByRole('cell')

        expect(row1cols[1]).toHaveTextContent('AAA Todo')
        expect(row2cols[1]).toHaveTextContent('BBB Todo')
        expect(row3cols[1]).toHaveTextContent('CCC Todo')

      })

      test('Failed API call has no data on page', async () => {

        const message = "Network Error";
        axios.get.mockResolvedValue(new Error(message));

        render(<App />)

        const table = await screen.findByRole('table')
        const rows = await within(table).findAllByRole('row')
        expect(rows).toHaveLength(1) // 1 title row and no data

      })
  })




