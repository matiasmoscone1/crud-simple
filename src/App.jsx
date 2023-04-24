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

    setProductos([...productos, nuevoArticulo]);
    setNuevoNombre("");
    setNuevoColor("");
    setNuevoModelo("");
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
    <> 
    
    <h2>Hola</h2>

    <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
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
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.color}</td>
                  <td>{producto.modelo}</td>
                  <td>
                    <button onClick={() => {setProductoSeleccionado(producto)}}>Editar</button>
                    <button onClick={() => removerArticulo(producto.id)}>Eliminar</button>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>
    </div>
    
    <div>
      <input type="text" value={nuevoNombre} placeholder="Nombre del Articulo" onChange={(e) => setNuevoNombre(e.target.value)}/>
      <input type="text" value={nuevoColor} placeholder="Color" onChange={(e) => setNuevoColor(e.target.value)}/>
      <input type="text" value={nuevoModelo} placeholder="Modelo" onChange={(e) => setNuevoModelo(e.target.value)}/>
      <button onClick={() => {agregarArticulo(nuevoNombre, nuevoColor, nuevoModelo)}}>Agregar</button>
    </div>

    
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nombreInput} value={productoSeleccionado.nombre} placeholder="Nombre del Articulo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, nombre: e.target.value})}/>
      <input type="text" ref={colorInput} value={productoSeleccionado.color} placeholder="Color" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, color: e.target.value})}/>
      <input type="text" ref={modeloInput} value={productoSeleccionado.modelo} placeholder="Modelo" onChange={(e) => setProductoSeleccionado({...productoSeleccionado, modelo: e.target.value})}/>
        
      <button type="submit" onClick={() => editarArticulo(productoSeleccionado)}>Actualizar</button>
    </form>
    </>
   )
}

export default App
