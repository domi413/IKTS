import './App.css'
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"
import React from "react"

function App() {
  return (
    <>
      <div className="App">
     <ReactPhotoSphereViewer
        src="sphere.jpg"
        height="100vh"
        width="100vw"
      ></ReactPhotoSphereViewer>
      </div>
    </>
  )
}

export default App
