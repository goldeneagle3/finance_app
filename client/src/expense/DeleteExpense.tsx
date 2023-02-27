import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { MdDelete } from 'react-icons/md';

import { useAppDispatch } from '../hooks/redux.hook';
import { IInputData } from '../features/interfaces/expense.interface';
import { removeExpense } from '../features/slices/expense.slice';

const DeleteExpense = ({
  expense,
  onRmv,
}: {
  expense: IInputData;
  onRmv: (expense: IInputData) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteExpense = () => {
    dispatch(removeExpense(expense._id));
    onRmv(expense);
    setOpen(false);
  };

  // Cancel Delete Request API
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="Delete" onClick={clickButton}>
        <MdDelete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete ' + expense.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your expense record {expense.title}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteExpense} color="secondary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteExpense;
