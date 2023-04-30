import { useState, useRef} from "react"



//Base de datos inicial, estatica.
const dbProductos = [{
    id: 1,
    nombre: "Teclado",
    color: "Blanco",
    modelo: "2014"
  },
  {
    id: 2,
    nombre: "Mouse",
    color: "Negro",
    modelo: "2017"
  },
  {
    id: 3,
    nombre: "Monitor",
    color: "Negro",
    modelo: "2020"
  },
  {
    id: 4,
    nombre: "Taza",
    color: "Azul",
    modelo: "2022"
  }
]


function App() {
 
  //Declaracion de variables de productos y producto para editar. 
  const [productos, setProductos] = useState(dbProductos);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});

  //Declaracion de variables para agregar un nuevo producto a la tabla.
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");
  const [nuevoModelo, setNuevoModelo] = useState("");

  //Declaracion de variable de validacion al agregar producto.
  const [validacion, setValidacion] = useState("");

  //Declaracion de variables de hook useRef para borrar los inputs al agregar un nuevo producto.
  const nombreInput = useRef(null);
  const colorInput = useRef(null);
  const modeloInput = useRef(null);
  
  //Funcion para eliminar un producto de la tabla (pasado el id del producto como parametro al
  //apretar el boton elimnar).
  const removerArticulo = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  }

  //Funcion para agregar articulo, recibe los nuevos estados de las variables declaradas anteriormente
  //y las agrega a un nuevo objeto producto, despues agrega el producto al array de la base de datos
  const agregarArticulo = (nuevoNombre, nuevoColor, nuevoModelo) => {
    const idNueva = new Date().getTime(); 

    const nuevoArticulo = {
      id: idNueva,
      nombre: nuevoNombre,
      color: nuevoColor,
      modelo: nuevoModelo
    }
    //Validacion de inputs al agregar producto.
    if((nuevoNombre && nuevoColor !== "") && (nuevoModelo >= 2000 && nuevoModelo <= 2023)){
      setProductos([...productos, nuevoArticulo]);
      setNuevoNombre("");
      setNuevoColor("");
      setNuevoModelo("");
      //Toma la id del formulario de agregar producto (con vanilla js) y le "saca" 
      //la validacion del atributo validate.
      const formulario = document.getElementById("formulario");
      formulario.setAttribute("novalidate", true);
    }else{
      //Setea el estado de validacion al no completar todos los campos y agrega un setTimeout 
      //que dura 3 segundos y limpia de nuevo el estado de la validacion.
      setValidacion("Debe completar todos los campos antes de agregar un producto");
      setTimeout(() => {
        setValidacion("");
      }, 3000);
    }

    //Variable para manipular el titulo de la validacion del modelo nuevo, con vanilla js 
    var input = document.getElementById("validacionModelo");
    input.oninvalid = (e) => e.target.setCustomValidity("El modelo debe ser entre 2000 y 2023");
   
  }

  //Funcion para editar articulo, pasa el articulo seleccionado por parametro.
  const editarArticulo = (producto) => {
    //Busca el prod. en la tavla, si tiene el mismo indice que el producto seleccionado
    const index = productos.findIndex((producto) => producto.id === productoSeleccionado.id);

    //Clona la base de datos en un nuevo array.
    const nuevosProductos = [...productos];

    //Reemplaza el producto que se encontraba anteiormente en el indice especifico y lo reemplaza
    //por el nuevo producto (editado).
    nuevosProductos[index] = producto;

    //Actualiza los estados de la bdd y el producto seleccionado.
    setProductos(nuevosProductos);
    setProductoSeleccionado({});
  }

  //Funcion que limpia el formulario con los useRef.
  const handleSubmit = (e) => {
    e.preventDefault();
    nombreInput.current.value = "";
    colorInput.current.value = "";
    modeloInput.current.value = "";
  }

  //Funcion que al editar un prodcuto, habilita los inputs para modificar dicho contenido del producto. 
  const activarInputsActualizar = () => {
    const form = document.getElementById("formulario-para-actualizar");

    //con vanilla js accede a todos los inputs del formulario y les remueve el atributo disabled.
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  }

  //Hace lo mismo que la funcion anterior de activarInputsActualizar pero esta vez pone los
  //atributos de los inputs en disabled (para que no se puedan utlizar a menos q le den editar producto).
  const desactivarInputsActualizar = () => {
    const form = document.getElementById("formulario-para-actualizar");

    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("disabled", true);
    });
  }

 

  return (
    <div className="main-container"> 
    
    <div className="table-container">
        <table border={1} className="table-crud">
          <thead>
            <tr>
              <th className="table-id">Id</th>
              <th>Articulo</th>
              <th>Color</th>
              <th>Modelo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              productos.map((producto) => {
                return(<tr key={producto.id}>
                  <td className="table-id">{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.color}</td>
                  <td>{producto.modelo}</td>
                  <td>
                    <button onClick={() => {setProductoSeleccionado(producto); activarInputsActualizar()}}>✏️</button>
                    <button onClick={() => removerArticulo(producto.id)}>🗑️</button>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>
    </div>
    
    <div className="form-container">

    <form onSubmit={handleSubmit} id="formulario">
      <input required type="text" value={nuevoNombre} placeholder="Nombre del Articulo" onChange={(e) => setNuevoNombre(e.target.value)}/>
      <input required type="text" value={nuevoColor} placeholder="Color" onChange={(e) => setNuevoColor(e.target.value)}/>
      <input required type="number" min="2000" max="2023" id="validacionModelo" value={nuevoModelo} placeholder="Modelo" onChange={(e) => setNuevoModelo(e.target.value)}/>
      <button type="submit" onClick={() => {agregarArticulo(nuevoNombre, nuevoColor, nuevoModelo)}}>Agregar</button>
      
    </form>

    <form onSubmit={handleSubmit} id="formulario-para-actualizar">
      <input className="formulario-actualziar" required disabled type="text" ref={nombreInput} value={productoSeleccionado.nombre} placeholder="Nombre del Articulo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, nombre: e.target.value})}/>
      <input className="formulario-actualziar" required disabled type="text" ref={colorInput} value={productoSeleccionado.color} placeholder="Color" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, color: e.target.value})}/>
      <input className="formulario-actualziar" required disabled type="number" min="2000" max="2023" id="validacionModelo" ref={modeloInput} value={productoSeleccionado.modelo} placeholder="Modelo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, modelo: e.target.value})}/>
        
      <button type="submit" onClick={() => {editarArticulo(productoSeleccionado); desactivarInputsActualizar()}}>Actualizar</button>
    </form>


    <span>{validacion}</span>
    
    </div>


    </div>
   )
}

export default App
