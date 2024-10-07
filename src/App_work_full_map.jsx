import './App.css'
import React, { useRef } from "react"
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin"
import { MapPlugin } from "@photo-sphere-viewer/map-plugin"
import "@photo-sphere-viewer/virtual-tour-plugin/index.css"
import "@photo-sphere-viewer/map-plugin/index.css"

import firstPhoto from "../sphere.jpg"
import secondPhoto from "../sphere2.jpg"
import thirdPhoto from "../sphere3.jpg"

function App() {
  const instanceRef = useRef(null);
  const plugins = [
    [MapPlugin, {
      imageUrl: firstPhoto,
      center: { x: 500, y: 500 },
      position: 'top right',
      visibleOnLoad: false
  }],
    [VirtualTourPlugin, { renderMode: "3d", positionMode: 'gps' }]
  ];
  const language = "lang: {fullscreen: 'Vollbildschirm'}";
  const handleReady = (instance) => {
    instanceRef.current = instance;

    const mapPlugin = instanceRef.current.getPlugin(MapPlugin);
    const virtualTour = instanceRef.current.getPlugin(VirtualTourPlugin);
    virtualTour.setNodes([
      {
        id: '1',
        panorama: firstPhoto,
        name: "Bergwelt",
        links: [{ nodeId: '2', gps: [9.07586, 47.095955]}, { nodeId: '3',gps: [9.120969, 47.092184] }],
        gps: [9.093817, 47.089491],
      },
      {
        id: '2',
        panorama: secondPhoto,
        name: "Stadt",
        links: [{ nodeId: '1' }, { nodeId: "3" }],
        gps: [9.07586, 47.095955],
      },
      {
        id: "3",
        panorama: thirdPhoto,
        name: "Fronalpstock",
        gps: [9.120969, 47.092184],
        links: [
          { 
            nodeId: "1"
          },
          { 
            nodeId: "2"
          },
        ],
        defaultZoomLvl: 0,
      },
    ]);
    virtualTour.addEventListener('node-changed', ({ node, data }) => {
      if (node.id == 3) {
        mapPlugin.setCenter({ x: 1000, y: 1000 });
      }
  });
  };

  return (
  <>
      <ReactPhotoSphereViewer
        src={firstPhoto}
        container='viewer'
        plugins={plugins}
        height="90vh"
        width="90vw"
        onReady={handleReady}
        lang= {language}
      ></ReactPhotoSphereViewer>
    </>
  )
}

export default App
