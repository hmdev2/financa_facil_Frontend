import './style.css';
import imgpresentation from '../../images/pagina_apresentacao.png';
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <div className='container containerMedia'>
            <div className='principal_presentation'>
                <div style={{marginBottom: "15px"}}>
                    <h1>Gerencie suas finanças com facilidade</h1>
                    <p>Uma maneira simples de monitorar suas receitas e despesas.</p>
                </div>
                <div className='signlog-in'>
                    <Link to="/log-in" className='in_button' style={{background: "#448859", color: "white"}} href=''>Log-in</Link>
                    <Link to="/sign-up" className='in_button' style={{color: "#448859"}} href=''>Cadastre-se</Link>
                </div>
            </div>
            <div className='img_presentation_container'>
                <img className='img_presentation' src={imgpresentation} alt="apresentação app" />
            </div>
        </div>
    );
};