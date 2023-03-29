
let escuchando=document.querySelector('.escuchando');
let imagen=document.querySelector('.imagen');
let nombre_cancion=document.querySelector('.nombre-cancion');
let artista=document.querySelector('.artista');

let reproducirpausar_btn=document.querySelector('.reproducirpausar');
let siguiente_btn= document.querySelector('.siguiente-cancion');
let atras_btn=document.querySelector('.cancion-previa');

let buscar_slider=document.querySelector('.buscar_slider');
let volumen_slider=document.querySelector('.volumen_slider');
let tiempo_actual=document.querySelector('.tiempo-actual');
let total_duracion=document.querySelector('.total_duracion');
let wave=document.getElementById('wave');
let randomIcono=document.querySelector('.fa-random');
let cancion_actual=document.createElement('audio');

let track_index=0;
let reproduciendo=false;
let aleatorio=false;
let actualizareproductor;

const lista_musica = [


   {
        img : 'imagenes/karolG_skakira.jpg',
        nombre : 'TQG',
        artista : 'Karol g feat Shakira',
        musica : 'musica/KAROL G Shakira  TQG Official Video.mp3'
    },
      {
       img : 'imagenes/maluma.jpg',
        nombre : '11 PM',
        artista : 'Maluma',
        musica : 'musica/Maluma  11 PM Official Video.mp3'
    },
      {
       img:'imagenes/plan_b.jpg',
        nombre: 'Fanatica Sensual',
        artista:'Plan b',
        musica:'musica/Plan B  Fanatica Sensual  Official Audio.mp3'
    },
    {
        img:'imagenes/tony_dize.jpg',
        nombre:'El doctorado',
        artista:'Tony Dize',
        musica:'musica/Tony Dize  El Doctorado Official Video.mp3'
    }

     ];



     CargarCancion(track_index);

     function CargarCancion(track_index){
     	clearInterval(actualizareproductor);
     resetear();

     	cancion_actual.src = lista_musica[track_index].musica;
     	cancion_actual.load();
     	imagen.style.backgroundImage="url(" + lista_musica[track_index].img + ")";
     	nombre_cancion.textContent=lista_musica[track_index].nombre;
     	artista.textContent=lista_musica[track_index].artista;
     	escuchando.textContent="Escuchando cancion " + (track_index + 1) + " de " + lista_musica.length;

     	 actualizareproductor = setInterval( setActualizar,1000);

     	 cancion_actual.addEventListener('ended',siguiente_cancion);
     	 color_aleatorio();
     }

     function color_aleatorio(){
     	let hex=['0','1','2','3','4','5','6','7','8','9','a','a','b','c','d','e'];
     	let a;

     	function populate(a){
     		for (let i = 0; i <6; i++) {
     			let x=Math.round(Math.random() * 14 );
     			let y=hex[x];
     			a += y;
     		}
     		return a;
     	}

     	let color1=populate('#');
     	let color2=populate('#');
     	var angle='to right';
 let gradient = 'linear-gradient(' + angle + ',' + color1 + ', ' + color2 + ")";
    document.body.style.background = gradient;
   /* document.header.style.background = gradient;*/
  /* menu_side=document.getElementById("menu_side");
   document.menu_side.style.background= gradient;*/
     }

     function resetear(){
     	/*tiempo_actual="00:00";
     	total_duracion="00:00";*/
     	tiempo_actual.textContent ="00:00";
     	total_duracion.textContent ="00:00";
     	buscar_slider.value=0;
     }

    
    function CancionAleatoria(){
     aleatorio ? pausaraleatorio() : reproduciraleatorio();

    }


    function reproduciraleatorio(){
    	aleatorio=true;
    	randomIcono.classList.add('aleatorioactivo');
    }

   function pausaraleatorio(){
   	aleatorio=false;
   	randomIcono.classList.remove('aleatorioactivo');

   }

   function repetir_cancion(){
      let actual_index=track_index;
      CargarCancion(actual_index);
      reproducircancion()
   }

   function reproducirpausarcancion(){
     reproduciendo ? pausarcancion() : reproducircancion() ;
   }

   function reproducircancion(){
   	cancion_actual.play();
   	reproduciendo=true;
   	imagen.classList.add('rotate');
   	wave.classList.add('loader');
   	reproducirpausar_btn.innerHTML='<i class="fa fa-pause-circle fa-5x"><i>';

   }

   function pausarcancion(){
   	cancion_actual.pause();
   	reproduciendo=false;
   	imagen.classList.remove('rotate');
   	wave.classList.remove('loader');
   	reproducirpausar_btn.innerHTML='<i class="fa fa-play-circle fa-5x"><i>';

   }

   function siguiente_cancion(){
   	if (track_index < lista_musica.length - 1 && aleatorio === false){
       track_index += 1;
   	}else if(track_index < lista_musica.length - 1 && aleatorio === true){
   		let random_index= Number.parseInt(Math.random() * lista_musica.length);
   		track_index=random_index;
   	}else{
   		track_index=0;
   	}
   	CargarCancion(track_index);
   	reproducircancion();
   }


   function cancion_previa(){
   	if (track_index > 0){
   		track_index -= 1;
   	}else{
   		track_index= lista_musica.length -1;
   	}
    
    CargarCancion(track_index);
    reproducircancion();

   }

   function buscar(){
   	let buscar= cancion_actual.duration * (buscar_slider.value/100);
   	cancion_actual.currentTime = buscar;
   }


   function setVolumen(){
   	cancion_actual.volume= volumen_slider.value/100;
   }

   function setActualizar(){
   	let buscarposicion=0;

    if (!isNaN(cancion_actual.duration)){
    	buscarposicion = cancion_actual.currentTime * (100 / cancion_actual.duration);
    	buscar_slider.value = buscarposicion;


    	let MinutosActuales = Math.floor(cancion_actual.currentTime / 60);
    	let SegundosActuales = Math.floor(cancion_actual.currentTime - MinutosActuales * 60);
    	let DuracionMinutos = Math.floor(cancion_actual.duration / 60);
    	let DuracionSegundos= Math.floor(cancion_actual.duration - DuracionMinutos * 60);

    	if (SegundosActuales < 10){SegundosActuales = "0" + SegundosActuales ; }
    	if (DuracionSegundos < 10){DuracionSegundos= "0" +  DuracionSegundos ; }
    	if (MinutosActuales < 10){MinutosActuales = "0" + MinutosActuales ; }
    	if (DuracionMinutos < 10){DuracionMinutos = "0" + DuracionMinutos ; }

    	tiempo_actual.textContent = MinutosActuales + ":" + SegundosActuales;
    	
    	total_duracion.textContent= DuracionMinutos + ":" + DuracionSegundos; 




    }
   

   }








//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

var side_menu =document.getElementById("menu_side");
var btn_open =document.getElementById("btn_open");
var body =document.getElementById("body");


    function open_close_menu(){
        body.classList.toggle("body_move");
        side_menu.classList.toggle("menu_side_move");
    }


if (window.innerWidth < 760){

    body.classList.add("body_move");
    side_menu.classList.add("menu_side_move");
}


window.addEventListener("resize", function(){

    if (window.innerWidth > 760){

        body.classList.remove("body_move");
        side_menu.classList.remove("menu_side_move");
    }

    if (window.innerWidth < 760){

        body.classList.add("body_move");
        side_menu.classList.add("menu_side_move");
    }

});
