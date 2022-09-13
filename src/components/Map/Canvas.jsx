import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { landType } from ".";

const scaleBy = 1.1;

const MapCanvas = ({ lands, setCurrData }) => {
  const [eid, setId] = useState(0);
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    if (newScale < 0.9 || newScale > 1.6) return;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  };

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

  const LandTile = lands?.map((data, index) => {
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
          setCurrData(data);
        }}
      />
    );
  });

  return (
    <div className="bg-blue-300 rounded-md">
      <Stage
        width={(7 * window.innerWidth) / 12}
        height={(13.97 * window.innerHeight) / 15}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        draggable={true}
        dragBoundFunc={({ x, y }) => {
          if (Math.abs(x) <= 400 && Math.abs(y) > 400) {
            y = Math.sign(y) === 1 ? 400 : -400;
          }
          if (Math.abs(x) > 400 && Math.abs(y) <= 400) {
            x = Math.sign(x) === 1 ? 400 : -400;
          }
          if (Math.abs(x) > 400 && Math.abs(y) > 400) {
            x = Math.sign(x) === 1 ? 400 : -400;
            y = Math.sign(y) === 1 ? 400 : -400;
          }
          return { x, y };
        }}
      >
        <Layer>{LandTile}</Layer>
      </Stage>
    </div>
  );
};

export default MapCanvas;
