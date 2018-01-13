var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuelInicial = 100;
var fuel = fuelInicial;
var velocitatImpacte = 5;
var alturainici = 17;
var y = alturainici;
var recorregut = 56;
var alturaaterrar = alturainici + recorregut;
var combustible = true;
var pausa_act = false;
var instruccions_act = false;
var opcions_act = false;
var about_act = false;
var finaljoc = false;
var pausa_on = true;
var nauimg="nau";
var nau_ex;
var nivell_anterior;
var nivell_selec="facil";
var lloc_ex;

window.onload = function(){
		missatgeinicial();
			document.getElementById("showm").onclick = function () {
			document.getElementsByClassName("c")[0].style.display = "block";
			stop();
		}
		
		document.getElementById("hidem").onclick = function () {
			document.getElementsByClassName("c")[0].style.display = "none";
			start();
		}
		
		document.ontouchstart = function () {
			motorOn();
 		}

		document.ontouchend = function () {
			motorOff();
 		}

		document.onkeydown = function keyCode(event) {
		var x = event.keyCode;
		if (x == 32) {
			motorOn();
			}
		}
		
		document.onkeyup = function keyCode(event) {
		var x = event.keyCode;
		if (x == 32) {
			motorOff();
			}
		}
		
		document.getElementById("bienvenidaJugar").onclick = function(){
			ocultar();
		}

		document.getElementById("play").onclick = function(){
			if(pausa_act==false){
				mostrarPausa();
			}
			else {
				ocultar();
			}
		}

		document.onkeypress = function keyCode(event) {
		var x = event.keyCode;
		if ((x == 112 || x == 80) && pausa_act==false) {
			mostrarPausa();
		}else if((x == 112 || x == 80) && pausa_act==true){
			ocultar();
		}
		}

		document.getElementById("instruction").onclick = function(){
			if(instruccions_act==false){
				mostrarInstruccions();
			}else{
				ocultar();
			}
		}

		document.getElementById("option").onclick = function(){
			if(opcions_act==false){
				mostrarOpciones();
			}else{
				ocultar();
			}
		}

		document.getElementById("about").onclick = function(){
			if(about_act==false){
				mostrarAbout();
			}else{
				ocultar();
			}
		}

		var element=document.getElementsByClassName("tornarmobil");
		var i;

		for(i=0;i<element.length;i++){
			element[i].onclick = function(){
			ocultarTodo();
			}
		}

		document.getElementById("restartMovil").onclick = function () {
			document.getElementsByClassName("c")[0].style.display = "none";
			restart();
			start();
			motorOff();
		}

		document.getElementById("reiniciarPausa").onclick = function(){
			restart();
			ocultar();
		}

		document.getElementById("continuarPausa").onclick = function(){
			ocultar();
		}

		document.getElementById("facilNivel").onclick = function(){
			seleccionarFacil();
		}
		document.getElementById("medioNivel").onclick = function(){
			seleccionarIntermedi();
		}
		document.getElementById("dificilNivel").onclick = function(){
			seleccionarDificil();
		}

		document.getElementById("rejugar").onclick = function(){
			restart();
			start();
			motorOff();
		}
}

function start(){
		pausa_on=false;
		timer=setInterval(function(){ mourenau(); }, dt*1000);
		document.getElementById("play").innerHTML = "Pausa";
}

function stop(){
		pausa_on=true;
		clearInterval(timer);
		motorOff();
		if(finaljoc==true){
			document.getElementById("play").innerHTML = "Jugar";
		}else{
			document.getElementById("play").innerHTML = "Continuar";
		}
}

function mourenau(){
		v +=a*dt;
		document.getElementById("velocitat").innerHTML=v.toFixed(2);
		if(v<velocitatImpacte){
			document.getElementById("velocitat").style.color="lime";
		}else if(v<(velocitatImpacte*1.5)){
			document.getElementById("velocitat").style.color="orange";
		}else{
			document.getElementById("velocitat").style.color="red";
		}
		
		y += v*dt;
		document.getElementById("altura").innerHTML=(alturaaterrar-y).toFixed(2);
		y += v*dt;
		document.getElementById("altura").innerHTML=(alturaaterrar-y).toFixed(2);
		if (y<(alturainici-30)){ 
			finaljoc=true;
			pausa_on=true;
			mensajeSobreAltura();
			motorOff();
			stop();
		} else if (y<alturaaterrar){
			document.getElementById("nau").style.top = y+"%";
		}else{
		document.getElementById("altura").innerHTML=0; 		
		pausa_on=true;		
			comprobarAterrizaje();
			motorOff(); 
			stop();
		}
}

function motorOn(){
		if(fuel>0 && pausa_on==false && finaljoc==false){
		a=-g;
		if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
		document.getElementById("nauimg").src="img/"+nauimg+"foc.png";
		}
}

function motorOff(){
		if (finaljoc==false){
			a=g;
			clearInterval(timerFuel);
			timerFuel=null;
			document.getElementById("nauimg").src="img/"+nauimg+".png";
		}
}

