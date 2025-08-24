import "./style.css";

export const CreateTransaction = () => {

    return (
        <div className="createContainer" >
            <div style={{width: "100%", marginTop: "40px"}}>
                <h1 style={{color: "#1c6632"}}>Nova Transação</h1>
            </div>

            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>    
                <form className="createForm">
                    <label htmlFor="title">Título</label>
                    <input type="text" name="title" id="title" placeholder="Titulo da transação"/>
                    <label htmlFor="amount">Valor</label>
                    <input type="text" name="amount" id="amount" placeholder="R$ 0,00" />
                    <label htmlFor="type">Tipo</label>
                    <select className="createSelect" name="type" id="type">
                        <option value="income">Entrada</option>
                        <option value="expense">Saida</option>
                    </select>
                    <label htmlFor="date">Data</label>
                    <input className="createSelect" type="date" name="date" id="date" />
                    <input type="submit" value="Salvar" className="saveButton"/>
                </form>
            </div>
        </div>
    );
};