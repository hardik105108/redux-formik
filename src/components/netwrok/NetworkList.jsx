import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnetworks, addnetwork, updatenetwork, deletenetwork } from '../../store/networkSlice';
import { Toaster } from "react-hot-toast";

const NetworkList = () => {
    const dispatch = useDispatch();
    const networks = useSelector((state) => state.network.networks);
    const [show, setShow] = useState(false);
    const [editingnetwork, setEditingnetwork] = useState(null);

    useEffect(() => {
        dispatch(fetchnetworks());
    }, [dispatch]);

    const handleClose = () => {
        setShow(false);
        setEditingnetwork(null);
    };

    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: { networkName: editingnetwork?.networkName || '' },
        enableReinitialize: true,
        validationSchema: Yup.object({
            networkName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (editingnetwork) {
                await dispatch(updatenetwork({ id: editingnetwork.id, networkData: values }));
            } else {
                await dispatch(addnetwork(values));
            }
            resetForm();
            handleClose();
        },
    });

    return (
        <div>
            <Toaster />
            <Button variant="primary" onClick={handleShow}>Add</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>network Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {networks.map((network, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{network.networkName}</td>
                            <td>
                                <Button variant="warning" onClick={() => { setEditingnetwork(network); handleShow(); }}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => dispatch(deletenetwork(network.id))}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingnetwork ? "Edit network" : "Add network"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="networkName">network Name</label>
                        <input
                            id="networkName"
                            name="networkName"
                            type="text"
                            {...formik.getFieldProps('networkName')}
                        />
                        {formik.touched.networkName && formik.errors.networkName ? <div>{formik.errors.networkName}</div> : null}
                        <br />
                        <Button type="submit">{editingnetwork ? "Update" : "Submit"}</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NetworkList;
