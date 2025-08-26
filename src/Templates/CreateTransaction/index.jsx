import { toast, ToastContainer } from "react-toastify";
import "./style.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CreateTransaction = () => {

    const { id } = useParams();

    const token = localStorage.getItem("Authorization");

    const [ title, setTitle ] = useState('');
    const [ type, setType ] = useState('income');
    const [ amount, setAmount ] = useState("");
    const [ date, setDate ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            fetch(`https://financa-facil-g3n2.onrender.com/api/transaction/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setType(data.type);
                setAmount(data.amount);
                setDate(data.date);
            });
        }
    }, [id]); // eslint-disable-line

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const url = id ? `https://financa-facil-g3n2.onrender.com/api/transaction/${id}` : "https://financa-facil-g3n2.onrender.com/api/transaction/store";

        if(title === "" || amount === "" || date === "") {
            toast.error("Preencha todos os campos");
            return;
        }

        if(isNaN(amount)) {
            toast.error("O campo valor só aceita números");
            return;
        }

        try {


            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({
                    title: title,
                    type: type,
                    amount: Number(amount),
                    date: date,
                }),
            });
            
            const message = id ? "Erro ao tentar editar a transação" : "Erro ao tentar criar transação";

            if(!response.ok) {
                throw new Error(message);
            }
            
            id ? toast.success("Transação editada com sucesso!") : toast.success("Transação criada com sucesso!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1300);


        } catch (error) {
            toast.error(error.message);
        }

    };

    const color = id? "orange" : "";

    return (
        <div className="createContainer" >
            <div style={{width: "100%", marginTop: "40px"}}>
                <h1 style={{color: "#1c6632"}}>Nova Transação</h1>
            </div>

            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>    
                <form onSubmit={handleSubmit} className="createForm">
                    <label htmlFor="title">Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" placeholder="Titulo da transação"/>
                    <label htmlFor="amount">Valor</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} name="amount" id="amount" placeholder="R$ 0,00" />
                    <label htmlFor="type">Tipo</label>
                    <select value={type} className="createSelect" onChange={(e) => setType(e.target.value)} name="type" id="type">
                        <option value="income">Entrada</option>
                        <option value="expense">Saída</option>
                    </select>
                    <label htmlFor="date">Data</label>
                    <input value={date} className="createSelect" onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" />
                    <input type="submit" value="Salvar" style={{backgroundColor: `${color}`}} className="saveButton"/>
                    <Link to="/dashboard">Cancelar</Link>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};