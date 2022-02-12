$(document).ready(function(){

$('#listProductos').DataTable( {
        "ajax":{
            type: 'get',
            url: "http://apis.com/api/v1/productos",
            dataSrc: 'data',
            cache: true
            },
        columns: [
        	{
        		"targets": 0,
                "render": function ( data, type, row ) {
                    return row.created_at;
                }                
            },
            { data: 'codigo' },
            { data: 'nombre' },
            {
        		"targets": 3,
                "render": function ( data, type, row ) {
                	

                	if(row.categoria)
                	{

                		return row.categoria.nombre;
                	}
                	else
                	{
                		return "";
                	}
                    
                }                
            },
            { data: 'precio' },
            {
        		"targets": 5,
                "render": function ( data, type, row ) {
                	
                	return "<a href='#'>Editar</a> | <a href='#'>Eliminar</a>"
                    
                }                
            },
        ]

    });



});