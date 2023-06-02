/* eslint-disable no-shadow */
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const defaultMovingAssetDatsa = [
  { name: "total", value: 100, color: "#000" },
  { name: "movingAsset", value: 0, color: "#00ff00" },
];
const defaultStoppedAssetData = [
  { name: "total", value: 100, color: "#000" },
  { name: "stoppedAsset", value: 0, color: "#ff0000" },
];
const cx = 150;
const cy = 200;
const iR = 10;
const oR = 50;
const value = 500;

const AssetSpeedograph = (props: any) => {
  const { summaryData } = props;

  const [movingAssetData, setMovingAssetData] = useState(
    defaultMovingAssetDatsa
  );
  const [stoppedAssetData, setStoppedAssetData] = useState(
    defaultStoppedAssetData
  );
  useEffect(() => {
    if (summaryData) {
      const totalAsset = Number(summaryData.totalassets);
      const movingAsset = Number(summaryData.movingcount);
      const stoppedAsset = Number(summaryData.stoppedcount);

      if (movingAsset && totalAsset) {
        const totalAssetValue = totalAsset - movingAsset;

        const newData = defaultMovingAssetDatsa.map((item) => {
          return { ...item };
        });
        newData[0].value = totalAssetValue;
        newData[1].value = movingAsset;

        setMovingAssetData(newData);
      } else {
        setMovingAssetData([...defaultMovingAssetDatsa]);
      }

      if (stoppedAsset && totalAsset) {
        const totalAssetValue = totalAsset - stoppedAsset;

        const newData = defaultStoppedAssetData.map((item) => {
          return { ...item };
        });
        newData[0].value = totalAssetValue;
        newData[1].value = stoppedAsset;

        setStoppedAssetData(newData);
      } else {
        setStoppedAssetData([...defaultStoppedAssetData]);
      }
    } else {
      setMovingAssetData([...defaultMovingAssetDatsa]);
      setStoppedAssetData([...defaultStoppedAssetData]);
    }
  }, [summaryData]);

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={-40}
        endAngle={220}
        data={stoppedAssetData}
        cx={cx}
        cy={cy}
        innerRadius={60}
        outerRadius={100}
        fill="#000"
        stroke="none"
        isAnimationActive={false}
      >
        {stoppedAssetData.map((entry, index) => (
          <Cell key={`cellStopped-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Pie
        dataKey="value"
        startAngle={-40}
        endAngle={220}
        data={movingAssetData}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#000"
        stroke="none"
        isAnimationActive={false}
      >
        {movingAssetData.map((entry, index) => (
          <Cell key={`cellMoving-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default AssetSpeedograph;
