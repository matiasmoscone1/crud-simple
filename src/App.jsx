import { useState, useRef } from "react"


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
 
  const [productos, setProductos] = useState(dbProductos);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");
  const [nuevoModelo, setNuevoModelo] = useState("");

  const [validacion, setValidacion] = useState("");

  const nombreInput = useRef(null);
  const colorInput = useRef(null);
  const modeloInput = useRef(null);
  

  const removerArticulo = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  }


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
    }else{
      setValidacion("Debe completar todos los campos antes de agregar un producto");
      setTimeout(() => {
        setValidacion("");
      }, 3000);
    }

    var input = document.getElementById("validacionModelo");
    input.oninvalid = (e) => e.target.setCustomValidity("El modelo debe ser entre 2000 y 2023");
    
  }

  const editarArticulo = (producto) => {

    const index = productos.findIndex((producto) => producto.id === productoSeleccionado.id);

    const nuevosProductos = [...productos];

    nuevosProductos[index] = producto;

    setProductos(nuevosProductos);
    setProductoSeleccionado({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    nombreInput.current.value = "";
    colorInput.current.value = "";
    modeloInput.current.value = "";
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
                    <button onClick={() => {setProductoSeleccionado(producto)}}>✏️</button>
                    <button onClick={() => removerArticulo(producto.id)}>🗑️</button>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>
    </div>
    
    <div className="form-container">

    <form onSubmit={handleSubmit}>
      <input required type="text" value={nuevoNombre} placeholder="Nombre del Articulo" onChange={(e) => setNuevoNombre(e.target.value)}/>
      <input required type="text" value={nuevoColor} placeholder="Color" onChange={(e) => setNuevoColor(e.target.value)}/>
      <input required type="number" min="2000" max="2023" id="validacionModelo" value={nuevoModelo} placeholder="Modelo" onChange={(e) => setNuevoModelo(e.target.value)}/>
      <button type="button" onClick={() => {agregarArticulo(nuevoNombre, nuevoColor, nuevoModelo)}}>Agregar</button>
    </form>

    
    <form onSubmit={handleSubmit} >
      <input required type="text" ref={nombreInput} value={productoSeleccionado.nombre} placeholder="Nombre del Articulo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, nombre: e.target.value})}/>
      <input required type="text" ref={colorInput} value={productoSeleccionado.color} placeholder="Color" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, color: e.target.value})}/>
      <input required type="number" min="2000" max="2023" id="validacionModelo" ref={modeloInput} value={productoSeleccionado.modelo} placeholder="Modelo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, modelo: e.target.value})}/>
        
      <button type="submit" onClick={() => editarArticulo(productoSeleccionado)}>Actualizar</button>
    </form>

    <span>{validacion}</span>

    </div>


    </div>
   )
}

export default App
