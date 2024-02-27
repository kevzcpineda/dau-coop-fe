import React from 'react';
import '../pdf/styles/dailyDues.css';

const DailyDuesPdf = React.forwardRef((props, ref) => {
  console.log('data', props.data);
  const operator = props.data.daily_dues.filter(
    (item) => item.member_status === 'OPERATOR'
  );
  const associateOperator = props.data.daily_dues.filter(
    (item) => item.member_status === 'ASSOCIATE_OPERATOR'
  );
  const driver = props.data.daily_dues.filter(
    (item) => item.member_status === 'DRIVER'
  );
  const subDriver = props.data.daily_dues.filter(
    (item) => item.member_status === 'SUBTITUTE_DRIVER'
  );

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
                {operator &&
                  operator.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${item.last_name} ${item.first_name}`}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className='table2'>
            <h1>ASSOCIATE OPERATOR</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {associateOperator &&
                  associateOperator.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${item.last_name} ${item.first_name}`}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className='table3'>
            <h1>REGULAR DRIVER</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {driver &&
                  driver.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${item.last_name} ${item.first_name}`}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className='table4'>
            <h1>SUBTITUTE DRIVER</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {subDriver &&
                  subDriver.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${item.last_name} ${item.first_name}`}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
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
            <td>{props.data.management_fee}</td>
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
            <td>BARKERS SAVINGS</td>
            <td>{props.data.barker_savings}</td>
          </tr>
          <tr>
            <td>BARKERS BOUNDARY</td>
            <td>{props.data.barker_boundary}</td>
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
