import React from 'react';
import '../pdf/styles/dailyCapitalShare.css';
import dauLogo from '../../assets/logo.png';
const DailyCapitalSharePdf = React.forwardRef(
  ({ operator, totalOperator }, ref) => {
    const getPerPage = (mydata) => {
      let iterate = 26;
      let arr = [];
      let total = [];
      let endIterate = iterate;
      let startIterate = 0;
      const getIteration = mydata?.length / iterate;

      for (let i = 0; i < getIteration; i++) {
        let sumObject = {};
        let data = mydata?.slice(startIterate, endIterate);
        data.forEach((obj) => {
          for (const key in obj) {
            if (sumObject.hasOwnProperty(key)) {
              sumObject[key] += obj[key];
            } else {
              sumObject[key] = obj[key];
            }
          }
        });
        total.push(sumObject);
        startIterate += iterate;
        endIterate += iterate;
        arr.push(data);
      }
      return { data: arr, total: total };
    };

    const { data, total } = getPerPage(operator);
    console.log('total', total);
    return (
      <div style={{ display: 'none' }}>
        <div ref={ref}>
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
              <tr>
                <td className='report-content-cell'>
                  <div className='main'>
                    {data.map((item, index) => {
                      return (
                        <table key={index}>
                          <tr>
                            <th>id</th>
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
                            <th>Total</th>
                            <th>Opr fee</th>
                            <th>Share cap</th>
                          </tr>
                          {item.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.id}</td>
                                <td>{`${item.last_name} ${item.first_name}`}</td>
                                <td>{item.day1}</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>11</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>111</td>
                                <td>211</td>
                                <td>211</td>
                                <td>111</td>
                                <td>211</td>
                                <td>211</td>
                                <td>211</td>
                                <td>211</td>
                                <td>211</td>
                                <td>311</td>
                                <td>311</td>
                                <td>3000</td>
                                <td>3000</td>
                                <td>3000</td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td></td>
                            <td>Total</td>
                            <td>{total[index].day1}</td>
                            <td>{total[index].day2}</td>
                            <td>{total[index].day3}</td>
                            <td>{total[index].day4}</td>
                            <td>{total[index].day5}</td>
                            <td>{total[index].day6}</td>
                            <td>{total[index].day7}</td>
                            <td>{total[index].day8}</td>
                            <td>{total[index].day9}</td>
                            <td>{total[index].day10}</td>
                            <td>{total[index].day11}</td>
                            <td>{total[index].day12}</td>
                            <td>{total[index].day13}</td>
                            <td>{total[index].day14}</td>
                            <td>{total[index].day15}</td>
                            <td>{total[index].day16}</td>
                            <td>{total[index].day17}</td>
                            <td>{total[index].day18}</td>
                            <td>{total[index].day19}</td>
                            <td>{total[index].day20}</td>
                            <td>{total[index].day21}</td>
                            <td>{total[index].day22}</td>
                            <td>{total[index].day23}</td>
                            <td>{total[index].day24}</td>
                            <td>{total[index].day25}</td>
                            <td>{total[index].day26}</td>
                            <td>{total[index].day27}</td>
                            <td>{total[index].day28}</td>
                            <td>{total[index].day29}</td>
                            <td>{total[index].day30}</td>
                            <td>{total[index].day31}</td>
                            <td>{total[index].total}</td>
                            <td>{total[index].total / 2}</td>
                            <td>{total[index].total / 2}</td>
                          </tr>
                        </table>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className='daily_header'>
            <div>
              <img src={dauLogo} className='daily_logo' />
            </div>
            <div>
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

          <div className='content'>
            <h1 className='month_title'>JANUARY 2023</h1>
          </div> */}
        </div>
      </div>
    );
  }
);

export default DailyCapitalSharePdf;
