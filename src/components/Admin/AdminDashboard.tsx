import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

function AdminDashboard() {
  const [option, setOption] = useState({
   
    title: {
      text: 'Referer of a  Orders',
      subtext: 'Hyde corner Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 5, name: 'Dinner' },
          { value: 2, name: 'Break-fast' },
          { value: 9, name: 'Lunch' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  useEffect(() => {
    
    const chart = echarts.init(document.getElementById('main'));


    chart.setOption(option);

  
    return () => {
      chart.dispose();
    };
  }, [option]);

  return (
    <div>
      <div id="main" style={{ width: 500, height: 300 }} />
    </div>
  );
}

export default AdminDashboard;