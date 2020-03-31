import React, {useState} from 'react';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'


export default function Logon (){

    
    const[id, setID] = useState('');
    const history=useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions',{id})
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nome);
            history.push('/profile')
        }
        catch(err){
            alert('Falha no login tente novamente');
        }
    }
    return(

        <div className="logon-container" >
            <section className="form">
            <img src={logoImg}alt="Be the hero"/>
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input
                    placeholder="Sua ID"
                    value={id}
                    onChange={e=>setID(e.target.value)}                
                ></input>

                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to ="/register">
                    <FiLogIn size={16} color="#e02041"></FiLogIn>
                    Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src={heroesImg}alt="Heroes"/>
        </div>
        
    )
}