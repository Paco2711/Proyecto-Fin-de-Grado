$(document).ready(function() {

    //MOSTRAR UBICACION

    $("#ubi").click(function () {
        $.ajax({
            url: "localización.html",
            success: function (respuesta) {
                $("#contenidoRyM").html(respuesta);
            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });
    })

    // MOSTRAR HTML RESERVA
    $("#reserva").click(function () {
        $.ajax({
            url: "../Include/reserva.html",
            success: function (respuesta) {
                $("#contenidoRyM").html(respuesta);
                $("#modalButacas").hide();
                mostrarReserva()
            },
            error: (error) => {
                console.log(error);
            }
        });
    })



    $(document).on("click", "#modalButacas", function (e) {
            let peliculaSeleccionada = $("#peliculaSeleccionada").text()
            $.ajax({
                    url: '../Include/otrosArchivos/filabutaca.php',
                    type: 'GET',
                    dataType: 'json',
                    data: {"titulo": peliculaSeleccionada},
                    success: function (respuesta) {
                        let filas = respuesta.filas;
                        let columnas = respuesta.columnas;
                        let nombre = respuesta.nombrePelicula

                        let texto = "<div id='"+nombre+"' class='trapecio-top'></div>";
                        for (let j = 0; j < filas; j++) {
                            texto = texto + "<div class='general'>"
                            for (let i = 0; i < columnas; i++) {
                                if (i == 2 || i == (columnas - 2)) {
                                    texto = texto + `<div id="${j + 1};${i + 1}" class="asiento ms-5 d-inline-block"></div>`
                                } else {
                                    texto = texto + `<div id="${j + 1};${i + 1}" class="asiento ms-1 d-inline-block"></div>`
                                }
                            }
                            texto = texto + "</div>"
                        }
                        $(".listadoAsientos").html(texto);
                    },
                    error: function (e) {
                        console.log('No se ha podido obtener la información');
                        console.log(e)
                    }
                });


    })

    //MOSTRAR MODAL INFO PELICULA

    $(document).on("click", ".informacion", function (e) {
        e.preventDefault()
        let nombre = $(this).parent().text()
        console.log(nombre)
        $.ajax({
            url: '../Include/otrosArchivos/modal.php',
            type: 'GET',
            dataType: 'json',
            data: {"titulo": nombre},
            success: function (respuesta) {
                console.log(respuesta)
                $("#infoPelis").find("div .modal-title").text(respuesta.nombrePelicula)
                let texto = `<p>Duracion: ${respuesta.duracion} minutos</p>`
                texto += `<p>${respuesta.descripcion}</p>`
                texto += `<p style="text-align: center"><img width="50%" src="${respuesta.imagen}"></p>`
                $("#infoPelis").find("div .modal-body").html(texto)
            },
            error: function (e) {
                console.log('No se ha podido obtener la información');
                console.log(e)
            }
        });
    })

    // MOSTRAR INFORMACIÓN CINE

    $("#acercade").click(function () {
        $.ajax({
            url: '../Include/otrosArchivos/Acercade.php',
            dataType: 'json',
            success: (respuesta) => {
                $('.offcanvas-body').html(`<h3 class="fw-bolder">Nombre del cine: </h3><h4>${respuesta.nombreCine}</h4><br><h3 class="fw-bolder">Año de construcción: </h3><h4>${respuesta.anoConstruccion}</h4><br><h2 class="text-decoration-underline text-center">Salas: </h2><br>`);
            },
            error: (error) => {
                console.log(error)
            }
        })
        $.ajax({
            url: '../Include/otrosArchivos/informacionSalas.php',
            dataType: 'json',
            success: (respuesta1) => {
                for (let i = 0; i < respuesta1.length; i++) {
                    let aforo = (respuesta1[i].filas)*(respuesta1[i].butacas);
                    $('.offcanvas-body').append(`<h3>${respuesta1[i].nombreSala}</h3><h4>Aforo: `+aforo+` personas</h4><br>`);
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
    })

    //CAMBIAR CLASE BUTACAS PARA SABER SI ESTAN SELECCIONADAS O NO

    $(document).on("click", ".asiento:not(.ocupada)", function () {
        // $(this).toggleClass("seleccionado");
        let listaOcupados = $(".asiento");
        numeroButaca = listaOcupados.index($(this));
        listaOcupados.eq(numeroButaca).addClass("seleccionada")
        let text = listaOcupados.eq(numeroButaca).prop("id")
        let texn = text.split(";")
        numFilaButaca = texn[0]
        numColumnaButaca = texn[1]
        $("#exampleModal").modal('hide');
        $("#filaEspectador").val(numFilaButaca);
        $("#butacaEspectador").val(numColumnaButaca);

    })

    //BORRAR RESERVA FILAS Y BUTACAS

    $(document).on("click", "#Borrar", function () {
        let peliculaSeleccionada = $(this).closest(".rowPrincipal").find("h3").text()
        let numFila = $(this).closest(".row").find("p").eq(1).text().split(" ")[1];
        let numCol = $(this).closest(".row").find("p").eq(2).text().split(" ")[1];
        let busqueda = (numFila + "," + numCol)

        let listadoAsientos = ocupacionPeliculas[peliculaSeleccionada].split(";")
        let indice = listadoAsientos.indexOf(busqueda)
        if (indice != -1) {
            listadoAsientos.splice(indice, 1)
            let cadenaf = listadoAsientos.join(";")
            ocupacionPeliculas[peliculaSeleccionada] = cadenaf

        }
        let cantidadRow = $(this).closest(".rowPrincipal").find(".row").length
        if (cantidadRow > 1) {
            let nuevosEspectadores = parseInt($(this).closest(".rowPrincipal").find("p").text().split(" ")[0]) - 1
            $(this).closest(".cabecera").find("p").html(nuevosEspectadores + " asientos ocupados")
            $(this).closest(".row").remove()

        } else {
            $(this).closest(".rowPrincipal").remove()

        }
    })
})


function mostrarReserva() {
    $("#seleccionEntradas").attr("class", "d-block")
    cargarPeliculas()
}
function cargarPeliculas() {
    for (indice in listadoPeliculas) {
        let arrayPelicula = listadoPeliculas[indice].split(";")
        let filaHtml = filaPeliculaHtml(indice, arrayPelicula[0], arrayPelicula[1])
        $('.peliculas').append(filaHtml)
    }
}
function seleccionarPelicula(indice) {
    $("#modalButacas").show()
    let lineasPeliculas = $(".peliculas .fila")
    lineasPeliculas.each(function () {
        $(this).css('background-color', 'white')
    })
    lineasPeliculas.eq(indice).css('background-color', 'lightgray')
    let nombrePelicula = lineasPeliculas.eq(indice).find("p").eq(0).text()
    $("#peliculaSeleccionada").html(nombrePelicula)
}


function reservarPelicula() {
    let nombre = $("#nombreEspectador").val()
    let filaEspectador = $("#filaEspectador").val()
    let butacaEspectador = $("#butacaEspectador").val()
    let peliculaSeleccionada = $("#peliculaSeleccionada").text()
    let peliEncontrada = false

    if (peliculaSeleccionada == "") {
        alert("Debe seleccionar una película")
        return false
    }
    if (nombre == "" || filaEspectador == "" || butacaEspectador == "") {
        alert("Los campos Nombre, Fila y Butaca son obligatorios")
        return false
    }
    let cadena = ocupacionPeliculas[peliculaSeleccionada]
    if (cadena != undefined) {
        if (cadena.indexOf(filaEspectador + "," + butacaEspectador + ";") != -1) {
            alert("Esa fila y columna ya está reservada")
            return false
        }
    }

    ocuparFilaYColumna(peliculaSeleccionada, filaEspectador, butacaEspectador)
    $(".listadoVendidas .rowPrincipal").each(function () {
        if ($(this).find("h3").eq(0).html() == peliculaSeleccionada) {
            peliEncontrada = true
            let filaReserva = filaReservaHtml(nombre, filaEspectador, butacaEspectador, peliculaSeleccionada)
            $(this).append(filaReserva)
            //Aumento el número de espectadores
            let nuevosEspectadores = parseInt($(this).find(".cabecera p").text().split(" ")[0]) + 1
            $(this).find(".cabecera p").html(nuevosEspectadores + " asientos ocupados")
            let listaOcupados = $("#"+peliculaSeleccionada+".asiento");
            listaOcupados.eq(numeroButaca).removeClass("seleccionada").addClass("ocupada")
        }
    })
    //Si no se encuentra la Película es porque es nueva, añadir el título primero
    if (peliEncontrada == false) {
        let filaReserva = tituloDePeliculaHtml(peliculaSeleccionada)
        let filaEntera = filaReserva + filaReservaHtml(nombre, filaEspectador, butacaEspectador, peliculaSeleccionada) + "</div>"
        $(".listadoVendidas").append(filaEntera)
        let listaOcupados = $(".asiento");
        listaOcupados.eq(numeroButaca).removeClass("seleccionada").addClass("ocupada")
    }
}

function tituloDePeliculaHtml(peliculaSeleccionada) {
    return "<div class='rowPrincipal'>\
    <div class='bg-secondary text-center text-white cabecera'>\
        <h3>" + peliculaSeleccionada + "</h3>\
        <p>1 asiento ocupado</p>\
    </div>"

}

function filaReservaHtml(nombre, fila, butaca, peliculaSeleccionada) {
    let filaHtml = "<div class='row'><div class='col-8 offset-1 border-bottom border-dark border-2 mt-2'>\
    <p>" + nombre + "</p>\
    <p>Fila: " + fila + "</p>\
    <p>Butaca: " + butaca + "</p>\
    </div>\
    <div class='col-2 d-flex align-items-center border-bottom border-dark border-2'>\
    <button class='btn' id='Borrar' ><i class='bi bi-trash-fill'></i></button>\
    </div></div>"
    return filaHtml
}

//onclick='borrar(\""+ peliculaSeleccionada + "\"," + fila + "," + butaca + ")
function filaPeliculaHtml(indice, nombre, minutos) {
    let filaHtml = "<div class='fila mt-3 d-flex justify-content-between align-items-center'>\
    <div class='col-9 ps-2'>\
    <p class='fw-bold mb-0 fs-5'>" + nombre +"<a class='informacion' href='#'><button id='btnInfo' type='button' class='btn ' data-bs-toggle='modal' data-bs-target='#infoPelis'><i class='bi bi-info-circle'></i></button></a></p>\
    <span class='text-muted'>" + minutos + "minutos</span>\
    </div>\
    <div class='col-3'>\
    <button onclick='seleccionarPelicula(" + indice + ")' class='btn btn-warning select'>Seleccionar</button>\
    </div></div>"
    return filaHtml
}


function ocuparFilaYColumna(pelicula, fila, columna) {

    if (ocupacionPeliculas[pelicula] == undefined) {
        ocupacionPeliculas[pelicula] = fila + "," + columna + ";"
    } else {
        ocupacionPeliculas[pelicula] += fila + "," + columna + ";"
    }
}




//-------------------------------------------------------------------------

        // NO SE USA NADA DE AQUÍ PARA BAJO


/*Versión 1, buscando la fila y columna en el HTML directamente */
function borrarv1(peliculaSeleccionada, filaborrar, butacaBorrar) {
    let fila = $(".listadoVendidas .row").each(function () {
        if ($(this).find("h3").text() == peliculaSeleccionada) {
            //Reducir el número de espectadores
            let nuevosEspectadores = parseInt($(this).find(".cabecera p").text().split(" ")[0]) - 1
            $(this).find(".cabecera p").html(nuevosEspectadores + " asientos ocupados")

            $(this).find(".row").each(function () {
                let fila = $(this).find("p").eq(1).text().split(":")[1]
                let butaca = $(this).find("p").eq(2).text().split(":")[1]
                if (parseInt(fila) == filaborrar && parseInt(butaca) == butacaBorrar) {
                    $(this).remove()
                    let lineaOcupacion = ocupacionPeliculas[peliculaSeleccionada]
                    let buscar = parseInt(fila) + "," + parseInt(butaca)
                    let lineaCortada = lineaOcupacion.split(";")
                    let encontrada = lineaCortada.indexOf(buscar)
                    if (encontrada != -1) {
                        lineaCortada.splice(encontrada, 1)
                        ocupacionPeliculas[peliculaSeleccionada] = lineaCortada.join(";")
                    }

                }
            })
            //Si se han borrado todas las entradas de una película, se borra también su título
            if ($(this).find(".row").length == 0) {
                $(this).remove()
            }
        }
    })
}

function borrar(peliculaSeleccionada, filaborrar, butacaBorrar) {
    let listadoAsientos = ocupacionPeliculas[peliculaSeleccionada]
    let lineaCortada = listadoAsientos.split(";")
    let indiceABorrar = lineaCortada.indexOf(filaborrar + "," + butacaBorrar)
    let fila = $(".listadoVendidas .rowPrincipal").each(function () {
        if ($(this).find("h3").text() == peliculaSeleccionada) {
            /*Borro la fila donde he pulsado la papelera */
            $(this).find(".row").eq(indiceABorrar).remove()
            //Reducir el número de espectadores
            let nuevosEspectadores = parseInt($(this).find(".cabecera p").text().split(" ")[0]) - 1
            $(this).find(".cabecera p").html(nuevosEspectadores + " asientos ocupados")
            /*Modifico el array asociatovo de ocupación Películas*/
            if (indiceABorrar != -1) {
                lineaCortada.splice(indiceABorrar, 1)
                ocupacionPeliculas[peliculaSeleccionada] = lineaCortada.join(";")
            }
            //Si se han borrado todas las entradas de una película, se borra también su título
            if ($(this).find(".rowPrincipal").length == 0) {
                $(this).remove()
            }
        }
    })
}
