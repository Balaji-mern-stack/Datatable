import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link, } from 'react-router-dom';
import {   BoxArrowRight } from 'react-bootstrap-icons';
import './Editclient.css'

function EditClient() {
  const { id } = useParams(); 
  const [clientData, setClientData] = useState({
    clientId: "", 
    clientName: '',
    phone: '',
    address: '',
    gst: '',
    website: '',
    email: '',
    contactPerson: '',
    phoneNumber: '',
    createdBy: 1 
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://catodotest.elevadosoftwares.com/Client/GetAllClientDetails")
      .then(res => {
        const client = res.data.clientList.find(c => c.clientId === parseInt(id));
        setClientData(client || { ...clientData }); // Ensure clientData is always an object
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", clientData)
      .then(() => {
        alert("Client updated successfully!");
        navigate('/client');
      });
  }
  
  const handleLogout = () => {
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
     <nav className="navbar">
  <div className="navbar-container">
   
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
      <h1>Edit Client</h1>
      <form onSubmit={handleSubmit}>
        <label>Client Name:</label>
        <input type="text" name="clientName" value={clientData.clientName || ''} onChange={handleChange} /><br />

        <label>Phone:</label>
        <input type="text" name="phone" value={clientData.phone || ''} onChange={handleChange} /><br />

        <label>Address:</label>
        <input type="text" name="address" value={clientData.address || ''} onChange={handleChange} /><br />

        <label>GST:</label>
        <input type="text" name="gst" value={clientData.gst || ''} onChange={handleChange} /><br />

        <label>Website:</label>
        <input type="text" name="website" value={clientData.website || ''} onChange={handleChange} /><br />

        <label>Email:</label>
        <input type="text" name="email" value={clientData.email || ''} onChange={handleChange} /><br />

        <label>Contact Person:</label>
        <input type="text" name="contactPerson" value={clientData.contactPerson || ''} onChange={handleChange} /><br />

        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={clientData.phoneNumber || ''} onChange={handleChange} /><br />

        <label>Created By:</label>
        <input type="text" name="createdBy" value={clientData.createdBy || ''} onChange={handleChange} /><br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditClient;

