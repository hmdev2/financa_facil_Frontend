import './style.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [formSignUpData, setFormSignUpData] = useState({

        name: '',
        email: '',
        password: ''

    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormSignUpData({
            ...formSignUpData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formSignUpData.name.length < 3) {
            toast.error("O nome deve ter mais de três letras.");
            return;
        }
        
        if(formSignUpData.password.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        if(!(/\d/.test(formSignUpData.password))) {
            toast.error("A senha deve conter pelo menos um número");
            return;

        }

        if(!(/[A-Z]/.test(formSignUpData.password))) {
            toast.error("A senha deve conter pelo menos uma letra maiúscula");
            return;
        }

        if(!(/[a-z]/.test(formSignUpData.password))) {
            toast.error("A senha deve conter pelo menos uma letra minúscula");
            return;
        }

        if(!(/[!@#$%^&*(),.?":{}|<>]/.test(formSignUpData.password))) {
            toast.error("A senha deve conter pelo menos um caractere especial");
            return;
        }

        try {
            const response = await fetch('https://financa-facil-g3n2.onrender.com/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formSignUpData)
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("Authorization", "Bearer " + data.access_token);
                
                toast.success("Usuário registrado!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);

            } else {
                toast.error(data.message || "Erro ao registrar o Usuário");
            }

        } catch (error) {
            toast.error("Erro na requisição " + error);
        }
    };

    return(
        <div className='container containerMedia backgroundIn'>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 style={{marginBottom: "15px", color: "#448859"}}>Registre-se</h1>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" id="name" value={formSignUpData.name} onChange={handleChange} placeholder='Seu nome' />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={formSignUpData.email} onChange={handleChange} placeholder='example@email.com' />
                <label htmlFor="password">Crie uma Senha</label>
                <input type="password" name="password" id="password" value={formSignUpData.password} onChange={handleChange} placeholder='Crie uma senha' />
                <input type="submit" className='in_button' value="Registrar" style={{background: "#448859", color: "white", marginTop: "10px", border: "none"}} />
                <Link to={"/log-in"} >Já tenho uma conta | Login</Link>

            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};