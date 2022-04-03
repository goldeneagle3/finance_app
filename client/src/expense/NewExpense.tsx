import React from 'react'
import useInput from '../hooks/userInput.hook'
import { validateCategory } from '../validation/methods/category.method'
import { validateExpense } from '../validation/methods/expense.method'

const NewExpense = () => {
  const {
    text:expense,
    shouldDisplayError:expenseError,
    textChangeHandler:expenseHandler,
    inputBlurHandler:expenseBlur,
    clearHandler:expenseClear
  } = useInput(validateExpense)

  const {
    text:category,
    shouldDisplayError:categoryError,
    textChangeHandler:categoryHandler,
    inputBlurHandler:categoryBlur,
    clearHandler:categoryClear
  } = useInput(validateCategory)

  
  return (
    <div>NewExpense</div>
  )
}

export default NewExpense