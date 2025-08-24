import "./style.css";
import noTransactions from "../../images/noTransactions.png";
import { Link } from "react-router-dom";

export const NoTransactions = () => {

    return(
        <div className="noTransactionsContainer ">
            <img className="noTransactionsImg" src={noTransactions} alt="Sem transações" />
            <h1>Você ainda não tem transações</h1>
            <p>As transações criadas serão exibidas aqui</p>
            <Link className="createButton" to={"/create"} >Criar Transação</Link>
        </div>
    );
};