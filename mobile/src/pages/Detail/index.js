import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png'
import {Feather} from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'


export default function Detail(){

    const route= useRoute();
    const incident=route.params.incident;

    const navigation = useNavigation();
    const message = `Ola ${incident.nome}, estou entrando em contato para ajudar no caso ${incident.title} com o valor de ${incident.value}`
    function navigateBack(){

        navigation.goBack();
    }
    function sendWhatsapp(){

        Linking.openURL(`whatsapp://send?phone=5531995329152&text=${message}`)
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients:[incident.email],
            body: message,
        })
    };

    
    return(
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather 
                        name='arrow-left'
                        size={28}
                        color={'#e02041'}
                    />
                </TouchableOpacity>
                
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{marginTop:0}]}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.UF }</Text>
                <Text style={styles.incidentProperty}>Descricao:</Text>
                <Text style={styles.incidentValue}> {incident.description}</Text>
                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}
                        
                </Text>
                    
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
            
                <View style={styles.actions}>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>

                </View>
            
            </View>
        </View>
    )
}