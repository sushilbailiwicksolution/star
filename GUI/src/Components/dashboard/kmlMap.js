import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

var map = ''
var dataLayer = ''

/**
 * This component is handling map type selection.
 * @component
 */
class mapSelection extends Component  {
    constructor(props){
        super(props)
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        let map;
        let src = 'https://stardev-38337.web.app/KML_Samples.kml';
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: new window.google.maps.LatLng(-19.257753, 146.823688),
            zoom: 3,
            mapTypeId: 'terrain'
          });
  
          var kmlLayer = new window.google.maps.KmlLayer(src, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
          });
        //   kmlLayer.addListener('click', function(event) {
        //     var content = event.featureData.infoWindowHtml;
        //     var testimonial = document.getElementById('capture');
        //     testimonial.innerHTML = content;
        // });
    }

    // onScriptLoad_OLD() {
    //     // CREATE YOUR GOOGLE MAPS
    //     map = new window.google.maps.Map(
    //       document.getElementById('map'),
    //        {
    //             // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
    //             center: { lat: 50.5, lng: 4 },
    //             zoom: 8,
    //             gestureHandling: 'greedy',
    //             disableDefaultUI: true,
    //         });
    // }
    // dataHandler = (getJson) => {
    //     // FIRST I REMOVE THE CURRENT LAYER (IF THERE IS ONE)
    //     for (var i = 0; i < dataLayer.length; i++) {
    //         map.data.remove(dataLayer[i])
    //     }
    //     // THEN I FETCH MY JSON FILE, IN HERE I'M USING A PROP BECAUSE 
    //     // I WANT TO USE THIS DATAHANDLER MULTIPLE TIMES & DYNAMICALLY 
    //     // I CAN NOW DO SOMETHING LIKE THIS: 
    //     // onClick(this.dataHandler(www.anotherlinktojsonfile.com/yourjsonfile.json))
    //     // ON EACH BUTTON AND CHOOSE WHICH JSON FILE NEEDS TO BE FETCHED IN MY DATAHANDLER.
    //     fetch(getJson)
    //         .then(response => response.text())
    //         .then(featureCollection => {
    //             dataLayer = map.data.addGeoJson(featureCollection)
    //             // ADD SOME NEW STYLE IF YOU WANT TO
    //             map.data.setStyle({strokeWeight: 0.5, fillOpacity: 0 });
    //         }
    //         );
    //     // map.data.addListener('mouseover', (event) => {
    //     //     map.data.revertStyle();
    //     //     // ADD A STYLE WHEN YOU HOVER OVER A SPECIFIC POLYGON
    //     //     map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.1 });
    //     //     // IN CONSOLE LOG, YOU CAN SEE ALL THE DATA YOU CAN RETURN
    //     //     console.log(event.feature)
    //     // });
    //     // map.data.addListener('mouseout', (event) => {
    //     //     // REVERT THE STYLE TO HOW IT WAS WHEN YOU HOVER OUT
    //     //     map.data.revertStyle();
    //     // });
    // }
    componentDidMount() {
        setTimeout(() => {
            this.onScriptLoad();
        }, 1000);
        
        // // LOADING THE GOOGLE MAPS ITSELF
        // if (!window.google) {
        //   var s = document.createElement('script');
        //   s.type = 'text/javascript';
        //   s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyB2HahvLvDI0KcditUKBizQtAyvwm2lhAY';
        //   var x = document.getElementsByTagName('script')[0];
        //   x.parentNode.insertBefore(s, x);
        //   // Below is important. 
        //   //We cannot access google.maps until it's finished loading
        //   s.addEventListener('load', e => {
        //     this.onScriptLoad()
        //     // this.dataHandler('http://127.0.0.1:8887/KML_Samples.kml')

        //   })
        // } else {
        //   this.onScriptLoad()
        // }
    }
    render () {
        return (
            <div id='mapContainer'>
                <div style={{ width: '100%', height: 'calc(100vh - 80px)', overflow: 'hidden', float: 'left', border: 'thin solid #333' }} id='map' />
            </div>
        );
    }
};

// export default mapSelection;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8'
  })(mapSelection);