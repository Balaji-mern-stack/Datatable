import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button from React Bootstrap
import { Pencil, Trash, Person, BoxArrowRight } from 'react-bootstrap-icons'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './DataTableTask.css'; // Import the CSS file
import './NavBar.css'; // Import the CSS file for the NavBar

function DataTableTask1() {
  const [detalis, setdetalis] = useState([]);
  const [categoryData, setCategoryData] = useState({
    categoryId: 0,
    category: "",
    description: "",
    createdBy: 1
  });

  const location = useLocation();
  const username = location.state?.username || 'User';
  const navigate = useNavigate();

  function getAllCategories() {
    axios.get('http://catodotest.elevadosoftwares.com/Category/GetAllCategories')
      .then(res => {
        setdetalis(res.data.categoryList);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  function handleChange(e) {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  }

  function display(e) {
    e.preventDefault();
    axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", categoryData)
      .then(() => {
        alert("Saved successfully!");
        setCategoryData({
          category: "",
          description: ""
        });
        getAllCategories(); // Refresh the list
      });
  }

  async function handleDelete(id) {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });

    if (text) {
      const data = {
        categoryId: id,
        removedRemarks: text,
        createdBy: 1
      };
      axios.post("http://catodotest.elevadosoftwares.com/Category/RemoveCategory", data)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category has been deleted",
            showConfirmButton: false,
            timer: 1500
          });
          getAllCategories(); // Refresh the list
        });
    }
  }

  function handleEdit(row) {
    setCategoryData({
      categoryId: row.categoryId,
      category: row.category,
      description: row.description,
      createdBy: 1
    });
  }

  const handleLogout = () => {
    navigate('/');
  };

  const columns = [{
    name: "CATEGORY_ID",
    selector: row => row.categoryId,
    sortable: true
  }, {
    name: "CATEGORY",
    selector: row => row.category
  }, {
    name: "DESCRIPTION",
    selector: row => row.description
  }, {
    name: "CREATED_BY",
    selector: row => row.createdBy
  }, {
    name: "ACTIONS",
    cell: row => (
      <div className="action-icons">
        <Pencil
          size={20}
          color="blue"
          className="action-icon"
          onClick={() => handleEdit(row)}
        />
        <Trash
          size={20}
          color="red"
          className="action-icon"
          onClick={() => handleDelete(row.categoryId)}
        />
      </div>
    )
  }];

  return (
    <div className="data-table-container">
        <nav className="navbar">
  <div className="navbar-container">
    <div className="navbar-left">
      <span className="navbar-welcome">Welcome, {username}!</span>
    </div>
    <div className="navbar-right">
      <ul>
        <li>
          <Link to="/client" className='client'>Client</Link>
        </li>
        <li>
          <BoxArrowRight
            size={20}
            color="red"
            className="navbar-icon"
            onClick={handleLogout}
          />
        </li>
      </ul>
    </div>
  </div>
</nav>

      <form className="data-table-form" onSubmit={display}>
        <div>
          <label>Category:</label>
          <input
            type='text'
            value={categoryData.category}
            name='category'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type='text'
            value={categoryData.description}
            name='description'
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="success" className='submit-button'>Submit</Button>
      </form>
      <DataTable
        className="data-table"
        columns={columns}
        data={detalis}
        pagination
      />
    </div>
  );
}

export default DataTableTask1;
