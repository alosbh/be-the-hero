import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View,FlatList,Image, Text, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles'
export default function Incidents(){

    const [total, setTotal] = useState(0);
    const [incidents,setIncidents] = useState('');
    const [page, setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        loadIncidents();
        
    },[]);

    async function loadIncidents(){

        if(loading){
            return;
        }
        if(total>0 && incidents.length === total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{
            params:{page}
        });
        
        setIncidents([...incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);

    }

    function navigatetoDetail(incident){

        navigation.navigate('Detail', {incident});
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
        

        <FlatList

            onEndReachedThreshold={0.2}
            onEndReached={loadIncidents}
            style={styles.incidentList}
            data={incidents}
            keyExtractor={incident=>String(incident.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item: incident})=>(
            
                <View  style={styles.incident}>
                    <Text style={styles.incidentProperty}>OssNG:</Text>
                    <Text style={styles.incidentValue}>{incident.nome}</Text>
                    <Text style={styles.incidentProperty}>Descricao:</Text>
                    <Text style={styles.incidentValue}> {incident.description}</Text>
                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}
                        
                    </Text>
                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={()=>navigatetoDetail(incident)}
                    >

                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                    
                </View>
            )}
        />
        
        </View>

    )
}