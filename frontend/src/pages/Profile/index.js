import React, {useEffect, useState} from 'react';
import LogoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiPower} from 'react-icons/fi'
import './styles.css';
import api from '../../services/api';
export default function Profile (){

const history=useHistory();

const[Incidents,setIncidents]=useState([]);
const ongName = localStorage.getItem('ongName');
const ongID = localStorage.getItem('ongId');


function handleLogout(){

    localStorage.clear();
    history.push('/')
}
async function handleDelete(id){
    try{
        await api.delete(`incidents/${id}`, {
            headers:{
                auth: ongID,
            }
        });
        setIncidents(Incidents.filter(incident => incident.id!==id));
    }
    catch(error){
        alert('Erro ao deletar caso. tente novamente')
    }
}
useEffect(()=>{
    api.get('/profile', {headers:{
        auth: ongID
    }

}).then(response=>{
    setIncidents(response.data)
})
},[ongID])


return(

    <div className="profile-container">
        <header>
            <img src={LogoImg} alt="Be the Hero"/>

            <span>Bem Vindo, {ongName} </span>

            <Link className="button" to= '/incidents/new'> Cadastrar novo incidente</Link>
            <button onClick={handleLogout} type='button'>
                <FiPower size={18} color='#E02041'/>
            </button>


        </header>
        <h1>Casos Cadastrados</h1>
        <ul>
            {Incidents.map(incident => (

                <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRICAO:</strong>
                <p>{incident.description}</p> 

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-br',{style:'currency', currency:'BRL'}).format(incident.value)} </p>
                <button onClick={()=> handleDelete(incident.id)} type='button'>
                    <FiTrash2 size={20} color='#A8A8B3'/>
                </button>
                </li>
            ))}
          
        </ul>
    </div>
)

}