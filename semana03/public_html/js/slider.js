var ORDEN=0;

function mostrar(orden)
{
	document.getElementById("img"+orden).style.display="block";
}


function ocultar(orden)
{
	document.getElementById("img"+orden).style.display="none";
}


setInterval(carrusel,3000);


function carrusel()
{
	ORDEN++;

	orden_ocultar=ORDEN-1;
	orden_mostrar=ORDEN;

	if(orden_ocultar==0)
	{
		orden_ocultar=3;	
	}

	if(orden_mostrar==4)
	{
		orden_mostrar=1;
		ORDEN=1;	
	}

	ocultar(orden_ocultar);
	mostrar(orden_mostrar);
}
