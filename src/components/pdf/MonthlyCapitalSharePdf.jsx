import React from 'react';
import '../pdf/styles/monthlyCapitalShare.css';

const MonthlyCapitalSharePdf = React.forwardRef((props, ref) => {
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>monthly</div>
    </div>
  );
});

export default MonthlyCapitalSharePdf;
