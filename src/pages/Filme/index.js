import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme-info.css';
import star from './star.svg';
import starblue from './star-blue.svg';
import flame from './flame.svg';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate()

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);



    useEffect(()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'f940f060364571b8891c1abd3d937253',
                    language: 'pt-BR',
                    
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme Não Encontrado");
                navigate('/', {replace: true});
                return;
            })
        }
        loadFilme();

        

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [ navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@reactflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na lista.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@reactflix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo com Sucesso ;)")
    }
   
        
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }




    return(
        
        <section className='bg' style={{ 
            background: `url(https://image.tmdb.org/t/p/original/${filme.poster_path})`,
            backgroundPosition: '0px',
            backgroundRepeat:'no-repeat',
            width:'100%',
            backgroundSize:'100%',
            }}>
        <div className='grid-container' >
                    
            <h1 className='title'>{filme.title} <a>(2022)</a> </h1>
            <div className='moreinfo'>
                <ul className='moreinfo-lista' >
                    <h4>14</h4>
                    <p>{filme.release_date}</p>
                    <li>Genres</li>
                    <li>Duration</li>
                </ul>
            </div> 
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title}`}>Relacionados no YouTube</a>
                </button>
            </div>
                

                <div className='img-film'>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}  />
                </div>
                
           
            
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                
                <div className='avaliacao-box'>
                    <div className='avaliacao'>
                        <p>Avaliação da IMDb</p>
                        <div className='avaliacao-item'>
                            <img src={star}/> 
                        <strong>{filme.vote_average}</strong><a>/10</a>
                        </div>
                    </div>
                    <div className='avaliacao' >
                        <p>Sua Avaliação</p>
                        <div className='avaliacao-item'>
                            <img src={starblue}/> 
                        <a>Avaliar</a>
                        </div>
                    </div>
                    <div className='avaliacao' >
                        <p>Popularidade</p>
                        <div className='avaliacao-item'>
                            <img src={flame}/> 
                        <strong>{filme.popularity}</strong>
                        </div>
                    </div>
                </div>

                <div className='trailer-box'>
                    <iframe  src="https://www.youtube.com/embed/oLCeh_pqjes" frameborder="0" allowfullscreen></iframe>
                    {/* https://www.googleapis.com/youtube/v3/search?part=snippet&q=trailer&topicId=%2Fm%2F02vxn&key=AIzaSyCrQ-S8alEaMLVD5KfC1kcfEIsyUMU8FLc */}
                    {/* AIzaSyCrQ-S8alEaMLVD5KfC1kcfEIsyUMU8FLc */}
                </div>
                
                
            
           
        </div>
        
        </section>
      
    )
}

export default Filme;