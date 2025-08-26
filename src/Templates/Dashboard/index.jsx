import './style.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NoTransactions } from '../../Components/NoTransactions';
import { Link, useNavigate } from 'react-router-dom';


export const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const token = localStorage.getItem("Authorization");
    const navigate = useNavigate();

    const fetchTransactions = async () => {
            try{
                const response = await fetch("https://financa-facil-g3n2.onrender.com/api/dashboard", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                });

                if(!response.ok) {
                    throw new Error("Erro ao buscar as transações");
                }

                const data = await response.json();
                console.log(data);
                setTransactions(data);

            } catch (error) {
                toast.error(error.message);
            }
        };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        const totalCalculate = () => {
            
            let totalc = 0;
            let totalIn = 0;
            let totalEx = 0;

            transactions.forEach((t) => {

                if(t.type === 'income') {
                    totalc += Number(t.amount);
                    totalIn += Number(t.amount);
                }

                if(t.type === 'expense') {
                    totalc -= Number(t.amount);
                    totalEx += Number(t.amount);
                }

            });
            
            setTotal(totalc);
            setTotalIncome(totalIn);
            setTotalExpense(totalEx);
            
        };

        totalCalculate();

    }, [transactions]);

    const handleDelete = async (id) => {

        try {
            const response = await fetch(`https://financa-facil-g3n2.onrender.com/api/transaction/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if(!response.ok) {
                throw new Error ("Erro ao excluir transação");
            }

            toast.success("Transação excluída");
            fetchTransactions();

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleLogOut = async () => {
        await fetch("https://financa-facil-g3n2.onrender.com/api/logout", {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
        });

        localStorage.removeItem("Authorization");
        navigate("/");
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return(
        <div className='container containerMediaDash dashboardBackgroundImg'>
            <div className='dashboardContainer'>

                <div className='dashboardHeader'>
                    <h1>FinancaFacil</h1>
                    <input style={{backgroundColor: "#448859"}} className='logOutButton' type="submit" value="Sair" onClick={handleLogOut}/>
                </div>
                
                <div className='dashboardTop'>
                    <div className='dashboardTopDiv'>
                        <div className='valueTopDiv'>
                            <p>Total</p>
                        </div>
                        <div className='valueDiv'>
                            <p>R$ {total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='dashboardTopDiv'>
                        <div className='valueTopDiv'>
                            <p style={{color: "green"}}>Total Entrada</p>
                        </div>
                        <div className='valueDiv' style={{color: "green"}}>
                            <p>R$ {totalIncome.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='dashboardTopDiv'>
                        <div className='valueTopDiv'>
                            <p style={{color: "red"}}>Total Saída</p>
                        </div>
                        <div className='valueDiv' style={{color: "red"}}>
                            <p>R$ {totalExpense.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className='midDashboard'>
                    <Link to="/create" className='addButton' > + </Link>
                </div>

                {!transactions || transactions.length === 0 ? (<NoTransactions />) : (
                     
                        <div className='transactionsContainer'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Tipo</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => {
                                        return (
                                            <tr className="transaction" key={transaction.id}>
                                                <td>{transaction.title}</td>
                                                {transaction.type === "income" ? 
                                                    <td style={{color: "green"}}>R$ {transaction.amount}</td> : <td style={{color: "red"}}>R$ {transaction.amount}</td> 
                                                }
                                                {transaction.type === "income" ? 
                                                    <td style={{color: "green"}}>Entrada</td> : <td style={{color: "red"}}>Saída</td> 
                                                }
                                                <td style={{color: "rgb(73, 73, 73)"}}>{transaction.date}</td>
                                                <div className='transactionButtons'>
                                                    <input style={{backgroundColor: "orange"}} type="submit" value="Editar" onClick={() => handleEdit(transaction.id)} />
                                                    <input style={{backgroundColor: "rgb(255, 61, 61)"}} type="submit" value="Excluir" onClick={() => handleDelete(transaction.id)} />
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    
                )}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};