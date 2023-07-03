import React from 'react';
import './styles/loan.css/';

const LoanReportPdf = React.forwardRef((props, ref) => {
  console.log(props.data);
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref} className='loan_container'>
        <div className='loan_left'>
          <table className='loan_table'>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>RECEIPT NO</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>PENALTY</th>
            </tr>
            {props?.data?.payments.map((item, index) => {
              if (index <= 29) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${item.last_name} ${item.first_name}`}</td>
                    <td>{item.ticket}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>{item.penalty}</td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
        <div className='loan_right'>
          <table className='loan_table'>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>RECEIPT NO</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>PENALTY</th>
            </tr>
            {props?.data?.payments.map((item, index) => {
              if (index >= 30) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${item.last_name} ${item.first_name}`}</td>
                    <td>{item.ticket}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>{item.penalty}</td>
                  </tr>
                );
              }
            })}
          </table>
          <table className='total_loan_report'>
            <tr>
              <td>Date Deposit {props?.data?.date}</td>
              {/* <td>12312</td> */}
            </tr>
            <tr>
              <td>Total {props?.data?.total}</td>
              {/* <td>12312</td> */}
            </tr>
            <tr>
              <td>Prepare by: Arnaldo C. Pineda</td>
              {/* <td>12312</td> */}
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
});

export default LoanReportPdf;
