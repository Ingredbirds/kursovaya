ymaps.ready(function () {
    var mapCenter = [55.755381, 37.619044],
        map = new ymaps.Map('map', {
            center: mapCenter,
            zoom: 10,
            controls: []
        }),
        // Возможные значения цветов иконок.
        placemarkColors = [
            '#FF1F1F', '#1F44FF', '#1FFF8E', '#FF1FF5',
            '#FFEF1F', '#FF931F', '#AE6961', '#6193AE'
        ];
        
    // Создаем собственный макет с информацией о выбранном геообъекте.
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );
    
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Аккордеон".
        clusterBalloonContentLayout: 'cluster#balloonAccordion',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна. 
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 250,
        clusterBalloonContentLayoutHeight: 200,
        // Можно отключить отображение иконок геообъектов в списке. 
        // В браузере Internet Explorer ниже 9й версии иконки никогда не будут отображаться.
        // clusterBalloonAccordionShowIcons: false
    });
    
    // Заполняем кластер геообъектами со случайными позициями.
    var placemarks = [];
    for (var i = 0, l = 10; i < l; i++) {
        var placemark = new ymaps.Placemark(getRandomPosition(), {
            // Устаналиваем данные, которые будут отображаться в балуне.
            balloonContentHeader: 'Шаурма от Инги №' + (i + 1),
            balloonContentBody:getContentBody(i),
            balloonContentFooter: "Курсовая "
        }, {
            iconColor: getRandomColor()
        });
        placemarks.push(placemark);
    }
    
    clusterer.add(placemarks);
    map.geoObjects.add(clusterer);
    
    
    function getRandomPosition () {
        return [
            mapCenter[0] + (Math.random() * 0.6 - 0.3),
            mapCenter[1] + (Math.random() * 0.8 - 0.4)
        ];
    }

    function getRandomColor() {
        return placemarkColors[Math.round(Math.random() * placemarkColors.length)];
    }
    
    var placemarkBodies;
    function getContentBody (num) {
        if (!placemarkBodies) {
            placemarkBodies = [
                ['Шаурма от Инги '].join('<br/>')
               
            ];
        }
        return '<strong>Торговая точка №' + (num + 1) + '</strong><br/>' ;
    }
    clusterer.balloon.open(clusterer.getClusters()[0]);
});