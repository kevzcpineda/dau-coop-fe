import React from 'react';
import dauLogo from '../../assets/logo.png';
import userLoan from '../pdf/styles/userLoan.css'

const Paper = React.forwardRef((props, ref) => {
  console.log("Paper")
  // console.log(props?.loanUserPayments);
  console.log(props?.user);
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref} className="user_loan_container">
        <div className='header'>
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
        {props.loanUserPayments &&
          props?.loanUserPayments?.map((item) => {
            return <p key={item.id}>{item?.amount}</p>;
          })}
        {/* ref */}
      </div>
    </div>
  );
});

export default Paper;
