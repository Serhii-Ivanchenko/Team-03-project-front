import css from "./Statistics.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          width: "40px",
          padding: "5px",
          border: "1px solid #ccc",
          position: "absolute",
          left: x,
          top: y - 60,
          transform: "translateX(-50%)",
          color: "#323F47",

          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "700",
          lineWeight: "1.86",
        }}
      >
        <p>{`${payload[0].value} ml`}</p>
      </div>
    );
  }
  return null;
};

export default function Statistics({ monthData, startDay, endDay }) {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(startDay);
  const [endIndex, setEndIndex] = useState(endDay);

  return (
    <div className={css.containerstatistics}>
      <div className={css.areabox}>
        <ResponsiveContainer height={273} className={css.responseContainer}>
          <AreaChart data={monthData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#87D28D" stopOpacity={1} />
                <stop offset="100%" stopColor="#87D28D" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" interval={0} padding={{ right: 10 }} />

            <YAxis
              domain={[0, (dataMax) => dataMax + 20]}
              tickFormatter={(value) => (value / 1000).toFixed(1)}
              width={40}
              label={{ angle: -90, position: "insideLeft" }}
              unit={` ${t("l")}`}
              ticks={[0, 500, 1000, 1500, 2000, 2500]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#87D28D"
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={{
                r: 8,
                fill: "#fff",
                stroke: "#87D28D",
                strokeWidth: "4px",
              }} 
            />

            <Brush
              dataKey="day"
              height={10}
              stroke="#87D28D8"
              travellerWidth={5}
              traveller={{
                stroke: "rgba(50, 63, 71, 0.2)",
                fill: "rgba(50, 63, 71, 0.2)",
              }}
              startIndex={startIndex}
              endIndex={endIndex}
              onChange={(indexRange) => {
                setStartIndex(indexRange.startIndex);
                setEndIndex(indexRange.endIndex);
              }}
            />
          </AreaChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
}
