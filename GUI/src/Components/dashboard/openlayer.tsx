// import './App.css';

// react
import React, { useState, useEffect } from 'react';

/**
 * This component is responsible for handling map actions using OpenLayers.
 * @component
 */

function App() {
  
  // set intial state
  const [ features, setFeatures ] = useState([])

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock 
  //  GeoJson API (read from flat .json file in public directory)
  
  return (
    <div className="App">
      
      <div className="app-label">
        <p>React Functional Components with OpenLayers Example</p>
        <p>Click the map to reveal location coordinate via React State</p>
      </div>
      

    </div>
  )
}

export default App;