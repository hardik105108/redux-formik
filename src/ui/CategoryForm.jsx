import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, updatecategory } from "../store/categorySlice";
import { useNavigate } from "react-router-dom";
import { fetchBanks } from "../store/bankSlice";
import { fetchnetworks } from "../store/networkSlice";

const CategoryForm = ({ editingCategory, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const banks = useSelector(state => state.bank.banks); 
    const networks = useSelector((state) => state.network.networks);

    useEffect(() => {
        dispatch(fetchBanks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchnetworks());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: { 
            categoryName: editingCategory?.categoryName || '',
            bankId: editingCategory?.bankId || '', 
            networksId: editingCategory?.networksId || '', 
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            categoryName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            bankId: Yup.string().required('Bank is required'), // Add validation for the bank selection
            networksId: Yup.string().required('network is required'), // Add validation for the bank selection
        }),
        onSubmit: async (values, { resetForm }) => {
                  // Find the bankName and networkName based on selected bankId and networksId
            const selectedBank = banks.find(bank => bank.id === values.bankId);
            const selectedNetwork = networks.find(network => network.id === values.networksId);

            const categoryData = {
                ...values,
                bankName: selectedBank ? selectedBank.bankName : '',  // Include bankName
                networkName: selectedNetwork ? selectedNetwork.networkName : '', // Include networkName
            };

            if (editingCategory) {
                await dispatch(updatecategory({ id: editingCategory.id, categoryData }));
            } else {
                await dispatch(addcategory(categoryData));
            }
            resetForm();
            onClose && onClose();
            navigate("/category-list");
    
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="categoryName">Category Name</label>
            <input
                id="categoryName"
                name="categoryName"
                type="text"
                {...formik.getFieldProps('categoryName')}
            />
            {formik.touched.categoryName && formik.errors.categoryName ? (
                <div>{formik.errors.categoryName}</div>
            ) : null}
            
            <br />

            <label htmlFor="bankId">Bank</label>
            <select
                id="bankId"
                name="bankId"
                {...formik.getFieldProps('bankId')}
            >
                <option value="" label="Select a bank" />
                {banks.map(bank => (
                    <option key={bank.id} value={bank.id} label={bank.bankName} />
                ))}
            </select>
            {formik.touched.bankId && formik.errors.bankId ? (
                <div>{formik.errors.bankId}</div>
            ) : null}
            
            <br />
            <label htmlFor="networksId">Network</label>
            <select
                id="networksId"
                name="networksId"
                {...formik.getFieldProps('networksId')}
            >
                <option value="" label="Select a network" />
                {networks.map(network => (
                    <option key={network.id} value={network.id} label={network.networkName} />
                ))}
            </select>
            {formik.touched.networksId && formik.errors.networksId ? (
                <div>{formik.errors.networksId}</div>
            ) : null}
            
            <br />
            
            <Button type="submit">{editingCategory ? "Update" : "Submit"}</Button>
        </form>
    );
};

export default CategoryForm;
