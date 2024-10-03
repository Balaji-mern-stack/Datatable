import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate,Link } from 'react-router-dom';
import {  Person, BoxArrowRight } from 'react-bootstrap-icons';

function DataTableTask2() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://catodotest.elevadosoftwares.com/Client/GetAllClientDetails")
      .then(res => {
        setDetails(res.data.clientList);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
        clientId: id,
        removedRemarks: text,
        createdBy: 1
      };
      axios.post("http://catodotest.elevadosoftwares.com/Client/RemoveClient", data)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Client has been deleted",
            showConfirmButton: false,
            timer: 1500
          });
          setDetails(details.filter(detail => detail.clientId !== id)); 
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  const handleLogout = () => {
    navigate('/');
  };

  function handleEdit(row) {
    navigate(`/edit-client/${row.clientId}`);
  }

  const columns = [{
    name: "Client ID",
    selector: row => row.clientId
  }, {
    name: "Client Name",
    selector: row => row.clientName
  }, {
    name: "Phone",
    selector: row => row.phone
  }, {
    name: "Address",
    selector: row => row.address
  }, {
    name: "GST",
    selector: row => row.gst
  }, {
    name: "Website",
    selector: row => row.website
  }, {
    name: "Email",
    selector: row => row.email
  }, {
    name: "Contact Person",
    selector: row => row.contactPerson
  }, {
    name: "Phone Number",
    selector: row => row.phoneNumber
  }, {
    name: "Created By",
    selector: row => row.createdBy
  }, {
    name: "Actions",
    cell: row => (
      <div>
        <Button variant="primary" onClick={() => handleEdit(row)}>
          <BsPencil />
        </Button>
        <Button variant="danger" onClick={() => handleDelete(row.clientId)}>
          <BsTrash />
        </Button>
      </div>
    )
  }];

  return (
    <div>
        <nav className="navbar">
  <div className="navbar-container">
   
    <div className="navbar-right">
      <ul>
        <li>
          <Link to="/data-table" className='client'>Category</Link>
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
      <Button variant="success" onClick={() => navigate("/edit-client/new")}  style={{ width: '10%', marginLeft:'550px' }} >Add Details</Button>
      <DataTable
        columns={columns}
        data={details}
        pagination
      />
    </div>
  );
}

export default DataTableTask2;
