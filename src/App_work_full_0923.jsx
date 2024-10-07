import "./App.css";
import React, { useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MapPlugin } from "@photo-sphere-viewer/map-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/map-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import mapImage from "../images/map.png";
import outsidemapImage from "../images/outsidemap.png";
import markerImage from "../images/assets/marker.png";
import firstPhoto from "../sphere.jpg";
import secondPhoto from "../sphere2.jpg";
import thirdPhoto from "../sphere3.jpg";
import room1257 from "../images/geb1/Zimmer1257.jpg";

function App() {
  const instanceRef = useRef(null);
  const plugins = [
    [
      MapPlugin,
      {
        imageUrl: mapImage,
        center: { x: 540, y: 160 },
        position: "top right",
        visibleOnLoad: true,
      },
    ],
    [
      VirtualTourPlugin,
      {
        renderMode: "3d",
        positionMode: "gps",
      },
    ],
    [
      MarkersPlugin,
      {
        gotoMarkerSpeed: "6rpm",
      },
    ],
  ];
  const language = "lang: {fullscreen: 'Vollbildschirm'}";
  const handleReady = (instance) => {
    instanceRef.current = instance;

    const mapPlugin = instanceRef.current.getPlugin(MapPlugin);
    const markerPlugin = instanceRef.current.getPlugin(MarkersPlugin);
    const virtualTour = instanceRef.current.getPlugin(VirtualTourPlugin);
    virtualTour.setNodes([
      {
        id: "1",
        panorama: firstPhoto,
        name: "Bergwelt",
        shpereCorrection: { pan: 1, tilt: 1, roll: 1 },
        links: [
          { nodeId: "2", gps: [9.07586, 47.095955] },
          { nodeId: "3", gps: [9.120969, 47.092184] },
          { nodeId: "4" },
        ],
        gps: [9.093817, 47.089491],
      },
      {
        id: "2",
        panorama: secondPhoto,
        name: "Stadt",
        links: [{ nodeId: "1" }, { nodeId: "3" }, { nodeId: "4" }],
        gps: [9.07586, 47.095955],
      },
      {
        id: "3",
        panorama: thirdPhoto,
        name: "Fronalpstock",
        gps: [9.108767, 47.068695, 2124],
        markers: [
          {
            id: "circle",
            circle: 20,
            gps: [9.108767, 47.068695, 2125],
            tooltip: "Gipfel 2124müm",
          },
        ],
        links: [
          {
            nodeId: "1",
          },
          {
            nodeId: "2",
          },
          {
            nodeId: "4",
          },
        ],
        defaultZoomLvl: 0,
      },
      {
        id: "4",
        panorama: room1257,

        name: "Zimmer 1.257",
        links: [{ nodeId: "1" }, { nodeId: "2" }, { nodeId: "3" }],
        gps: [10.127586, 47.095955],
        markers: [
          {
            id: "image",
            position: { yaw: -1.2, pitch: -0.09 },
            image: markerImage,
            size: { width: 32, height: 32 },
            anchor: "bottom center",
            zoomLvl: 100,
            tooltip: "Dozentenpult. <b>Click me!</b>",
            content:
              "<h1>Dozentenpult</h1><p>Dies ist das Dozentenpult. Es handelt sich um einen höhenverstellbaren Schreibtisch mit Kabelinstallationen für Strom und Beameranschluss.</p>",
          },
        ],
      },
    ]);
    virtualTour.addEventListener("node-changed", ({ node, data }) => {
      if (node.id == 1) {
        mapPlugin.setImage(mapImage, { x: 540, y: 160 });
      } else if (node.id == 2) {
        mapPlugin.setImage(mapImage, { x: 675, y: 596 });
      } else if (node.id == 3) {
        mapPlugin.setImage(outsidemapImage, { x: 836, y: 437 });
      } else if (node.id == 4) {
        mapPlugin.setImage(mapImage, { x: 644, y: 467 });
      }
    });
  };

  return (
    <>
      <ReactPhotoSphereViewer
        src={firstPhoto}
        container="viewer"
        plugins={plugins}
        height="100vh"
        width="100vw"
        lang={language}
        onReady={handleReady}
      ></ReactPhotoSphereViewer>
    </>
  );
}

export default App;
