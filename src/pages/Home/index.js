import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';
 //URL DA API: /movie/now_playing?api_key=f940f060364571b8891c1abd3d937253&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'f940f060364571b8891c1abd3d937253',
                    language: 'pt-BR',
                    page:1,
                }
            })
            
            // console.log(response.data.results.slice(0,10));
            // setFilmes(response.data.results.slice(0,10));
            setFilmes(response.data.results);
            setLoading(false);
        }

        loadFilmes();
    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }


    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=> {
                    return(
                       
                        <article key={filme.id}  className='grid-filmes'>
                            <strong className='title'>{filme.title}</strong>
                            <div className='film-box' >
                                <img  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Assistir</Link>
                            </div>
                           
                        </article>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Home;