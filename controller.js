// CLASES
class Sudoku {
    constructor() {
        let sudoku = new Array(9);        
        let casillas = [...document.getElementsByClassName("casilla")]; 
        for (let i = 0; i<9; i++) {
            sudoku[i] = new Array(9);
            for (let j = 0; j<9; j++) {
                sudoku[i][j] = new Casilla(casillas[9*i+j],i,j);
            }
        }
        this.sudoku =  sudoku;
        this.cambios = false;
        this.soluciones = [];
        this.intervalos = [];   
    }
    fila(numero,valores) {        
        if (valores) {
            return this.sudoku[numero].map(v=>Number(v.valor));
        } else {
            return this.sudoku[numero];
        }        
    }
    
    columna(numero,valores) {
        let columna = [];
        this.sudoku.forEach(v=>columna.push(v[numero]));
        if (valores) {
            return columna.map(v=>Number(v.valor));
        } else {
            return columna;
        }
        
    }

    caja([i,j],valores) {
        let caja = [];
        if (i<3) {
            if (j<3) {caja = [this.sudoku[0].slice(0,3),this.sudoku[1].slice(0,3),this.sudoku[2].slice(0,3)];}
            if (j>2 && j<6) {caja = [this.sudoku[0].slice(3,6),this.sudoku[1].slice(3,6),this.sudoku[2].slice(3,6)];}
            if (j>5) {caja = [this.sudoku[0].slice(6),this.sudoku[1].slice(6),this.sudoku[2].slice(6)];}
        }
        if (i>2 && i<6) {
            if (j<3) {caja = [this.sudoku[3].slice(0,3),this.sudoku[4].slice(0,3),this.sudoku[5].slice(0,3)];}
            if (j>2 && j<6) {caja = [this.sudoku[3].slice(3,6),this.sudoku[4].slice(3,6),this.sudoku[5].slice(3,6)];}
            if (j>5) {caja = [this.sudoku[3].slice(6),this.sudoku[4].slice(6),this.sudoku[5].slice(6)];}
        }
        if (i>5) {
            if (j<3) {caja = [this.sudoku[6].slice(0,3),this.sudoku[7].slice(0,3),this.sudoku[8].slice(0,3)];}
            if (j>2 && j<6) {caja = [this.sudoku[6].slice(3,6),this.sudoku[7].slice(3,6),this.sudoku[8].slice(3,6)];}
            if (j>5) {caja = [this.sudoku[6].slice(6),this.sudoku[7].slice(6),this.sudoku[8].slice(6)];}
        }
        if (valores) {
            return caja.flat().map(v=>Number(v.valor));
        } else {
            return caja;
        }        
    }

    reducirPosibilidades() {
        this.cambios = false;
        for (let i = 0; i<9; i++) {
            for (let j = 0; j<9; j++) {
                let casilla = this.sudoku[i][j];                
                if (casilla.valor) {casilla.posibilidades = null;}
                else {
                    let posibilidades = casilla.posibilidades.map(v=>{
                        if (this.fila(i,true).includes(v) || this.columna(j,true).includes(v) || this.caja([i,j],true).includes(v)) {
                            return 0;
                        } else { 
                            return v;
                        }
                    });                    
                    casilla.posibilidades = posibilidades.filter(v => v!==0);
                    if (casilla.posibilidades.length === 1) {
                        casilla.valor = casilla.posibilidades[0]; //////////////////////////////////
                        this.soluciones.push([i,j,casilla.posibilidades[0]]);
                        casilla.posibilidades = null;
                        this.cambios = true;
                    }
                }               
            }
        }
    }

