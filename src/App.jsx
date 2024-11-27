import "./App.css";
import React, { useRef, useEffect, useState } from "react";

// Import PhotoSphereViewer Modules
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MapPlugin } from "@photo-sphere-viewer/map-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/map-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

// Import AFrame Modules
import "aframe";

// Import Images
import mapImage from "../images/map.png";
import outsidemapImage from "../images/outsidemap.png";
import markerImage from "../images/assets/marker_ost.svg";
import startingimage from "../images/startbild.jpg";

// Gebäude 1
import geb1_eg_gang_03_01 from "../images/geb1/eg/eg_00022.jpg";
import geb1egentry01 from "../images/geb1/eg/eg_00023.jpg";
import geb1eglab3denter from "../images/geb1/eg/eg_00034.jpg";
import geb1eglab3d from "../images/geb1/eg/eg_00036.jpg";
import geb1s1intcorner from "../images/geb1/geb1s1intcorner.jpg";
import geb1egentry3side from "../images/geb1/eg/eg_00006.jpg";
import geb1egentry8side from "../images/geb1/eg/eg_00012.jpg";

// Image preview
import geb1egentry01_preview from "../images/preview/Eingang1_1_preview.png";
import geb1egentry08_preview from "../images/preview/Eingang1_8_preview.png";
import geb1_gang_EG_south_west_preview from "../images/preview/EG_Gang_Geb1_preview.png";
import geb1_3D_LAB_preview from "../images/preview/3D_LAB_preview.png";
import geb1_3D_LAB_printer_preview from "../images/preview/3D_LAB_printer_preview.png";
import Caffeteria_international_Geb1_OG1_preview from "../images/preview/Caffeteria_international_Geb1_OG1_preview.png";

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
        y: 550,
        id: "hsp_geb1_3sideenter",
        color: "blue",
        tooltip: "Gebäude 1 Hintereingang",
    },
    {
        x: 762,
        y: 450,
        id: "hsp_geb1_8sideenter",
        color: "blue",
        tooltip: "Gebäude 1 Seiteneingang",
    },
];

const VRScene = () => {
    return (
        <div>
            <a-scene embedded vr-mode-ui="enabled: true">
                <a-sky src={startingimage} rotation="0 -130 0"></a-sky>
                <a-entity camera position="0 1.6 0" look-controls></a-entity>
                <a-entity laser-controls="hand: right"></a-entity>
            </a-scene>
        </div>
    );
};

