import React, { useState, useEffect, } from 'react';
import { Header } from './Header';
import { CustomersList } from './CustomersList';
import { ExportReactCSV } from './ExportReactCSV';
import "./TableExport.css"

const TableExport = (props) => {
  // const [fileName, setFileName] = useState('Customers');
  const [customers, setCustomers] = useState('');

  const createCustomers = () => {
    let custs = [];
    for (let i = 0; i <= 25; i++) {
      custs.push({
        firstName: `first${i}`, lastName: `last${i}`,
        email: `abc${i}@gmail.com`, address: `000${i},street,123`, zipcode: `0000${i}`
      });
    }
    return custs;
  };

  useEffect(() => {
    setCustomers(createCustomers());
    return () => {};
  },[]);

  return (
    <div className="table_export">
    
      <Header />
      <div className="row">
        <div className="col-md-8">
          <h2>Customers</h2>
        </div>
        <div className="col-md-4 center">
          {/* <ExportCSV csvData={this.state.customers} fileName={this.state.fileName} /> */}
          {/* <ExportReactCSV csvData={customers} fileName={fileName} /> */}
          <ExportReactCSV csvData={customers} />
        </div>
      </div>
      <CustomersList customers={createCustomers()} />
      
    </div>

    );
  }
  
  export default TableExport;