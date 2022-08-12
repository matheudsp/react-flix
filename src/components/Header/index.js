import './header.css';
import { Link } from 'react-router-dom';
import favorite  from './favorite.svg';
function Header(){
    return(
        <header>
            <Link className='logo' to='/'>React Flix</Link>
            <div>
                
                <Link className='favoritos'  to='/favoritos'><img className='favorite' src={favorite}/> Lista de Favoritos</Link>
                <Link className='login' to='/login'>Fazer login</Link>
            </div>
            
        </header>
    )
}

export default Header;