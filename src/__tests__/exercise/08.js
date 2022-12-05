// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function UseCounterTest() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

function setup(initialProps = {}) {
  const result = {}
  function TestComponent() {
    // allows customization of the initial count
    // allows customization of the step
    // And test those use cases
    Object.assign(result, useCounter(initialProps))
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  // render(<UseCounterTest />)
  // // 🐨 get the elements you need using screen
  // const increment = screen.getByRole('button', {name: /increment/i})
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const message = screen.getByText(/current count/i)
  // // 🐨 assert on the initial state of the hook
  // expect(message).toHaveTextContent('Current count: 0')
  // // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  // await userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // await userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
  // const result = setup({initialCount: 4, step: 2})
  const {result} = renderHook(useCounter, {
    initialProps: {initialCount: 4, step: 2},
  })

  expect(result.current.count).toBe(4)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(4)
})

/* eslint no-unused-vars:0 */
