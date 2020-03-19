// let pos;

// const positionget = (position) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     pos = [lat,lon];
// }
// const geterror = () => console.log("can not get error");
// navigator.geolocation.getCurrentPosition(positionget,geterror);

// const setThePos =    
//     setInterval(() => {
//     if(pos) {
//         clearInterval(setThePos);
//         console.log(pos);
//     }
// },100 );


    var selectedShape;

    function selectShape (shape) {
        console.log(shape);
        selectedShape = shape;
    
    }
    
    function deleteShape () {
        if(selectedShape) {
            selectedShape.setMap(null);
        }
    }
    function removeSelection () {
        if(selectedShape) {
            selectedShape = null;
        }
    }
    
    function initMap(){
        var locat = {lat: 28.635955199999998, lng: 77.2046848};
        var map = new google.maps.Map( document.getElementById('map'), {zoom: 13, center: locat, mapTypeId: 'satellite' });
    
    var circleOptions = {
        fillColor: '#5fa6d7',
        fillOpacity: 0.35,
        editable: true,
        zIndex: 1
    }
    var otherOption = {
            map: map,
            strokeColor: '#5fa6d7',
            strokeWeight: 2,
            fillColor: '#5fa6d7',
            fillOpacity: 0.35,
            draggable: true,
            editable:true,
            geodesic: true
    }
    
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',draggable: true},
        circleOptions: circleOptions,
        rectangleOptions: otherOption,
        polylineOptions: otherOption,
        polygonOptions: otherOption
      });
      drawingManager.setMap(map);
    
      google.maps.event.addListener(drawingManager, 'overlaycomplete' , (shape) => {
          
          let newshape = shape.overlay;
          drawingManager.setDrawingMode(null);
          google.maps.event.addListener(newshape, 'click' , () => {
              selectShape(newshape)
          });
          selectShape(newshape);
        //   google.maps.event.addListener(drawingManager, 'overcomplete', (event)=> {
        //       if(event.type == 'marker') {
        //         console.log(event.overlay.getPosition().lat());
        //       }
              
        //   } );
      });
    
      google.maps.event.addListener(drawingManager, 'drawingmode_changed', removeSelection);
      google.maps.event.addListener(map, 'click', removeSelection);
      google.maps.event.addDomListener(document.getElementById('delete'), 'click',deleteShape); 
    }
    







