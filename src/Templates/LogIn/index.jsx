import './style.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';



export const LogIn = () => {

    const [formLogInData, setFormLogInData] = useState({
    
            email: '',
            password: ''
    
        });
        
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormLogInData({
            ...formLogInData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formLogInData)
            });

            const data = await response.json();

            if (response.ok) {
            
                localStorage.setItem("Authorization", "Bearer " + data.access_token);
                
                toast.success("Usuário Logado!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);

            } else {
                toast.error(data.message || "Erro ao tentar fazer Login");
            }
        } catch (error) {
            toast.error("Erro na requisição " + error);
        }
    };
    
    return(
         <div className='container containerMedia backgroundIn'>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 style={{marginBottom: "15px", color: "#448859"}}>Entrar</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={formLogInData.email} onChange={handleChange} placeholder='example@email.com' />
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" value={formLogInData.password} onChange={handleChange} placeholder='Sua senha' />
                <input type="submit" className='in_button' value="Entrar" style={{background: "#448859", color: "white", marginTop: "10px", border: "none"}} />
                <Link to={"/sign-up"} >Cadastre-se</Link>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};