import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
const [filmes,setFilmes]= useState([])

useEffect(()=> {
    const minhaLista = localStorage.getItem("@reactflix");
    setFilmes(JSON.parse(minhaLista) || [])
}, [])

function excluirFilme(id){
    let filtroFilmes = filmes.filter( (item) => {
        return (item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem("@reactflix",JSON.stringify(filtroFilmes))
    toast.success("Filme Removido com Sucesso ;P");
}

    return(
        <div className='seus-filmes'>
            <h1>Seus Filmes</h1>

            {filmes.length === 0 && <span> Você não possui nenhum filme salvo ;( </span>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}> Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;