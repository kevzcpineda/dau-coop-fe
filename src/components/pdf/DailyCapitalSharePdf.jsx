import React from 'react';
import '../pdf/styles/dailyCapitalShare.css';
import dauLogo from '../../assets/logo.png';
const DailyCapitalSharePdf = React.forwardRef(
  ({ operator, totalOperator }, ref) => {
    return (
      <div style={{ display: 'none' }}>
        <div ref={ref}>
          <div className='daily_header'>
            <div>
              <img src={dauLogo} className='daily_logo' />
            </div>
            <div className='daily_info'>
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
          <div className='daily_content'>
            <h1 className='month_title'>JANUARY 2023</h1>
            <table className='daily_table'>
              <tr className='table_header'>
                <th className='px3'>NO.</th>
                <th>Name</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>19</th>
                <th>20</th>
                <th>21</th>
                <th>22</th>
                <th>23</th>
                <th>24</th>
                <th>25</th>
                <th>26</th>
                <th>27</th>
                <th>28</th>
                <th>29</th>
                <th>30</th>
                <th>31</th>
                <th>MNGT FEE</th>
                <th>SHARE CAPITAL</th>
              </tr>
              <h1>OPERATOR</h1>
              {operator &&
                operator?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className='px3'>{index}</td>
                        <td>{`${item.last_name} ${item.first_name}`}</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td>100</td>
                        <td>200</td>
                      </tr>
                    </>
                  );
                })}

              <tr className='tr_total'>
                <td></td>
                <td>TOTAL</td>
                <td>{totalOperator?.day1_total}</td>
                <td>{totalOperator?.day2_total}</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td>100</td>
                <td>200</td>
              </tr>
              <h1>ASSOCIATE OPERATOR</h1>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default DailyCapitalSharePdf;
