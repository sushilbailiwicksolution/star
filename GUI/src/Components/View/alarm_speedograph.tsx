/* eslint-disable no-shadow */
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const defaultData = [
  { name: "total", value: 100, color: "#000" },
  { name: "alarms", value: 0, color: "#FFFF00" },
];
const cx = 150;
const cy = 200;
const iR = 10;
const oR = 100;
const value = 500;

const needle = (
  value: any,
  data: any,
  cx: any,
  cy: any,
  iR: any,
  oR: any,
  color: any
) => {
  let total = 0;
  data.forEach((v: any) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const AlarmSpeedograph = (props: any) => {
  const { summaryData } = props;

  const [alarmsData, setAlarmData] = useState(defaultData);

  useEffect(() => {
    if (summaryData) {
      const totalAlarms = Number(summaryData.totalevents);
      const alarms = Number(summaryData.totalalarms);
      if (alarms && totalAlarms) {
        const totalAlarmValue = totalAlarms - alarms;

        const newData = defaultData.map((item) => {
          return { ...item };
        });
        newData[0].value = totalAlarmValue;
        newData[1].value = alarms;

        setAlarmData(newData);
      } else {
        const data = [...defaultData];
        setAlarmData(data);
      }
    } else {
      setAlarmData([...defaultData]);
    }
  }, [summaryData]);

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={-40}
        endAngle={220}
        data={alarmsData}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
        isAnimationActive={false}
      >
        {alarmsData.map((entry, index) => (
          <Cell key={`cellAlarm-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {/* {needle(value, data, cx, cy, iR, oR, "#d0d000")} */}
    </PieChart>
  );
};

export default AlarmSpeedograph;
