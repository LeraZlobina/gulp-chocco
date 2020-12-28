let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.752414, 37.614238],
      zoom: 13.42,
      controls: []
    });
    
    const coords = [
      [55.758841, 37.582746],
      [55.743106, 37.581521],
      [55.749953, 37.603790],
      [55.757322, 37.623299],
    ];
    
    const myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: 'images/img/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });
    
    coords.forEach(coord => {
      myCollection.add(new ymaps.Placemark(coord));
    })
    
    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
   };

   ymaps.ready(init);