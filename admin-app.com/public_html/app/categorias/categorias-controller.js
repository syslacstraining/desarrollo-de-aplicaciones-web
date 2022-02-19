var TABLE_CATEGORIAS;
var ID_ELIMINAR_CATEGORIA;
var CARGAR_ID_CATEGORIA;


$(document).ready(function(){

TABLE_CATEGORIAS=$('#listCategorias').DataTable( {
        "ajax":{
            type: 'get',
            url: "http://apis-app.com/api/v1/categorias",
            dataSrc: 'data',
            cache: true
            },
        columns: [
        	{
        		"targets": 0,
                "render": function ( data, type, row ) {
                    return moment(row.created_at).format('DD/MM/YYYY HH:mm:ss');
                }                
            },
            { data: 'codigo' },
            { data: 'nombre' },
            
            {
        		"targets": 5,
                "render": function ( data, type, row ) {
                	
                	return "<a href='#' onclick=\"showEditarCategoria('"+row.id+"')\">Editar</a> | <a href='#' onclick=\"confirmarEliminacion('"+row.id+"')\">Eliminar</a>"
                    
                }                
            },
        ]

    });



});



function showNewCategoria()
{
    

    var url="/views/categorias/frm-new-categoria.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
    });
}


function showEditarCategoria(id)
{
    CARGAR_ID_CATEGORIA=id;

    var url="/views/categorias/frm-editar-categoria.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
        
        loadDataCategoria();

    });
}

function loadDataCategoria()
{
 
    $.ajax({
            method:"GET",
            url:"http://apis-app.com/api/v1/categorias/"+CARGAR_ID_CATEGORIA
            }).done(function(response){

                $("#txtCodigo").val(response.data.codigo);
                $("#txtNombre").val(response.data.nombre);
                
            });
}


function updateDataTable()
{
    TABLE_CATEGORIAS.ajax.reload();
}


function confirmarEliminacion(id)
{
    ID_ELIMINAR_CATEGORIA=id;

     var url="/views/categorias/frm-confirmar-eliminar.html";

    $('#modalContainer1').load(url, function (result) {

        $('#mdCreate').modal({ show: true,  backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function eliminarCategoria()
{
    

    $.ajax({
            method:"DELETE",
            url:"http://apis-app.com/api/v1/categorias/"+ID_ELIMINAR_CATEGORIA
            }).done(function(response){
                
              
                $('#mdCreate').modal('hide');

                updateDataTable();
            });
}