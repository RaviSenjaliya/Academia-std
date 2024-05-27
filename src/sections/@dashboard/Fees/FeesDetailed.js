import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import './fees.css';

export default function FeesDetailed(props) {
  const comPDF = useRef();
  const id = props.userdet;
  const [val, setval] = useState([]);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const storedData = JSON.parse(localStorage.getItem('StudentIn'));
  const fees = storedData.fees;
  const remaining = fees - val.totamt;

  useEffect(() => {
    axios.get(`https://academia-api-cu1m.onrender.com/api/fees/${id}`).then((x) => {
      setval(x.data);
    });
  }, []);
  const PrintPDF = useReactToPrint({
    content: () => comPDF.current,
    documentTitle: 'UserFees',
  });
  return (
    <>
      <Button variant="contained" onClick={PrintPDF}>
        Print
      </Button>
      <div className="body-wrap" ref={comPDF} style={{ width: '100%' }}>
        <table className="w-100">
          <tbody>
            <tr>
              <td className="container" width="100%">
                <div className="content">
                  <table className="main" width="100%" cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td className="content-wrap aligncenter">
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td className="content-block ">
                                  <h3 className="lblinvoice">Invoice</h3>
                                </td>
                              </tr>
                              <tr>
                                <td className="content-block">
                                  <table className="invoice">
                                    <tbody>
                                      <tr>
                                        <td>
                                          {val.name}
                                          <br />
                                          Invoice {val._id}
                                          <br />
                                          {currentDate}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table className="invoice-items" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                              <tr>
                                                <td>Total Fees</td>
                                                <td className="alignright">₹{fees}</td>
                                              </tr>
                                              <tr>
                                                <td>Tuition Fees</td>
                                                <td className="alignright">₹ --</td>
                                              </tr>
                                              <tr>
                                                <td>Examination Fees</td>
                                                <td className="alignright">₹ --</td>
                                              </tr>
                                              <tr>
                                                <td>Miscellaneous Fees</td>
                                                <td className="alignright">₹ --</td>
                                              </tr>

                                              <tr className="total">
                                                <td width="80%">Total Pay</td>
                                                <td className="alignright">₹{val.totamt}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td className="content-block"> © 2023 Academia. All Rights Reserved</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
