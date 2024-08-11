import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { deletecategory, fetchcategorys } from "../../store/categorySlice";
import { Link, useNavigate } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categorys);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchcategorys());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(deletecategory(id));
  };

  return (
    <div>
      <Toaster />

      <Link to="/category-add">Add</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Bank Name</th> {/* Add Bank Name header */}
            <th>Network Name</th> {/* Add Network Name header */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{category.categoryName}</td>
              <td>{category.bankName}</td> {/* Display Bank Name */}
              <td>{category.networkName}</td> {/* Display Network Name */}
              <td>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/category-edit/${category.id}`)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryList;
