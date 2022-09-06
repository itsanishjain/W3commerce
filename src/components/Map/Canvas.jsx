import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

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

  const getColor = (land, size, id, status) => {
    if (status === "MINTED") return "#00e600";
    else if (status === "BOOKED") {
      return "#b3b300";
    } else if (status === "NOT_FOR_SALE") {
      return "#737373";
    }
    if (land === "LOL" || size === 3) {
      return "#321d70";
    } else if (land === "CITY") {
      return "#d82eee";
    } else if (land === "NEIGHBOUR") {
      return "#a365ef";
    } else if (land === "PREMIUM LAND") {
      return "#f8cdfc";
    } else {
      return "#8a1fae";
    }
  };
  const width = 12;

  //

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
        zIndex={eid === index ? 5000 : -500}
        strokeWidth={eid === index ? 1 : 0.2}
        onClick={() => {
          setId(index);
          setCurrData(data);
        }}
      />
    );
  });

  return (
    <div className="bg-pink-400">
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
