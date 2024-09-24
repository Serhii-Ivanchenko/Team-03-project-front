import css from "./Statistics.module.css"
import { useState } from "react";
import {AreaChart,Brush,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ResponsiveContainer
} from 'recharts';

const data = [
        {
            date: "1",
            value: 685
        },
        {
            date: "2",
            value: 500
        },
        {
            date: "3",
            value: 550
        },
        {
            date: "4",
            value: 1000
        },
        {
            date: "5",
            value: 1200
        },
        {
            date: "6",
            value: 900
        },
        {
            date: "7",
            value: 1700
        },
        {
            date: "8",
            value: 490
        },
        {
            date: "9",
            value: 1300
        },
        {
            date: "10",
            value: 1500
        },
        {
            date: "11",
            value: 1110
        },
        {
            date: "12",
            value: 1600
        },
        {
            date: "13",
            value: 1260
        },
        {
            date: "14",
            value: 1300
        },
        {
            date: "15",
            value: 1400
        },
        {
            date: "16",
            value: 1600
        },
        {
            date: "17",
            value: 1000
        },
        {
            date: "18",
            value: 900
        },
        {
            date: "19",
            value: 0
        },
        {
            date: "20",
            value: 0
        },
        {
            date: "21",
            value: 0
        },
        {
            date: "22",
            value: 0
        },
        {
            date: "23",
            value: 0
        },
        {
            date: "24",
            value: 0
        },
        {
            date: "25",
            value: 0
        },
        {
            date: "26",
            value: 0
        },
        {
            date: "27",
            value: 0
        },
        {
            date: "28",
            value: 0
        },
        {
            date: "29",
            value: 0
        },
        {
            date: "30",
            value: 0
        }
    ]
;

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate; 

    return (
      <div
        className="custom-tooltip"
        style={{
            backgroundColor: '#fff',
            width: '40px',
          padding: '5px',
          border: '1px solid #ccc',
          position: 'absolute',
          left: x, 
          top: y - 60, 
            transform: 'translateX(-50%)',
          color: '#323F47',

fontSize: '12px',
fontStyle: 'normal',
fontWeight: '700',
lineWeight: '1.86',
        }}
      >
        <p>{`${payload[0].value} ml`}</p> 
      </div>
    );
  }
  return null;
};

export default function Statistics({ monthData, startDay, endDay }) {

const [startIndex, setStartIndex] = useState(startDay);
    const [endIndex, setEndIndex] = useState(endDay); 

  
// , overflowX: 'scroll'
    return (<div className={css.containerstatistics}
        style={{ width: '100%' }}>
        <div className={css.areabox}
            style={{ width: '100%' }}> 

            <ResponsiveContainer width="100%" height={273} className={css.responseContainer }  >
                <AreaChart data={monthData}

         > 

            <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87D28D" stopOpacity={1} />
            <stop offset="100%" stopColor="#87D28D" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" /> 

                    <XAxis dataKey="day" interval={0} /> 
                    
                    <YAxis domain={[0, 2500]} tickFormatter={(value) => (value / 1000).toFixed(1)}
                         width={40}
                        label={{ angle: -90, position: 'insideLeft' }} unit={' L'}
                        ticks={[0, 500, 1000, 1500, 2000, 2500]}
                     />
                    
  <Tooltip content={<CustomTooltip />} />
                  

                        <Area
          type="monotone"
          dataKey="value"
                        stroke="#87D28D"
                        strokeWidth={3}
          fill="url(#colorGradient)" 
                 dot={{ r: 8, fill: '#fff', stroke: '#87D28D', strokeWidth: '4px' }} // Полностью закрашенные кружочки
        //   label={({ x, y, value }) => (
        //     <text x={x} y={y - 10} fill="#000" textAnchor="middle">
        //       {`${value} ml`} {/* Добавляем "ml" к значению */}
        //     </text>
        //   )}        

        
      
                    />
{/* 
                    <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          startIndex={startIndex}
          endIndex={data.length - 1}
          onChange={(indexRange) => setStartIndex(indexRange.startIndex)}
        /> */}
       
                    
 <Brush
                        dataKey="day"
           height={10}
                        stroke="#87D28D8"
                         travellerWidth={5} // Ширина ползунка
          traveller={{ stroke: 'rgba(50, 63, 71, 0.2)', fill:'rgba(50, 63, 71, 0.2)' }}
          startIndex={startIndex}
          endIndex={endIndex}
          onChange={(indexRange) => {
            setStartIndex(indexRange.startIndex);
            setEndIndex(indexRange.endIndex);
          }}
        />

                </AreaChart> </ResponsiveContainer> </div> </div>);
}

;


