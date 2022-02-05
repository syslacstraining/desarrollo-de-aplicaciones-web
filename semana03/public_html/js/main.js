/*
DECLARACION DE VARIABLES
*/
//SINGLE LINE

var var1=14;

var var2="hola";

var var3=12.2;

var array1= new Array(1,2,3);

var i=10;
i++;


//CONDICIONALES
if(var1==12)
{
	document.write("es es igual a 12");
}
else
{
	document.write("es diferente de 12")
}


//SWITCH

var comando="insertar";

switch(comando)
{
	case "insertar":
		document.write("comando insertar");break;
	default:
	 	document.write("es cuaquier otro comando");break;
}


//BUCLES 
for(i=0;i<10;i++)
{
	document.write("valor de item ="+i+"<br>");
}


//FUNCIONES 

function suma(a,b)
{
	return a+b;
}


var r=suma(12,5);

document.write(r);

function click1(e)
{
	console.log(e);
	//alert("click en nav");
}
