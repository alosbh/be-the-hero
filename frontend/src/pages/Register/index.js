import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

export default function(){

    const[nome,setName] = useState('');
    const[email,setEmail] = useState('');
    const[whatsapp,setWhatsapp] = useState('');
    const[city,setCity] = useState('');
    const[UF,setUf] = useState('');

    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            nome,
            email,
            whatsapp,
            city,
            UF,
        }
        try {
            
            const response = await api.post('/ongs',data);
            console.log(response);

            alert(`Seu id de acesso: ${response.data.id}`)
            history.push('/');
        }
        catch(err){
            alert('Erro no cadastro. tente novamente');
        }

    }

    return (

        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"></img>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas e encontrarem os casos da sua ONG</p>
                        <Link className="back-link" to ="/">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                        Voltar
                        </Link>
                </section>
                <form onSubmit={handleRegister}> 
                        <input 
                            placeholder="Nome da Ong" 
                            value={nome}
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="email" 
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            placeholder="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        
                            />
                        <div className="input-group">
                            <input 
                                placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <input 
                                placeholder="UF" 
                                style={{width: 80}}
                                value={UF}
                                onChange={e => setUf(e.target.value)}

                            />
                        </div>
                        <button className="button" type="Submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}