function actualizarFuel(){
		if (combustible==true && finaljoc==false){
				fuel-=0.1;
				if (fuel<=0){
					combustible=false;
					fuel=0;
					motorOff()}
				if (fuel<=fuelInicial/5){
				document.getElementById("fuel").style.color="red";							
				}else if (fuel<=fuelInicial/2){
				document.getElementById("fuel").style.color="orange";		
				}
				document.getElementById("fuel").innerHTML=fuel.toFixed(2);
		}
}

function restart(){
		reiniciarConfiguracio();
		pausa_on=false;
		document.getElementById("divfinaljoc").style.display="none";
}


function seleccionarFacil(){
		fuelInicial=100;
		velocitatImpacte=5;
		nivell_anterior = nivell_selec;
		nivell_selec = "facil";
		fixarmarquesnivell();
	document.getElementById("infoNivel").innerHTML="Nivell Fàcil: Disposes de 100 litres de combustible i has d'aterrar a menys de 5 m/s.";		
		reiniciarConfiguracio();
}

function seleccionarIntermedi(){
		fuelInicial=75;
		velocitatImpacte=3;
		nivell_anterior = nivell_selec;
		nivell_selec = "medio";
		fixarmarquesnivell();
		document.getElementById("infoNivel").innerHTML="Nivell Intermedi: Disposes de 75 litres de combustible i has d'aterrar a menys de 3 m/s.";
		reiniciarConfiguracio();
}

function seleccionarDificil(){
		fuelInicial=50;
		velocitatImpacte=2;
		nivell_anterior = nivell_selec;
		nivell_selec = "dificil";
		fixarmarquesnivell();
		document.getElementById("infoNivel").innerHTML="Nivell Difícil: Disposes de 50 litres de combustible i has d'aterrar a menys de 2 m/s.";
		reiniciarConfiguracio();
}

function reiniciarConfiguracio(){
		y=alturainici;
		fuel=fuelInicial;
		v=0;
		combustible=true;
		finaljoc=false;
		clearInterval(timer);
		timer=null;
		clearInterval(timerFuel);
		timerFuel=null;
		document.getElementById("fuel").style.color="lime";
		document.getElementById("fuel").innerHTML=fuel.toFixed();
		document.getElementById("nauimg").src="img/"+nauimg+".png";
}

function comprobarAterrizaje(){
		finaljoc=true;
		if(v>velocitatImpacte){
			document.getElementById("nauimg").src="img/explota.png";
			mensajeFail();
		}
		else{
			document.getElementById("nauimg").src="img/"+nauimg+".png";
			mensajeWin();
		}
}

function missatgeinicial(){
		document.getElementById("divBienvenida").style.display="block";
}

function mensajeWin(){
		document.getElementById("divfinaljoc").style.display="block";
		document.getElementById("cabezeraFin").innerHTML="Perfecte!!";
		document.getElementById("textFin").innerHTML="La tripulació ha arribat sana i salva a la lluna.";
}

function mensajeFail(){
		document.getElementById("divfinaljoc").style.display="block";
		document.getElementById("cabezeraFin").innerHTML="Game Over!!!";
		document.getElementById("textFin").innerHTML="Tots els tripulants han mort durant la missió :(";
}

function mensajeSobreAltura(){
		document.getElementById("divfinaljoc").style.display="block";
		document.getElementById("cabezeraFin").innerHTML="Error!!!";
		document.getElementById("textFin").innerHTML="La missió consisteix en arribar a la superfície!";
}

function mostrarPausa(){
			stop();
			ocultarTodo();
			document.getElementById("divpausa").style.display="block";
			pausa_act=true;
}

function mostrarInstruccions(){
			stop();
			ocultarTodo();
			document.getElementById("divinstrucciones").style.display="block";
			instruccions_act=true;
}

function mostrarOpciones(){
		stop();		
			ocultarTodo();
			document.getElementById("divopciones").style.display="block";
			opcions_act=true;
}

function mostrarAbout(){
		stop();		
			ocultarTodo();
			document.getElementById("divabout").style.display="block";
			about_act=true;
}

function fixarmarquesnivell(){
		document.getElementById(nivell_anterior+"Nivel").style.textDecoration ="none";
		document.getElementById(nivell_anterior+"Nivel").style.backgroundColor ="grey";
		document.getElementById(nivell_anterior+"Nivel").style.color ="white";
		document.getElementById(nivell_anterior+"Nivel").style.border ="2px grey outset";
		document.getElementById(nivell_selec+"Nivel").style.textDecoration ="none";
		document.getElementById(nivell_selec+"Nivel").style.backgroundColor ="black";
		document.getElementById(nivell_selec+"Nivel").style.color ="yellow";
		document.getElementById(nivell_selec+"Nivel").style.border ="3px grey outset";
}

function ocultarTodo(){
		var emergents=document.getElementsByClassName("divEmergente");
		var i;

		for(i=0;i<emergents.length;i++){
			emergents[i].style.display = "none";
		}

		pausa_act=false;
		instruccions_act=false;
		opcions_act=false;
		about_act=false;
}

function ocultar(){
		ocultarTodo();
		start();
		motorOff();
}
