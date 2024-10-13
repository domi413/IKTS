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
// import markerImage from "../images/assets/marker.png" // old green marker
import markerImage from "../images/assets/marker_ost.svg";
//import startingimage from "../images/startbild.jpg"; //Update for next sprint
import startingimage from "../images/geb1/geb1entry01.jpg";


//Gebäude 1
import room1257 from "../images/geb1/Zimmer1257.jpg";
import geb1entry01 from "../images/geb1/geb1entry01.jpg";
import geb1entry05 from "../images/geb1/geb1entry05.jpg";
import geb1entry8site from "../images/geb1/geb1entry8site.jpg";

//Gebäude 3
import gang311 from "../images/geb3/geb3ges1gang.jpg";

const MARKER_SIZE = 64;

const maphotspotsgeb1 = [
          {
            x: 566,
            y: 230,
            id: "hsp_geb1_mainenter",
            color: "blue",
            tooltip: "Gebäude 1 Haupteingang",
          },
          {
            x: 462,
            y: 326,
            id: "hsp_geb1_siteenter",
            color: "blue",
            tooltip: "Gebäude 1 Seiteneingang",
          },
          {
            x: 700,
            y: 524,
            id: "hsp_geb1_backenter",
            color: "blue",
            tooltip: "Gebäude 1 Hintereingang",
          },
          {
            x: 762,
            y: 450,
            id: "hsp_geb1_8sideenter",
            color: "blue",
            tooltip: "Gebäude 1 Seiteneingang",
          }
          
        ];

