import './App.css'
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"
import React, { useRef } from "react"
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin"
import "@photo-sphere-viewer/virtual-tour-plugin/index.css"

import firstPhoto from "../sphere.jpg"
import secondPhoto from "../sphere2.jpg"
import thirdPhoto from "../sphere3.jpg"

function App() {
  const instanceRef = useRef(null);
  const plugins = [[VirtualTourPlugin, { renderMode: "3d" }]];
  const handleReady = (instance) => {
    instanceRef.current = instance;

    const virtualTour = instanceRef.current.getPlugin(VirtualTourPlugin);
    virtualTour.setNodes([
      {
        id: "1",
        panorama: firstPhoto,
        description: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
        name: "Bergwelt",
        links: [
          { nodeId: "2", position: { textureX: 100, textureY: 1800 } },
          { nodeId: "3", position: { textureX: 3500, textureY: 1800 } }
        ],
        defaultZoomLvl: 0,
      },
      {
        id: "2",
        panorama: secondPhoto,
        name: "Stadt",
        links: [
          { nodeId: "1", position: { textureX: 3500, textureY: 1800 } },
          { nodeId: "3", position: { textureX: 100, textureY: 500 } },
        ],
        defaultZoomLvl: 0,
      },
      {
        id: "3",
        panorama: thirdPhoto,
        name: "BMX",
        links: [
          { nodeId: "1", position: { textureX: 3500, textureY: 1800 } },
          { nodeId: "2", position: { textureX: 3000, textureY: 1800 } },
        ],
        defaultZoomLvl: 0,
      },
    ]);
  };

  return (
  <>
      <ReactPhotoSphereViewer
        src={firstPhoto}
        plugins={plugins}
        height="90vh"
        width="90vw"
        onReady={handleReady}
      ></ReactPhotoSphereViewer>
    </>
  )
}

export default App
