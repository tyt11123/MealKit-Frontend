import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import Button from 'react-bootstrap/Button';

import "./ExportReactCSV.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

export const ExportReactCSV = ({ csvData }) => {
    const [modal, setModal] = useState(false);
    const [fileName, setFileName] = useState('');
    const extension = ".csv";
    const toggle = () => {
      if (modal) {
        setModal(false);
      } else {
        setModal(true);
      }
    };
    return (
        <div>
            <Button variant="warning" onClick={toggle}>
                Export
            </Button>
            <Modal
                isOpen={modal}
                onRequestClose={toggle}
                contentLabel="Shopping Categories"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            >
                <div className="mymodal_title">
                    <h1>Export</h1>
                </div>
                <br />
                <div>Enter File Name:&nbsp;</div>
                <input type="text" onChange={(e)=>setFileName(e.target.value)} />
                {
                fileName ? 
                <div>
                <CSVLink data={csvData} filename={`${fileName}${extension}`}>
                    <Button variant="warning">Export</Button>
                </CSVLink>
                </div> : 
                <div><Button disabled variant="secondary">Save</Button></div>
                }
            </Modal>
        </div>
        )
}


//NOT WORKING FYI
// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';

// export const ExportCSV = ({ csvData, fileName }) => {
//     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     const fileExtension = '.xlsx';

//     const exportToCSV = (csvData, fileName) => {
//         const ws = XLSX.utils.json_to_sheet(csvData);
//         const wb = { Sheets: { 'data': ws }, SheetsNames: ['data'] };
//         const excelBuffer = XLSX.write(wb, { bookType: 'xslx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: fileType });
//         FileSaver.saveAs(data, fileName + fileExtension);

//     }
//     return (
//         <Button variant="warning" onClick={(e)=> exportToCSV(csvData,fileName)}>Export</Button>
//     )
// }