function App() {
    const [vrMode, setVrMode] = useState(false);
    useEffect(() => {
        const modifyVrButton = () => {
            const vrButton = document.querySelector(".a-enter-vr-button");

            if (vrButton) {
                vrButton.classList.add("b-enter-vr-button");
                vrButton.innerText = "Start VR";
                vrButton.classList.remove("a-enter-vr-button");
            }
        };
        setTimeout(modifyVrButton, 1000);
    }, []);

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
                // Geb 1 Entry nearby 3D-LAB
                id: "1",
                panorama: geb1egentry01,
                thumbnail: geb1egentry01_preview,
                gps: [8.817212, 47.223637],
                name: "Geb1 Eingang",
                // links: {3D-Lab}, {Gang}, {Exit Geb8}, {Cafeteria}
                links: [
                    { nodeId: "2" },
                    { nodeId: "4" },
                    { nodeId: "6" },
                ],
                sphereCorrection: { pan: '-60deg' },
                markers: [
                    {
                        id: "3dlab",
                        position: { yaw: -1.9, pitch: -0.09 },
                        image: markerImage,
                        size: { width: MARKER_SIZE, height: MARKER_SIZE },
                        anchor: "bottom center",
                        zoomLvl: 100,
                        tooltip: "3D - Lab <b>Click me!</b>",
                        content:
                            "<h1>3D - Lab</h1><p id='infotext'>Bereits von aussen gut sichtbar befindet sich das OST 3D-Lab direkt am Eingang von Gebäude 1. Ausgestattet mit sechs FDM-Druckern der Marke Bambu Lab (wenn nötig, kann auf die Nennung der Marke verzichtet werden), bietet das Labor den Studierenden die Möglichkeit, jederzeit eigene 3D-Druckprojekte zu realisieren. Egal, ob für Prototypen oder private Projekte – das OST 3D-Lab verfügt über eine breite Auswahl an Filamenten, Werkzeugen und einen eigenen Rechner zum Slicen und Bearbeiten der 3D-Modelle. Neu ist die Möglichkeit, Druckaufträge auch remote von zu Hause auszustarten und den Fortschritt bequem über die integrierten Kameras der Drucker zu überwachen. Zusätzlich stehen den Studierenden zwei 3D-Scanner zur Verfügung, um komplexe Geometrien direkt vor Ort einzuscannen und in virtuelle Modelle zu verwandeln. </p>",
                        data: {
                            map: {
                                distance: 10,
                                size: 25,
                                image: markerImage,
                            },
                        },
                    },
                ],
            },
            {
                //3D LAB
                id: "2",
                panorama: geb1eglab3denter,
                thumbnail: geb1_3D_LAB_preview,
                gps: [8.817325, 47.223767],
                name: "3D LAB",
                sphereCorrection: { pan: '100deg' },
                // links: {Exit Trainstation}, {3D-LAB-printer}
                links: [{ nodeId: "1" }, { nodeId: "3" }],
            },
            {
                //Geb1 3D LAB Backside
                id: "3",
                panorama: geb1eglab3d,
                thumbnail: geb1_3D_LAB_printer_preview,
                gps: [8.817326, 47.223784],
                name: "3D LAB",
                sphereCorrection: { pan: '-90deg' },
                // links: {3D-LAB}
                links: [{ nodeId: "2" }],
            },
            {
                id: "4",
                panorama: geb1_eg_gang_03_01,
                thumbnail: geb1_gang_EG_south_west_preview,
                gps: [8.817388, 47.223698],
                name: "Gang zwischen Eingang- Süd und West",
                // links {Exit Trainstation} {Exit Geb8}
                links: [{ nodeId: "1" }, { nodeId: "5" }],
            },
            {
                // Geb1 entry neary Geb8
                id: "5",
                panorama: geb1egentry8side,
                thumbnail: geb1egentry08_preview,
                gps: [8.818058, 47.223184],
                name: "Gebäude 1 Eingang von Gebäude 8",
                // links: {Exit Trainstation}, {Gang}
                links: [{ nodeId: "1" }, { nodeId: "4" }, { nodeId: "6" }],
                sphereCorrection: { pan: "90deg" },
            },
            {
                id: "6",
                panorama: geb1s1intcorner,
                thumbnail: Caffeteria_international_Geb1_OG1_preview,
                gps: [8.81724, 47.22358],
                name: "Cafeteria aus dem International Corner",
                links: [
                    { nodeId: "1" },
                    { nodeId: "5" },
                ],
                //sphereCorrection: { pan: '90deg' },
                markers: [
                    {
                        id: "snackbar",
                        position: { yaw: -0.5, pitch: 0 },
                        image: markerImage,
                        size: { width: MARKER_SIZE, height: MARKER_SIZE },
                        anchor: "bottom center",
                        zoomLvl: 100,
                        tooltip: "Snackbar. <b>Click me!</b>",
                        content:
                            "<h1>Snackbar</h1><p id='infotext'>Die Snackbar im 1. Stock vom Gebäude 1 ist ideal für einen kleinen Snack zwischendurch. Besonders beliebt ist sie jedoch am Morgen für einen Kaffee und ein Gipfeli während der Pausen. Täglich geöffnet von 07:30 bis 15:30 Uhr, bietet sie eine praktische Möglichkeit, sich mit Getränken und kleinen Speisen zu stärken – sei es für einen schnellen Energiekick oder eine entspannte Pause. </p>",
                    },
                ],
            },
            {
                id: "7",
                panorama: geb1egentry3side,
                // TODO: Use a normal image not a 360°
                thumbnail: geb1egentry3side,
                gps: [8.817781, 47.222924],
                name: "Gebäude 1 Eingang von Gebäude 3",
                links: [{ nodeId: "1" }, { nodeId: "5" }],
            },
        ]);

        virtualTour.addEventListener("node-changed", ({ node, data }) => {
            var sky = document.querySelector("a-sky");
            if (node.id == 1) {
                mapPlugin.setImage(mapImage, { x: 566, y: 230 });
                mapPlugin.setHotspots(maphotspotsgeb1);
                sky.setAttribute("src", geb1egentry01);
            } else if (node.id == 2) {
                mapPlugin.setImage(mapImage, { x: 581, y: 218 });
                sky.setAttribute("src", geb1eglab3denter);
            } else if (node.id == 3) {
                mapPlugin.setImage(mapImage, { x: 589, y: 210 });
                sky.setAttribute("src", geb1eglab3d);
            } else if (node.id == 4) {
                mapPlugin.setImage(mapImage, { x: 610, y: 431 });
                sky.setAttribute("src", geb1_eg_gang_03_01);
            } else if (node.id == 5) {
                mapPlugin.setImage(mapImage, { x: 762, y: 450 }, "100deg");
                sky.setAttribute("src", geb1egentry8side);
            } else if (node.id == 6) {
                mapPlugin.setImage(mapImage, { x: 586, y: 322 });
                sky.setAttribute("src", geb1s1intcorner);
            } else if (node.id == 7) {
                mapPlugin.setImage(mapImage, { x: 700, y: 550 });
                sky.setAttribute("src", geb1egentry3side);
            }
        });

        //Hotspot Change

        mapPlugin.addEventListener("select-hotspot", ({ hotspotId }) => {
            console.log(`Clicked on hotspot ${hotspotId}`);
            if (hotspotId == "hsp_geb1_mainenter") {
                virtualTour.setCurrentNode(1);
            } else if (hotspotId == "hsp_geb1_backenter") {
                virtualTour.setCurrentNode(3);
                mapPlugin.clearHotspots();
            } else if (hotspotId == "hsp_geb1_3sideenter") {
                virtualTour.setCurrentNode(7);
            } else if (hotspotId == "hsp_geb1_8sideenter") {
                virtualTour.setCurrentNode(5);
            }
        });

        //Manage Entry Point

        //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_mainenter
        //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_4sideenter
        //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_3sideenter
        //Example: http://ikts.gianhunold.ch/?entrypoint=geb1_8sideenter
        const queryParameters = new URLSearchParams(window.location.search);
        const entrypoint = queryParameters.get("entrypoint");

        if (entrypoint == "geb1_mainenter") {
            virtualTour.setCurrentNode(1);
            startingimage = geb1egentry01;
        } else if (entrypoint == "geb1_4sideenter") {
            virtualTour.setCurrentNode(2);
        } else if (entrypoint == "geb1_3sideenter") {
            virtualTour.setCurrentNode(7);
        } else if (entrypoint == "geb1_8sideenter") {
            virtualTour.setCurrentNode(5);
            startingimage = geb1egentry8side;
        }
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
            <VRScene />
        </>
    );
}

export default App;
