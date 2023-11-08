import React from 'react';
import dauLogo from '../../assets/logo.png';
import userLoan from '../pdf/styles/userLoan.css';

const Paper = React.forwardRef((props, ref) => {
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref} className='user_loan_container'>
        <table className='report-container'>
          <thead className='report-header'>
            <tr>
              <th className='report-header-cell'>
                <div className='header-info'>
                  <div>
                    <img src={dauLogo} className='header_logo' />
                  </div>
                  <div>
                    <h3>DAU OPERATORS AND DRIVERS TRANSPORT COOPERATIVE</h3>
                    <p>
                      # 7110 Room 7 RC Building Mc Arthur Hi-Way Dau Mabalacat
                      City Pampanga
                    </p>
                    <p>CIN - 0102030090</p>
                    <p>Registration / Confirmation No. MLA - C-046</p>
                    <p>Dated March 19, 1991</p>
                    <h3>JANUARY</h3>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className='report-content'>
            <div className='details'>
              <div className='sec1'>
                <p>
                  NAME:
                  {` ${props?.user?.first_name} ${props?.user?.last_name}`}
                </p>
                <p>LOAN GRANTED: {` ${props?.user?.loan}`}</p>
                <p>ADDRESS:{` ${props?.user?.address}`}</p>
                <p>DAILY PAYMENT: none</p>
                <p>DUE DATE: {props?.user?.penalty_date}</p>
              </div>
              <div className='sec2'>
                <p>DATE DRANTED: {` ${props?.user?.date}`}</p>
                <p>INTEREST:{` ${props?.user?.interest}`}</p>
                <p>SERVICE FEE: {` ${props?.user?.service_fee}`}</p>
                <p>TERM OF LOAN: 3</p>
                <p>DATE LAST PAYMENT: none</p>
              </div>
            </div>
            <div className='voucher_section'>
              <p>VOUCHER NUMBER: {props?.user?.voucher_number}</p>
              <p>CHECK NUMBER: {props?.user?.check_number}</p>
              <p>
                PROMISSORY NOTE NUMBER: {props?.user?.promissory_note_number}
              </p>
            </div>
            <table className='loan_payments_table'>
              <tr className='loan_payments_table_tr'>
                <th className='loan_payments_table_th'>Date Payments</th>
                <th className='loan_payments_table_th'>CR number</th>
                <th className='loan_payments_table_th'>Loan granted</th>
                <th className='loan_payments_table_th'>Interest</th>
                <th className='loan_payments_table_th'>Service fee</th>
                <th className='loan_payments_table_th'>Penalty</th>
                <th className='loan_payments_table_th'>Daily Payment</th>
                <th className='loan_payments_table_th'>Peyment</th>
                <th className='loan_payments_table_th'>Loan balance</th>
                <th className='loan_payments_table_th'>Take home</th>
              </tr>
              <tr className='loan_payments_table_tr'>
                <td className='loan_payments_table_td'></td>
                <td className='loan_payments_table_td'></td>
                <td className='loan_payments_table_td'>{props?.user?.loan}</td>
                <td className='loan_payments_table_td'>
                  {props?.user?.interest}
                </td>
                <td className='loan_payments_table_td'>
                  {props?.user?.service_fee}
                </td>
                <td className='loan_payments_table_td'>
                  {props?.user?.penalty}
                </td>
                <td className='loan_payments_table_td'></td>
                <td className='loan_payments_table_td'></td>
                <td className='loan_payments_table_td'>
                  {props?.user?.balance}
                </td>
                <td className='loan_payments_table_td'>
                  {props?.user?.net_amount}
                </td>
              </tr>
              {props?.loanUserPayments?.map((item) => {
                return (
                  <tr className='loan_payments_table_tr'>
                    <td className='loan_payments_table_td'>{item.date}</td>
                    <td className='loan_payments_table_td'>{item.ticket}</td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'>{item.amount}</td>
                    <td className='loan_payments_table_td'></td>
                    <td className='loan_payments_table_td'></td>
                  </tr>
                );
              })}
            </table>
          </tbody>
        </table>
        {/* <div className='header'>
          <div>
            <img src={dauLogo} className='logo' />
          </div>
          <div className='info'>
            <h3>DAU OPERATORS AND DRIVERS TRANSPORT COOPERATIVE</h3>
            <p>
              # 7110 Room 7 RC Building Mc Arthur Hi-Way Dau Mabalacat City
              Pampanga
            </p>
            <p>CIN - 0102030090</p>
            <p>Registration / Confirmation No. MLA - C-046</p>
            <p>Dated March 19, 1991</p>
          </div>
        </div>
        <div className='details'>
          <div className='sec1'>
            <p>
              NAME:
              {` ${props?.user?.first_name} ${props?.user?.last_name}`}
            </p>
            <p>LOAN GRANTED: {` ${props?.user?.loan}`}</p>
            <p>ADDRESS:{` ${props?.user?.address}`}</p>
            <p>DAILY PAYMENT: none</p>
            <p>DUE DATE: {props?.user?.penalty_date}</p>
          </div>
          <div className='sec2'>
            <p>DATE DRANTED: {` ${props?.user?.date}`}</p>
            <p>INTEREST:{` ${props?.user?.interest}`}</p>
            <p>SERVICE FEE: {` ${props?.user?.service_fee}`}</p>
            <p>TERM OF LOAN: 3</p>
            <p>DATE LAST PAYMENT: none</p>
          </div>
        </div>
        <div className='voucher_section'>
          <p>VOUCHER NUMBER: {props?.user?.voucher_number}</p>
          <p>CHECK NUMBER: {props?.user?.check_number}</p>
          <p>PROMISSORY NOTE NUMBER: {props?.user?.promissory_note_number}</p>
        </div>
        <table className='loan_payments_table'>
          <tr>
            <th>Date Payments</th>
            <th>CR number</th>
            <th>Loan granted</th>
            <th>Interest</th>
            <th>Service fee</th>
            <th>Penalty</th>
            <th>Daily Payment</th>
            <th>Peyment</th>
            <th>Loan balance</th>
            <th>Take home</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{props?.user?.loan}</td>
            <td>{props?.user?.interest}</td>
            <td>{props?.user?.service_fee}</td>
            <td>{props?.user?.penalty}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{props?.user?.net_amount}</td>
          </tr>
          {props?.loanUserPayments?.map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.ticket}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{item.amount}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </table> */}
        {/* ref */}
      </div>
    </div>
  );
});

export default Paper;
