import { Rect } from "react-konva";
import { useState } from "react";

import { landType } from "../../utils/consts";
import { getXY } from "../../utils/helpers";

const getColor = (land) => {
  switch (land) {
    case 3:
      return landType[0].color;
    case 2:
      return landType[1].color;
    case 1:
      return landType[2].color;
  }
};
const width = 12;

const LandTile = ({ data, index, setCurrData, eid, setId }) => {
  return (
    <Rect
      key={index}
      x={data.x * width + 500}
      y={-data.y * width + 350}
      width={width * data.size}
      height={width * data.size}
      fill={getColor(data.landType, data.size, index, data.status)}
      shadowBlur={eid === index ? 2 : 0}
      stroke={eid === index ? "#81f78e" : "black"}
      zIndex={eid === index ? 458 : 0}
      strokeWidth={eid === index ? 1 : 0.2}
      onClick={() => {
        setId(index);
        const { calX, calY } = getXY(data.x, data.y);
        setCurrData({
          ...data,
          x: calX,
          y: calY,
          size: data.size > 3 ? data.size / 4 : data.size,
        });
        console.log({ data });
      }}
    />
  );
};

export default LandTile;
