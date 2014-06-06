                       var tween;
                       var thefontsize=30;
                        var controls;
                        var theDiv;

                        var camera, scene, renderer, objects;
                        var particleLight, pointLight;
                        var particleLight2, pointLight2;
                        var dae, skin;
                        var x = 0;
                        var y = 0;
                        var z = 0;


                        var loader = new THREE.ColladaLoader();
                        loader.options.convertUpAxis = false;
                        loader.load( './models/collada/brainmodel/NewBrain.dae', function ( collada ) {

                                dae = collada.scene;

                                dae.scale.x = dae.scale.y = 1;
                                dae.scale.z = 1;
                                dae.updateMatrix();
                                dae.position.x = x;
                                dae.position.y = y;
                                dae.position.z = z;
                                init();
                                add();
                                camera();
                                grid();
                                lights();
                                labels();
                                animate();
                                document.getElementById("myspinner").style.visibility="hidden";
                        } );

			function highlight(child, r, g, b) {
					dae.children[0].children[0].children[child].children[0].children[0].material.color.setRGB(r,g,b);
	 		     		dae.children[0].children[0].children[child].children[0].children[0].material.ambient.setRGB(r,g,b);
	 	
			}

                        function camera() {
                                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
                                camera.position.set( 10, 2, 3 );


                                

                                scene = new THREE.Scene();

                                        controls = new THREE.OrbitControls( camera );
                               // controls.addEventListener( 'change', render );
                        }

                                // Grid
			function grid() {
                                var size = 14, step = 1;

                                var geometry = new THREE.Geometry();
                                var material = new THREE.LineBasicMaterial( { color: 0x303030 } );

                                for ( var i = - size; i <= size; i += step ) {

                                        geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
                                        geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

                                        geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
                                        geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

                                }

                                var line = new THREE.Line( geometry, material, THREE.LinePieces );
                                scene.add( line );
			}
                                // Add the COLLADA
			function add() {
                                scene.add( dae );


                                particleLight = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 4, 4 ), new THREE.MeshBasicMaterial( { color: 0x00ffdd } ) );
                                scene.add( particleLight );
                                particleLight2 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 4, 4 ), new THREE.MeshBasicMaterial( { color: 0xff00dd } ) );
                                scene.add( particleLight2 );
			}
                                // Lights
			function lights() {
                                scene.add( new THREE.AmbientLight( 0x666666 ) );

                                var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
                                directionalLight.position.x = Math.random()*2 - 0.5;
                                directionalLight.position.y = Math.random()*2 - 0.5;
                                directionalLight.position.z = Math.random()*2 - 0.5;
                                directionalLight.position.normalize();
                                scene.add( directionalLight );

                                pointLight = new THREE.PointLight( 0x00ffdd, 1 );
                                pointLight.position = particleLight.position;
                                scene.add( pointLight );

                                pointLight2 = new THREE.PointLight( 0xff00dd, 1 );
                                pointLight2.position = particleLight2.position;
                                scene.add( pointLight2 );

                                renderer = new THREE.WebGLRenderer();
                                renderer.setSize( window.innerWidth, window.innerHeight );
                                renderer.setClearColor( 0x000000, 1);

                                var setMaterial = function( node ) {

                                  node.material = new THREE.MeshPhongMaterial({color: 0x9999dd} );

                                  console.log(node);

                                  if (node.children) {

                                    for (var i=0, thelength=node.children.length; i < thelength ; i++ ) {

                                      setMaterial(node.children[i]);
                                    }
                                    
                                    }

                                  }
					setMaterial(dae);
                                }

  //labels for the different parts
				function labels() {  
    var spritey = makeTextSprite( " Occipital Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:0, b:255, a:1.0} } );
	                     		spritey.position.set(-2,-1,2);
	                     		scene.add( spritey );
	                 var spritey8 = makeTextSprite( " Occipital Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:0, b:255, a:1.0} } );
	                     		spritey8.position.set(-2,-1,-3);
	                     		scene.add( spritey8 );
	                     		dae.children[0].children[0].children[14].children[0].material.color.setRGB(0.8,0,0.2);
	                     		dae.children[0].children[0].children[14].children[0].material.ambient.setRGB(0.8,0,0.2);
	                     		dae.children[0].children[0].children[13].children[0].material.color.setRGB(0.8,0,0.2);
	                     		dae.children[0].children[0].children[13].children[0].material.ambient.setRGB(0.8,0.2,0);
	  var spritey1 = makeTextSprite( " Parietal Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
	 		     		spritey1.position.set(-2,2,2);
	 		     		scene.add( spritey1 );
	 var spritey7 = makeTextSprite( " Parietal Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
	 		     		spritey7.position.set(-2,2,-2);
	 		     		scene.add( spritey7 );
	 		     		
	 		     		dae.children[0].children[0].children[9].children[0].children[0].material.color.setRGB(0,0.9,0.1);
	 		     		dae.children[0].children[0].children[9].children[0].children[0].material.ambient.setRGB(0,0.9,0.1);
	 		     		dae.children[0].children[0].children[10].children[0].children[0].material.color.setRGB(0,0.9,0.1);
	 		     		dae.children[0].children[0].children[10].children[0].children[0].material.ambient.setRGB(0,0.9,0.1);
	 		     		
     var spritey2 = makeTextSprite( " Cerebellum ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:255, b:0, a:1.0} } );
	 				 spritey2.position.set(-2,-2,2);	 		 
	 				 scene.add( spritey2 );
	 				 dae.children[0].children[0].children[3].children[0].children[0].material.color.setRGB(0.7,0.3,0);
	 				 dae.children[0].children[0].children[3].children[0].children[0].material.ambient.setRGB(0.7,0.3,0);
	 	  var spritey3 = makeTextSprite( " Frontal Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:234, g:21, b:0, a:1.0} } );
	                     		spritey3.position.set(2,2,2);
	                     		scene.add( spritey3 );
	          var spritey6 = makeTextSprite( " Frontal Lobe ", { fontsize: thefontsize, fontface: "Georgia", borderColor: {r:234, g:21, b:0, a:1.0} } );
	                     		spritey6.position.set(2,2,-2);
	                     		scene.add( spritey6 );
	                     		
	                     		dae.children[0].children[0].children[8].children[0].children[0].material.color.setRGB(0,0.4,0.6);
	                     		dae.children[0].children[0].children[8].children[0].children[0].material.ambient.setRGB(0,0.4,0.6);
	                     		dae.children[0].children[0].children[7].children[0].children[0].material.color.setRGB(0,0.4,0.6);
	                     		dae.children[0].children[0].children[7].children[0].children[0].material.ambient.setRGB(0,0.4,0.6);
	                     		
	   	var spritey4 = makeTextSprite( " Temporal Lobe ", {fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:125, b:130} } );
              				spritey4.position.set(2, -1, -2);
              				scene.add( spritey4 );
              				var spritey5 = makeTextSprite( " Temporal Lobe ", {fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:125, b:130} } );
              				spritey5.position.set(2, -1, 2);
              				scene.add( spritey5 );
              
              				dae.children[0].children[0].children[11].children[0].material.color.setRGB(1,0,1);
              				dae.children[0].children[0].children[11].children[0].material.ambient.setRGB(1,0,1);
					dae.children[0].children[0].children[12].children[0].material.color.setRGB(1,0,1);
	      				dae.children[0].children[0].children[12].children[0].material.ambient.setRGB(1,0,1);

	       var spritey9 = makeTextSprite( " Pituitary ", {fontsize: thefontsize, fontface: "Georgia", borderColor: {r:0, g:255, b:0} } );
              				spritey9.position.set(2, -1, 0);
              				scene.add( spritey9 );
              				dae.children[0].children[0].children[2].children[0].material.color.setRGB(0,1,1);
              				dae.children[0].children[0].children[2].children[0].material.ambient.setRGB(0,1,1);
}
// middle brain: dae.children[0].children[0].children[4].children[0].material.color.setRGB(1,0,1)
// cerebellum: dae.children[0].children[0].children[3].children[0].children[0].material.color.setRGB(1,1,1)
// pituitary: dae.children[0].children[0].children[2].children[0].material.color.setRGB(1,1,1) 
// left temporal lobe: dae.children[0].children[0].children[11].children[0].material.color.setRGB(1,0,1)
// right temporal lobe: dae.children[0].children[0].children[12].children[0].material.color.setRGB(1,0,1)
// left occipital lobe: dae.children[0].children[0].children[14].children[0].material.color.setRGB(1,0,1)
// right occipital lobe: dae.children[0].children[0].children[13].children[0].material.color.setRGB(1,0,1)
// left frontal lobe:  dae.children[0].children[0].children[8].children[0].children[0].material.color.setRGB(1,1,1)
// right frontal lobe: dae.children[0].children[0].children[7].children[0].children[0].material.color.setRGB(1,1,1)
// left parietal lobe: dae.children[0].children[0].children[9].children[0].children[0].material.color.setRGB(1,1,1)
// right parietal lobe: dae.children[0].children[0].children[10].children[0].children[0].material.color.setRGB(1,1,1)
//                                setMaterial(dae, new THREE.MeshBasicMaterial({color: 0xff0000}));

//////////////////////////////
				function init() {
                                var theDiv = document.getElementById("Foo");
                                theDiv.appendChild( renderer.domElement );
                                $( ".spinner" ).remove();
                                $( "#header" ).removeClass( "col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-lg-6 col-lg-offset-3" ).addClass( "col-md-12" );



                                document.addEventListener( 'keydown', onDocumentKeyDown, false);
                                window.addEventListener( 'resize', onWindowResize, false );
				}

                        

			function makeTextSprite( message, parameters )
			{
        			if ( parameters === undefined ) parameters = {};
        
        			var fontface = parameters.hasOwnProperty("fontface") ? 
                			parameters["fontface"] : "Arial";
        
        			var fontsize = parameters.hasOwnProperty("fontsize") ? 
                			parameters["fontsize"] : 100;
        
        			var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
                			parameters["borderThickness"] : 1;
        
        			var borderColor = parameters.hasOwnProperty("borderColor") ?
                			parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        
        			var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                			parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

        			var spriteAlignment = THREE.SpriteAlignment.topLeft;
                
        			var canvas = document.createElement('canvas');
        			var context = canvas.getContext('2d');
        				context.font = "Bold " + fontsize + "px " + fontface;
    
        			// get size data (height depends only on font size)
        			var metrics = context.measureText( message );
        			var textWidth = metrics.width;
        
        			// background color
        			context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                                                  + backgroundColor.b + "," + backgroundColor.a + ")";
        			// border color
        			context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                                                  + borderColor.b + "," + borderColor.a + ")";

        			context.lineWidth = borderThickness;
        			roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        			// 1.4 is extra height factor for text below baseline: g,j,p,q.
        
        			// text color
        			context.fillStyle = "rgba(0, 0, 0, 1.0)";

        			context.fillText( message, borderThickness, fontsize + borderThickness);
        
        			// canvas contents will be used for a texture
        			var texture = new THREE.Texture(canvas) 
        			texture.needsUpdate = true;

        			var spriteMaterial = new THREE.SpriteMaterial( 
                			{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
        			var sprite = new THREE.Sprite( spriteMaterial );
   
        			sprite.scale.set(2.5,1.25,1.0);
   				// was     sprite.scale.set(100,50,1.0);
   
        		return sprite;
		}

		// function for drawing rounded rectangles
		function roundRect(ctx, x, y, w, h, r) 
		{
    			ctx.beginPath();
    			ctx.moveTo(x+r, y);
    			ctx.lineTo(x+w-r, y);
    			ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    			ctx.lineTo(x+w, y+h-r);
    			ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    			ctx.lineTo(x+r, y+h);
    			ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    			ctx.lineTo(x, y+r);
    			ctx.quadraticCurveTo(x, y, x+r, y);
    			ctx.closePath();
    			ctx.fill();
        		ctx.stroke();   
		}


                    
                        function onWindowResize() {

                                camera.aspect = window.innerWidth / window.innerHeight;
                                camera.updateProjectionMatrix();

                                renderer.setSize( window.innerWidth, window.innerHeight );
                                renderer.setSize( $("#Foo").width(), $("#Foo").height());

                        }

                        function onDocumentKeyDown(event) 
                        {
                                switch ( event.keyCode) 
                                {
                                        case 65: x -= 0.1; break ; //left
                                        case 83: z -= 0.1; break ; //right
                                         case 68:

                                          if( THREEx.FullScreen.activated() ){
                                            THREEx.FullScreen.cancel();
                                          }else{
                                            THREEx.FullScreen.request(theDiv);
                                          }; break ; //right

                                        case 84: dae.children[0].children[0].children[10].children[0].children[0].material.color.setRGB(0.8,0.2,0); break ; //right parietal lobe
                            } 
                          }
                          function fullscreen(){
                            
                                          if( THREEx.FullScreen.activated() ){
                                            THREEx.FullScreen.cancel();
                                          }else{
                                            THREEx.FullScreen.request(theDiv);
                                          }; 
                          }


                        var t = 0;
                        var clock = new THREE.Clock();

                        function animate() {

                                var delta = clock.getDelta();


                                requestAnimationFrame( animate );

                                if ( t > 1 ) t = 0;

                                if ( skin ) {

                                        // guess this can be done smarter...

                                        // (Indeed, there are way more frames than needed and interpolation is not used at all
                                        //  could be something like - one morph per each skinning pose keyframe, or even less,
                                        //  animation could be resampled, morphing interpolation handles sparse keyframes quite well.
                                        //  Simple animation cycles like this look ok with 10-15 frames instead of 100 ;)

                                        for ( var i = 0; i < skin.morphTargetInfluences.length; i++ ) {

                                                skin.morphTargetInfluences[ i ] = 0;

                                        }

                                        skin.morphTargetInfluences[ Math.floor( t * 30 ) ] = 1;

                                        t += delta;

                                }

                                controls.update();
                                render();

                        }

                        function render() {
                                var timer = Date.now() * 0.0004;
                                particleLight.position.x = Math.sin( timer * 5 ) * 4;
                                particleLight.position.y = Math.cos( timer * 3 ) * 4;
                                particleLight.position.z = Math.cos( timer * 5 ) * 4;
                                particleLight2.position.x = - Math.sin( timer * 5 ) * 4;
                                particleLight2.position.y = -Math.cos( timer * 3 ) * 4;
                                particleLight2.position.z = Math.cos( timer * 5 ) * 4;
                                renderer.render( scene, camera );

                                //moved this code to initialization

                        }
