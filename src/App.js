import React, {useState,useEffect} from 'react';
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(()=>{
    if(busqueda === "") return;
    const consultarApi = async () =>{
      const imagenesPorPagina = 30;
      const key= `${process.env.REACT_APP_KEY}`
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      //guardar el total de paginas en el state guardarTotalPaginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits/imagenesPorPagina))
    }
    consultarApi();

  },[busqueda])


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}/>
      </div>
    </div>
  );
}

export default App;
