		
		function initialize() {
			console.log('inicializou mapa');
			var myOptions = {
				zoom: 15,
				center: new google.maps.LatLng(-5.07697,-42.78899),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

			setMarkers(map, pizzarias);
		}

		function setMarkers(map, locations) {
			console.log('definindo marcadores');
		  // Add markers to the map

		  // Marker sizes are expressed as a Size of X,Y
		  // where the origin of the image (0,0) is located
		  // in the top left of the image.

		  // Origins, anchor positions and coordinates of the marker
		  // increase in the X direction to the right and in
		  // the Y direction down.
		  var image = new google.maps.MarkerImage('images/marker-2.png',
			  // This marker is 20 pixels wide by 32 pixels tall.
			  new google.maps.Size(60, 73),
			  // The origin for this image is 0,0.
			  new google.maps.Point(0,0),
			  // The anchor for this image is the base of the flagpole at 0,32.
			  new google.maps.Point(0, 32));

			  // Shapes define the clickable region of the icon.
			  // The type defines an HTML &lt;area&gt; element 'poly' which
			  // traces out a polygon as a series of X,Y points. The final
			  // coordinate closes the poly by connecting to the first
			  // coordinate.
		console.log('image:' +image);
		  
		  var tam = locations.length;

		  console.log('tam:' +tam);
		  
		  for (var i = 0; i < tam; i++) {
			var obj = locations[i];
			var myLatLng = new google.maps.LatLng(obj['lat'], obj['lng']);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				title: obj['number'],
				zIndex: obj['zIndex']
			});
			 attachSecretMessage(marker, i, contentWindow(obj,obj['number']));
		  }
		}

			  function contentWindow(obj, id){
			return '<div id="baloon-'+id+'" class="baloon" rel="'+id+'" >'+
						'<h2>'+obj['number']+'</h2>'+
						'<p>'+obj['address']+'</p>'+
						'<p>'+obj['tel']+'</p>'+
					'</div>';
		  }
		  

				  // The five markers show a secret message when clicked
		  // but that message is not within the marker's instance data
		  function attachSecretMessage(marker, num, message) {
			var infowindow = new google.maps.InfoWindow({
			  content: message,
			  maxWidth: 200
			});

			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.open(marker.get('map'), marker);
				//Pega os dados do último balão apresentado
				var baloonId = $('.baloon:last').attr('rel');				
			});
		  }