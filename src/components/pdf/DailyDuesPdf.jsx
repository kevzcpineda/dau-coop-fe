import React from 'react';
import '../pdf/styles/dailyDues.css';

const DailyDuesPdf = React.forwardRef((props, ref) => {
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>
        <div className='daily_dues_report_container'>
          <div className='table1'>
            <h1>REGULAR OPERATOR</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='table2'>
            <h1>REGULAR OPERATOR</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='table3'>
            <h1>REGULAR OPERATOR</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='table4'>
            <h1>REGULAR OPERATOR</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>kevin chester</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className='total_table'>
          <tr>
            <td>Date</td>
            <td>{props.data.date}</td>
          </tr>
          <tr>
            <td>SHARE CAPITAL</td>
            <td>{props.data.share_capital}</td>
          </tr>
          <tr>
            <td>MANAGEMENT FEE</td>
            <td>{props.data.management_fee}</td>
          </tr>
          <tr>
            <td>SUB DRIVER</td>
            <td>{props.data.sub_driver}</td>
          </tr>
          <tr>
            <td>SUB SAVINGS</td>
            <td>{props.data.sub_savings}</td>
          </tr>
          <tr>
            <td>TOTAL</td>
            <td>{props.data.total}</td>
          </tr>
        </table>
      </div>
    </div>
  );
});

export default DailyDuesPdf;