    unicaPorDescarte() {        
        this.cambios = false;
        let hayCambios = false;
        for (let i = 0; i<9; i++) {
            let fila = this.fila(i,false);
            let posibilidades = [];
            fila.forEach(casilla=>{
                if (casilla.posibilidades!==null) posibilidades.push(casilla.posibilidades);
            });
            if (posibilidades.length!==0) {                
                let unicas = buscarUnicas(posibilidades);
                
                if (unicas.length!==0) {
                    unicas.forEach(numero=>{
                        for (let j = 0; j<9; j++) {
                            if (fila[j].posibilidades!==null && fila[j].posibilidades.includes(numero)) {
                                fila[j].posibilidades = null;
                                fila[j].valor = numero; ////////////////////////////////////////////////////////
                                this.soluciones.push([i,j,numero]);
                                this.cambios = true;
                            }
                        }                        
                    });
                }
            }
        }
        while (this.cambios) {
            this.reducirPosibilidades();
            hayCambios = true;
        }
        if (!this.finalizado()) {            
            for (let i = 0; i<9; i++) {
                let columna = this.columna(i,false);
                let posibilidades = [];
                columna.forEach(casilla=>{
                    if (casilla.posibilidades!==null) posibilidades.push(casilla.posibilidades);
                });
                if (posibilidades.length!==0) {
                    let unicas = buscarUnicas(posibilidades);                
                    if (unicas.length!==0) {
                        unicas.forEach(numero=>{
                            for (let j = 0; j<9; j++) {
                                if (columna[j].posibilidades!==null && columna[j].posibilidades.includes(numero)) {
                                    columna[j].posibilidades = null;
                                    columna[j].valor = numero; ////////////////////////////////////////////////////////
                                    this.soluciones.push([j,i,numero]);
                                    this.cambios = true;
                                    
                                }
                            }
                        });
                    }
                }
            }
            while (this.cambios) {
                this.reducirPosibilidades();
                hayCambios = true;
            }
            if (!this.finalizado()) {                
                for (let i = 0; i<9; i+=3) {
                    for (let j = 0; j<9; j+=3) {
                        let caja = this.caja([i,j],false).flat();
                        let posibilidades = [];
                        caja.forEach(casilla=>{
                            if (casilla.posibilidades!==null) posibilidades.push(casilla.posibilidades);
                        });                        
                        if (posibilidades.length!==0) {
                            let unicas = buscarUnicas(posibilidades);                            
                            if (unicas.length!==0) {
                                unicas.forEach(numero=>{
                                    for (let k = 0; k<9; k++) {
                                        if (caja[k].posibilidades!==null && caja[k].posibilidades.includes(numero)) {
                                            caja[k].posibilidades = null;
                                            caja[k].valor = numero; ////////////////////////////////////////////////////////
                                            this.soluciones.push([...obtenerIndices(caja[k].elemento),numero]);
                                            this.cambios = true;                                            
                                        }
                                    }
                                });
                            }
                        }  
                    }
                }
                while (this.cambios) {
                    this.reducirPosibilidades();
                    hayCambios = true;
                }
            }
        }
        return hayCambios;
    }

    finalizado() {
        return this.sudoku.flat().every(casilla=>casilla.valor);
    }

    ponerSoluciones() {
        let tiempo = 500;        
        let intervalos = this.intervalos;
        let sudoku = this.sudoku;
        this.soluciones.forEach(([i,j,numero])=>{
            tiempo += 100;
            setTimeout(() => {
                clearInterval(intervalos[9*i+j]);                
                sudoku[i][j].elemento.style.color = "black";
                sudoku[i][j].numero = numero;
            },tiempo);
        });
    }
}

class Casilla {
    constructor(casilla,i,j) {
        this.elemento = casilla;        
        this.posibilidades = [1,2,3,4,5,6,7,8,9];        
        this.posicion = [i,j];
        this.valor = Number(casilla.textContent);        
    }
    set numero(n) {
        this.elemento.textContent = n;
    }
    get numero() {
        return Number(this.elemento.textContent);
    }
}


// INICIO
window.onload = function() {
    let fondo = document.getElementById("fondo");
    let titulo = document.getElementById("titulo");
    titulo.style.ba    
    let contenedor = document.getElementById("contenedor");    
    fadeIn(fondo,1,1000,"block");
    fadeIn(titulo,2,1500,"block");
    fadeOut(titulo,1,4000);
    fadeIn(contenedor, 1,4500,"flex");

    let botones = document.getElementsByClassName("numero");
    botones = [...botones];
    botones.forEach(boton=>{        
        boton.addEventListener("click", resaltarNumero);
    });

    let casillas = [...document.getElementsByClassName("casilla")];
    casillas.forEach((casilla)=>{
        casilla.addEventListener("click",aniadirNumero);
    });

    document.getElementById("borrar").addEventListener("click",resetear);
    document.getElementById("resolver").addEventListener("click",resolverSudoku);    
}


