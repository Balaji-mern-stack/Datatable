import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

function DataTableComp() {
const [details, setDetails] = useState([])
const customStyles = {
	rows: {
		style: {
			minHeight: '72px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
            backgroundColor:"green",
            color:"white"
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => 
        {
            console.log(json)
            setDetails(json)
        })
},[])
    
const columns = [{
    name: "USER ID",
    selector : row => row.userId,
    sortable:true
},
{
    name:"TITLE",
    selector: row => row.title
},
{
    name: "Status",
    selector: row => row.completed.toString()
}
]


  return (
    <div>
      <DataTable 
      columns={columns}
      data = {details}
      pagination
      paginationPerPage={5}
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      customStyles={customStyles}
      
      />
    </div>
  )
}

export default DataTableComp
// npm i react-data-table-component