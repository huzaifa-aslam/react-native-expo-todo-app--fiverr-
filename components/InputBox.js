import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from "react-native";
import Theme from "../src/Theme";


function InputBox({secureTextEntry,multiline,placeholder,leftIcon,keyboardType,maxLength,label,onChangeText,value}){
    return (
      <View>
        {
            label ?
            <Text style={styles.label}>
            {label}
            </Text>
            :
            null
        }
        <View style={[styles.container,,{height:multiline ? 80 : 50,
        alignItems:multiline ? 'flex-start' : 'center'}]}>
        {
            leftIcon
            ?
            <Image source={leftIcon} style={styles.img} />
            :
            null
        }
        <TextInput
          secureTextEntry={secureTextEntry?secureTextEntry:false}
          value={value}
          multiline={multiline?multiline:false}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholderTextColor={Theme.lightTextColor}
          style={[styles.input]}
          placeholder={placeholder}
          autoCapitalize="none"
        />
      </View>
      </View>
    );}
export default InputBox;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       height:50,
       backgroundColor:Theme.lightBlackColor,
       borderRadius:5,
       alignItems:'center',
       paddingHorizontal:15,
       flexDirection:'row',
       paddingVertical:5
    },
    input:{
        width:'100%',
        fontSize:16,
        color:'#fff',
        textTransform:'lowercase'
    },
    img:{
        height:17,
        width:17,
        resizeMode:'contain',
        marginRight:15
    },
    label:{

        marginBottom:10,
        fontSize:16,
        color:Theme.lightTextColor
    }
});