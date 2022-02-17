var TABLE_PRODUCTOS;
var ID_ELIMINAR_PRODUCTO;
var CARGAR_ID_PRODUCTO;


$(document).ready(function(){

TABLE_PRODUCTOS=$('#listProductos').DataTable( {
        "ajax":{
            type: 'get',
            url: "http://apis-app.com/api/v1/productos",
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
                	
                	return "<a href='#' onclick=\"showEditarProducto('"+row.id+"')\">Editar</a> | <a href='#' onclick=\"confirmarEliminacion('"+row.id+"')\">Eliminar</a>"
                    
                }                
            },
        ]

    });



});



function showNewProducto()
{
    console.log("entro a nuevo producto");

    

    var url="/views/productos/frm-new-producto.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
    });
}


function showEditarProducto(id)
{
    CARGAR_ID_PRODUCTO=id;

    var url="/views/productos/frm-editar-producto.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
        
        loadDataProducto();

    });
}

function loadDataProducto()
{
 
    $.ajax({
            method:"GET",
            url:"http://apis-app.com/api/v1/productos/"+CARGAR_ID_PRODUCTO
            }).done(function(response){

                $("#txtCodigo").val(response.data.codigo);
                $("#txtNombre").val(response.data.nombre);
                
            });
}


function updateDataTable()
{
    TABLE_PRODUCTOS.ajax.reload();
}


function confirmarEliminacion(id)
{
    ID_ELIMINAR_PRODUCTO=id;

     var url="/views/productos/frm-confirmar-eliminar.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function eliminarProducto()
{
    console.log(ID_ELIMINAR_PRODUCTO);

    $.ajax({
            method:"DELETE",
            url:"http://apis-app.com/api/v1/productos/"+ID_ELIMINAR_PRODUCTO
            }).done(function(response){
                
              
                $('#mdCreate').modal('hide');

                updateDataTable();
            });
}