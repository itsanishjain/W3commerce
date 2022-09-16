import { useState } from "react";
import { Stage, Layer } from "react-konva";

import LandTile from "./LandTile";

const scaleBy = 1.1;

const MapCanvas = ({ lands, setCurrData }) => {
  
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const [eid, setId] = useState(0);

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
        <Layer>
          {lands?.map((data, index) => (
            <LandTile
              key={index}
              data={data}
              index={index}
              setCurrData={setCurrData}
              eid={eid}
              setId={setId}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapCanvas;
