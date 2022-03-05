var TABLE_PRODUCTOS;
var ID_ELIMINAR_PRODUCTO;
var CARGAR_ID_PRODUCTO;


$(document).ready(function(){

TABLE_PRODUCTOS=$('#listProductos').DataTable( {
        "ajax":{
            type: 'get',
            url: APIS_URL+"/api/v1/productos",
            headers: {
                    Authorization: 'Bearer '+_access_token
            },
            dataSrc: 'data',
            cache: true
            },
        columns: [
        	{
        		"targets": 0,
                "render": function ( data, type, row ) {
                    //return row.created_at;

                    return moment(row.created_at).format('DD/MM/YYYY HH:mm:ss');
                }                
            },
            {
                "targets": 1,
                "render": function ( data, type, row ) {
                    if(row.image_path)
                        return "<img width='50px' src='"+row.image_path+"'>";

                        //return "<img width='50px' src='https://apis.miapp.syslacsdev.com/api/v1/files/archivo1.jpg'>";
                        
                    else
                        return "";
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

    

    var url="/views/productos/frm-new-producto.html?v=4.0";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
    });
}


function showEditarProducto(id)
{
    CARGAR_ID_PRODUCTO=id;

    var url="/views/productos/frm-editar-producto.html?v=3.2";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
        
        loadDataProducto();

    });
}



function loadDataProducto()
{
    var _args={
        callback:function(data)
        {
             $.each(data, function (i, item) {

                $("#ddlCategoria").append(new Option(item.nombre, item.id));
            
              });

             getDataProducto();
        }
    };

    loadCategorias(_args);

}

function getDataProducto()
{
    $.ajax({
            method:"GET",
            headers: {
                    Authorization: 'Bearer '+_access_token
            },
            url:APIS_URL+"/api/v1/productos/"+CARGAR_ID_PRODUCTO
            }).done(function(response){

                //console.log(response.data);
                $('#ddlCategoria option[value='+response.data.categoria_id+']').prop('selected', 'selected');

                $("#txtCodigo").val(response.data.codigo);
                $("#txtNombre").val(response.data.nombre);
                $("#txtPrecio").val(response.data.precio);
                
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
    $.ajax({
            method:"DELETE",
            headers: {
                    Authorization: 'Bearer '+_access_token
            },
            url:APIS_URL+"/api/v1/productos/"+ID_ELIMINAR_PRODUCTO
            }).done(function(response){
                
              
                $('#mdCreate').modal('hide');

                updateDataTable();
            });
}



function loadCategorias(params)
{
    $.ajax({
            method:"GET",
            headers: {
                    Authorization: 'Bearer '+_access_token
            },
            url:APIS_URL+"/api/v1/categorias"
            }).done(function(response){

                if(params.callback)
                    params.callback(response.data);
            
            });
}