function App() {
  /* //Update for next sprint
  //URL parameters to enable specific entry point
  const queryParameters = new URLSearchParams(window.location.search);
  const entrypoint = queryParameters.get("entrypoint");
  /*if (entrypoint == "geb1_mainenter") {
    startingimage = geb1entry01;
  } else if (entrypoint == "geb1_siteenter") {
  } else if (entrypoint == "geb1_8sideenter") {
    startingimage = geb1entry8site;
  }*/
  const instanceRef = useRef(null);
  const plugins = [
    [
      // Provides a minimap
      MapPlugin,
      {
        imageUrl: mapImage,
        center: { x: 540, y: 160 },
        position: "top right",
        visibleOnLoad: true,
        rotation: "135deg",
        hotspots: maphotspotsgeb1,
      },
    ],
    // Provides navigation arrows
    [
      VirtualTourPlugin,
      {
        renderMode: "3d",
        positionMode: "gps",
      },
    ],
    [
      // Provides markers that you can click on (and will provide further information)
      MarkersPlugin,
      {
        gotoMarkerSpeed: "6rpm",
      },
    ],
  ];

  const navbar = ["zoom", "fullscreen"];

  const handleReady = (instance) => {
    instanceRef.current = instance;

    const mapPlugin = instanceRef.current.getPlugin(MapPlugin);
    const markerPlugin = instanceRef.current.getPlugin(MarkersPlugin);
    const virtualTour = instanceRef.current.getPlugin(VirtualTourPlugin);

    virtualTour.setNodes([
      {
        id: "1",
        panorama: geb1entry01,
        // TODO: Use a normal image not a 360°
        thumbnail: geb1entry01,
        gps: [8.817212, 47.223637],
        name: "Geb1 Eingang",
        links: [{ nodeId: "2" }, { nodeId: "3" }, { nodeId: "4" }, { nodeId: "5" }],
        markers: [
          {
            id: "3dlab",
            position: { yaw: -1.5, pitch: -0.09 },
            image: markerImage,
            size: { width: MARKER_SIZE, height: MARKER_SIZE },
            anchor: "bottom center",
            zoomLvl: 100,
            tooltip: "OST 3DLab. <b>Click me!</b>",
            content:
              "<h1>3D Lab</h1><p>Die OST Rapperswil betreibt ein 3D Lab in welchem 6 3D Drucker zur verfügung stehen um Produkte bzw. Prototypen zu drucken.<br><a href='https://hsr.simplybook.me/v2/' target=_blank'>Termin buchen</a></p>",
              data: {
                map: {
                  distance: 2,
                  size: 25,
                  image: markerImage, 
                }
              }
          },
          {
            id: "peteimer",
            position: { yaw: -2.9, pitch: -0.09 },
            image: markerImage,
            size: { width: MARKER_SIZE, height: MARKER_SIZE },
            anchor: "bottom center",
            zoomLvl: 100,
            tooltip: "Recyclingstation. <b>Click me!</b>",
            content:
              "<h1>Recyclingstation</h1><p>Auf dem ganzen Campus sind Recyclingstationen verteilt, damit verwertbare Materialien nicht im Müll landen.</p>",
            data: {
              map: {
                distance: 2,
                size: 25,
                image: markerImage, 
              }
            }
          },
          {
            id: "golden_pillar",
            position: { yaw: -29.55, pitch: 0.3 },
            image: markerImage,
            size: { width: MARKER_SIZE, height: MARKER_SIZE },
            anchor: "bottom center",
            zoomLvl: 100,
            tooltip: "Goldene Säule. <b>Click me!</b>",
            content:
              "<h1>Goldene Säule</h1><p>Dies ist die goldene Säule. Der Legende zufolge, ist sie ein Dankeschön von Mike Tyson, der ohne ein Sozialwesenstudium an der OST, nicht zu dem erfolgreichen Boxer geworder wäre, der er ist.</p>",
          },
        ],
      },
      {
        id: "2",
        panorama: geb1entry05,
        // TODO: Use a normal image not a 360°
        thumbnail: geb1entry05,
        gps: [8.817283, 47.223761],
        name: "Geb1 Eingang Treppe",
        links: [{ nodeId: "1" }, { nodeId: "3" }, { nodeId: "4" }],
      },
      {
        id: "3",
        panorama: gang311,
        // TODO: Use a normal image not a 360°
        thumbnail: gang311,
        gps: [8.817553, 47.223164],
        name: "Gang Gebäude 3 Stockwerk 1",
        links: [{ nodeId: "1" }, { nodeId: "2" }, { nodeId: "4" }],
      },
      {
        id: "4",
        panorama: room1257,
        // TODO: Use a normal image not a 360°
        thumbnail: room1257,
        gps: [10.127586, 47.095955],
        name: "Zimmer 1.257",
        links: [{ nodeId: "1" }, { nodeId: "2" }, { nodeId: "3" }],
        markers: [
          {
            id: "image",
            position: { yaw: -1.2, pitch: -0.09 },
            image: markerImage,
            size: { width: MARKER_SIZE, height: MARKER_SIZE },
            anchor: "bottom center",
            zoomLvl: 100,
            tooltip: "Dozentenpult. <b>Click me!</b>",
            content:
              "<h1>Dozentenpult</h1><p>Dies ist das Dozentenpult. Es handelt sich um einen höhenverstellbaren Schreibtisch mit Kabelinstallationen für Strom und Beameranschluss.</p>",
          },
        ],
      },
      {
        id: "5",
        panorama: geb1entry8site,
        // TODO: Use a normal image not a 360°
        thumbnail: geb1entry8site,
        gps: [8.818058, 47.223184],
        name: "Gebäude 1 Eingang von Gebäude 8",
        links: [{ nodeId: "1" }, { nodeId: "4" }],
        sphereCorrection: { pan: '90deg' },
      },
    ]);

    virtualTour.addEventListener("node-changed", ({ node, data }) => {
      if (node.id == 1) {
        mapPlugin.setImage(mapImage, { x: 566, y: 230 });
        mapPlugin.setHotspots(maphotspotsgeb1);
      } else if (node.id == 2) {
        mapPlugin.setImage(mapImage, { x: 554, y: 277 });
      } else if (node.id == 3) {
        mapPlugin.setImage(outsidemapImage, { x: 756, y: 628 });
      } else if (node.id == 4) {
        mapPlugin.setImage(mapImage, { x: 610, y: 431 });
      } else if (node.id == 5) {
        mapPlugin.setImage(mapImage, { x: 762, y: 450 }, "100deg");
      }
    });
 
    mapPlugin.addEventListener('select-hotspot', ({ hotspotId }) => {
      console.log(`Clicked on hotspot ${hotspotId}`);
      if (hotspotId == "hsp_geb1_mainenter") {
        virtualTour.setCurrentNode(1);
      } else if (hotspotId == "hsp_geb1_backenter") {
        virtualTour.setCurrentNode(3);
        mapPlugin.clearHotspots();
      } else if (hotspotId == "hsp_geb1_8sideenter") {
        virtualTour.setCurrentNode(5);
      }
    });
    

    //Created for next sprint
    
    //Manage Entry Point

    //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_siteenter 
    //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_8sideenter 
    /*
    if (entrypoint == "geb1_mainenter") {
      virtualTour.setCurrentNode(1);
      //startingimage = geb1entry01;
    } else if (entrypoint == "geb1_siteenter") {
      virtualTour.setCurrentNode(2);
    } else if (entrypoint == "geb1_8sideenter") {
      virtualTour.setCurrentNode(5);
      //startingimage = geb1entry8site;
    }
      */
    
  };

  return (
    <>
      <ReactPhotoSphereViewer
        src={startingimage}
        container="viewer"
        plugins={plugins}
        navbar={navbar}
        height="100vh"
        width="100vw"
        lang={{
          //Default Plugin
          zoom: "Zoom",
          zoomOut: "Verkleinern",
          zoomIn: "Vergrössern",
          moveUp: "Move up",
          moveDown: "Move down",
          moveLeft: "Move left",
          moveRight: "Move right",
          description: "Beschreibung",
          download: "Herunterladen",
          fullscreen: "Vollbildschirm",
          loading: "Lädt...",
          menu: "Menu",
          close: "Schliessen",
          twoFingers: "Use two fingers to navigate",
          ctrlZoom: "Use ctrl + scroll to zoom the image",
          loadError: "The panorama cannot be loaded",
          webglError: "Your browser does not seem to support WebGL",
          //Map Plugin
          map: "Karte",
          mapMaximize: "Maximieren",
          mapMinimize: "Minimieren",
          mapNorth: "Nördlich ausrichten",
          mapReset: "Karte zurücksetzen",
          //Markers Plugin
          markers: "Markers",
          markersList: "Markers list",
        }}
        onReady={handleReady}
      ></ReactPhotoSphereViewer>
    </>
  );
}

export default App;
