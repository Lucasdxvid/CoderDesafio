//! Las clases son "funciones especiales", La clase es el concepto abstracto de un objeto, mientras que el objeto es el elemento final que se basa en la clase
//? Ej: tendriamos el objeto pato y raton que estarán definidas en la clase Animal : color, sonido que emiten, nombre, etc.
class TicketManager {
  //? Una VARIABLE PRIVADA son atributos que forman parte de la class TicketManager que no se pueden acceder desde fuera de esta clase, solo la accedemos desde nuestro class TicketManager
  #precioBaseGanancia = 0.15; // definimos el impuesto en una VAR PRIVADA
  //?Nuestra clase tiene un elemento esencial el cual es su constructor donde inicializamos nuestro array de eventos
  constructor() {
    //! Los atributos o propiedades de las clases los declaramos con un THIS
    this.eventos = []; // Los eventos se inicializiran vacion (array vacio)
  }

  //! Creamos METODOS custom que tienen diferentes funciones
  getEventos = () => {
    return this.eventos;
  }; // Este custom metodo retorna el listado de nuestros eventos

  agregarEventos = (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toDateString()
  ) => {
    //! Recordemos que nuestro EVENTO al final es un objeto que representa algo (evento)
    const evento = {
      nombre, // No es necesario colocar nombre: nombre ya que no cambia el nombre de nuestra variable, no se necesita repetir
      lugar,
      precio: precio + precio * this.#precioBaseGanancia, // El precio es el valor (500 + 75 que daria al multiplicar precio x 0.15 de iva)
      capacidad,
      fecha,
      participantes: [],
    };

    // Le damos una ID autoincrementable (id 1, 2, etc)
    if (this.eventos.length === 0) {
      evento.id = 1; //? Evitamos que nuestro id sea 0 por default
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1; //Accedemos al ultimo id y le restamos -1 debido a que siempre la longitud de los arrays es 1+ a lo que tenemos en nuestro array y luego colocamos el .id + 1 autoincrementando  asi la id
    }

    this.eventos.push(evento); //? Por ultimo insertamos el evento que creamos a nuestra lista de eventos
  }; // Este metodo recibe parametros / atributos como nombre, lugar, capacidad (50 default) precio (con iva), etc.
  // Este metodo ademas tiene que crear campos de id autoincrementados y otro de participantes que inicia con un array vacio
  //? El capacidad tiene 50 por default en el parametro capacidad = 50 (Eso se coloca por default si no le asignamos un valor)
}

//! Por ultimo, para usar los metodos de nuestra class "TicketManager" tenemos que hacer una "INSTANCIA" de la misma
//Con NEW creamos la instancia de nuestra clase
const manejadorEventos = new TicketManager();
//! Al crear la instancia ya podemos acceder a los custom metodos de nuestra clase

manejadorEventos.agregarEventos("Evento CoderHouse", "Argentina", 200, 5000); // La fecha la dejamos por default (tiempo real) por lo que no enviamos un parametro
manejadorEventos.agregarEventos("Evento RollingCode 1", "Peru", 500, 3500); // La fecha la dejamos por default (tiempo real) por lo que no enviamos un parametro

//! Ahora con el custom metodos "getEventos" podemos retornar y mostrar nuestros eventos

console.log(manejadorEventos.getEventos());
