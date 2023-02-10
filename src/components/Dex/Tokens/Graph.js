import React from 'react';
import { Line, LineChart, YAxis } from 'recharts';

const Graph = ({ data }) => {
    if (data.length === 0) {
        return <>-</>;
    }
    const data_2 = Object.entries(data).map((data) => {
        return {
            name: new Date(parseInt(data[0])).getHours(),
            pv: data[1],
        };
    });
    const average =
        data_2.reduce((acc, item) => acc + item.pv, 0) / data_2.length;
    const color = average < data_2[data_2.length - 1].pv ? 'green' : 'red';

    return (
        <div className='h-100 d-flex align-items-center w-100 justify-content-center '>
            <div>
                <LineChart width={150} height={50} data={data_2}>
                    <YAxis
                        type='number'
                        tick={false}
                        width={0}
                        axisLine={false}
                        domain={['dataMin', 'dataMax - 0.5']}
                    />
                    <Line
                        type='monotone'
                        dataKey='pv'
                        stroke={color}
                        fillOpacity={1}
                        strokeWidth='1.6px'
                        dot={false}
                        fill='url(#colorbv)'
                    />
                </LineChart>
            </div>
        </div>
    );
};

export default Graph;