// EVENTOS
function resolverSudoku() {
    let tablero = new Sudoku();    
    let numeros = [1,2,3,4,5,6,7,8,9];
    tablero.sudoku.flat().forEach((casilla,indice)=>{
        if (!casilla.valor) {
            casilla.elemento.style.color = "grey";
            casilla.numero = numeros[Math.floor(Math.random()*8)];
            tablero.intervalos[indice] = setInterval(() => {
                if (casilla.numero<9) {casilla.numero += 1;}
                else {casilla.numero = 1;} 
            },50);
        } else {
            tablero.intervalos[indice] = null;
        }       
    });
    console.log(tablero.intervalos);
    do {
        tablero.reducirPosibilidades();
    } while (tablero.cambios)
        
    if(!tablero.finalizado()) {        
        let cambios = false;
        do {             
            cambios = tablero.unicaPorDescarte();
        }
        while (cambios)
    }
    tablero.ponerSoluciones();
}


function resetear() {
    let casillas = [...document.getElementsByClassName("casilla")];
    casillas.forEach((casilla)=>{
        casilla.textContent = "";
    });
}

function aniadirNumero() {
    let seleccionado = document.getElementsByClassName("seleccionado");
    if (seleccionado[0]) {
        let numero = Number(seleccionado[0].textContent);
        let tablero = new Sudoku();
        validar(tablero, this, numero, obtenerIndices(this));        
    }
}

function resaltarNumero() {
    [...document.getElementsByClassName("numero")].forEach((elemento)=>{
        if(elemento.classList.contains("seleccionado")) {
            elemento.classList.remove("seleccionado");
            elemento.style.backgroundColor="white";
        }
    });
    this.classList.add("seleccionado");
    this.style.backgroundColor = "rgb(247, 95, 95)";
}


// FUNCIONES
function buscarUnicas(posibilidades) {
    let valores = [...new Set(posibilidades.flat())];
    let unicos = [];
    for (let i = 0; i<valores.length; i++) {
        let repeticiones = 0;        
        posibilidades.forEach(v=>{
            if (v.includes(valores[i])) {
                repeticiones++;                
            }            
        });
        if (repeticiones===1) {
            unicos.push(valores[i]);
        }
    }
    return unicos;
}

function validar(tablero, casilla, numero, [i,j]) {
    if (casilla.textContent === String(numero)) {
        casilla.textContent = "";
    } else if (tablero.fila(i,true).includes(numero)) {
        tablero.fila(i,false).forEach(v=>{
            if (v.valor === numero) {
                alertaCasilla(v.elemento);
            }
        });
    } else if (tablero.columna(j,true).includes(numero)) {
        tablero.columna(j,false).forEach(v=>{
            if (v.valor === numero) {
                alertaCasilla(v.elemento);
            }
        });
    } else if (tablero.caja([i,j],true).includes(numero)) {
        tablero.caja([i,j],false).flat().forEach(v=>{
            if (v.valor === numero) {
                alertaCasilla(v.elemento);
            }
        });
    } else {
        casilla.textContent = numero;
    }
}

function alertaCasilla(casilla) {
    let rojo = true;
    casilla.style.backgroundColor = "rgb(247, 95, 95)";
    let interval = setInterval(function(){
        if(rojo) {
            casilla.style.backgroundColor = "white";
            rojo = false;
        } else {
            casilla.style.backgroundColor = "rgb(247, 95, 95)";
            rojo = true;
        }
    },200);
    setTimeout(()=>{
        clearInterval(interval);
        if (rojo) casilla.style.backgroundColor = "white";
    },1001);
}

function obtenerIndices(casilla) {
    let indices = [];
    let casillas = [...document.getElementsByClassName("casilla")];
    for (let i = 0; i<casillas.length; i++) {
        if(casillas[i]===casilla) {
            indices = [Math.floor(i/9),i%9];
            break;
        }
    }
    return indices;
}

function fadeIn(elemento,rapidez,retardo,display) {
    elemento.style.opacity = "0";
    elemento.style.transition = `opacity ${rapidez}s ease`;
    elemento.style.display = display;
    setTimeout(()=>{
        elemento.style.opacity = "1";
    },retardo);    
}

function fadeOut(elemento,rapidez,retardo) {    
    elemento.style.transition = `opacity ${rapidez}s ease`;    
    setTimeout(()=>{
        elemento.style.opacity = "0";
    },retardo);    
}

