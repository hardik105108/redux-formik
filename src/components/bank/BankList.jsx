import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import {
  addBank,
  deleteBank,
  fetchBanks,
  updateBank,
} from "../../store/bankSlice";
import BankModal from "../modal/BankModal";

const BankList = () => {
  const dispatch = useDispatch();
  const banks = useSelector((state) => state.bank.banks);
  const loading = useSelector((state) => state.loading.loading);
  const [show, setShow] = useState(false);
  const [editingBank, setEditingBank] = useState(null);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
    setEditingBank(null);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (values) => {
    if (editingBank) {
      await dispatch(updateBank({ id: editingBank.id, bankData: values }));
    } else {
      await dispatch(addBank(values));
    }
    handleClose(); 
  };

  return (
    <div>
      <Toaster />
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Bank Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{bank.bankName}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setEditingBank(bank);
                      handleShow();
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteBank(bank.id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <BankModal
        show={show}
        handleClose={handleClose}
        editingBank={editingBank}
        onSubmit={handleSubmit}
        loading={loading}  
      />
    </div>
  );
};

export default BankList;
