import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../App.css';

const Form = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  
  const setFormValues = (data) => {
    setValue('date', data.date);
    setValue('category', data.category);
    setValue('description', data.description);
    setValue('amount', data.amount);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = data;
      setExpenses(updatedExpenses);
      setEditIndex(null);
      setEditSuccess(true);
    } else {
      setExpenses([...expenses, data]);
      setSubmitSuccess(true);
    }
    setTimeout(() => {
      setSubmitSuccess(false);
      setEditSuccess(false);
    }, 3000);
    reset(); 
  };

  const handleEdit = (index) => {
    const edit = expenses[index];
    setFormValues(edit); 
    setEditIndex(index);
    setShowEditConfirmation(true);
  };

  const confirmEdit = () => {
    setShowEditConfirmation(false);
  };

  const cancelEdit = () => {
    setShowEditConfirmation(false);
    reset(); 
  };

  const handleDelete = (index) => {
    setShowDeleteConfirmation(true);
    setEditIndex(index);
  };

  const confirmDelete = () => {
    const updatedExpenses = expenses.filter((_, i) => i !== editIndex);
    setExpenses(updatedExpenses);
    setEditIndex(null);
    setDeleteSuccess(true);
    setShowDeleteConfirmation(false);
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 3000);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div className="container">
      <h1>Expense Report Form</h1>

      {submitSuccess && <p className="success-message">Expense submitted successfully!</p>}
      {editSuccess && <p className="success-message">Expense updated successfully!</p>}
      {deleteSuccess && <p className="success-message">Expense deleted successfully!</p>}

      {showEditConfirmation && (
        <div className="modal">
          <p>Are you sure you want to edit this expense?</p>
          <button onClick={confirmEdit}>Yes</button>
          <button onClick={cancelEdit}>No</button>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <p>Are you sure you want to delete this expense?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" {...register('date', { required: true })} />

          <label htmlFor="category">Category:</label>
          <select id="category" {...register('category', { required: true })}>
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="description">Description:</label>
          <input type="text" id="description" {...register('description', { required: true })} />

          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" {...register('amount', { required: true })} />

          <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
        </div>
      </form>

      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>₱{expense.amount}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Total Expenses: ₱{totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Form;
