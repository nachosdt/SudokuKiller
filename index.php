<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sudoku Killer</title>
    <link rel="stylesheet" href="styles.css">
    <script src="controller.js"></script>
</head>
<body>
    <img id="fondo" src="img/ola.png" alt="Imagen de fondo">
    <h1 id="titulo">Sudoku Killer</h1>
    <section id="contenedor">
        <article id="numeros">        
            <div class="numero">1</div>
            <div class="numero">2</div>
            <div class="numero">3</div>        
            <div class="numero">4</div>
            <div class="numero">5</div>
            <div class="numero">6</div>        
            <div class="numero">7</div>
            <div class="numero">8</div>
            <div class="numero">9</div>        
        </article>

        <article id="tablero">            
            <div class="casilla arriba izquierda"></div>
            <div class="casilla arriba"></div>
            <div class="casilla arriba derecha"></div>
            <div class="casilla arriba"></div>
            <div class="casilla arriba"></div>
            <div class="casilla arriba derecha"></div>
            <div class="casilla arriba"></div>
            <div class="casilla arriba"></div>
            <div class="casilla arriba derecha"></div>
            <div class="casilla izquierda"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla abajo izquierda"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla izquierda"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla izquierda"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla abajo izquierda"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla izquierda"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla izquierda"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla"></div>
            <div class="casilla"></div>
            <div class="casilla derecha"></div>
            <div class="casilla abajo izquierda"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo"></div>
            <div class="casilla abajo derecha"></div>
        </article>
        <img id="icono" src="img/info_black_24dp.svg" alt="Icono de información">
        <article id="botonera">
            <button id="resolver">Resolver</button><br>
            <button id="borrar">Reset</button>
        </article>
        <article id="instrucciones">
            <p>1) Seleccione los números a la izquierda y añádalos al sudoku.</p>
            <p>2) Para borrar un número añadido, pinche de nuevo sobre la casilla con el número que quiere borrar seleccionado.
                Para borrar todos los números, pulse Reset.
            </p>
            <p>3) Una vez añadidos todos los números al sudoku, pulse Resolver.</p>
        </article>
    </section>
    <!-- The Modal -->
    <div id="modal">        
        <!-- Modal content -->
        <div id="modal-content">
            <span id="close">&times;</span>
            <p>Sudoku Killer ha sido incapaz de resolver este sudoku. Revise que los números introducidos estén correctos y tenga
                 en cuenta que Sudoku Killer aún no es capaz de resolver sudokus de nivel experto o extremo.
            </p>
        </div>    
    </div>
</body>
</html>