import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BankModal = ({ show, handleClose, editingBank, onSubmit }) => {
    const formik = useFormik({
        initialValues: { bankName: editingBank?.bankName || '' },
        enableReinitialize: true,
        validationSchema: Yup.object({
            bankName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
            handleClose();
        },
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editingBank ? "Edit Bank" : "Add Bank"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                        id="bankName"
                        name="bankName"
                        type="text"
                        {...formik.getFieldProps('bankName')}
                    />
                    {formik.touched.bankName && formik.errors.bankName ? <div>{formik.errors.bankName}</div> : null}
                    <br />
                    <Button type="submit">{editingBank ? "Update" : "Submit"}</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default BankModal;
