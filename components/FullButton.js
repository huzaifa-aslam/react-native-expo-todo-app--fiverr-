import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Theme from "../src/Theme";

function FullButton({disabled,handlePress,label,type}){

  const colors =
    type === 2
      ? ["#06D0B8", "#0BB7A2"]
      : type === 3
      ? ["#EFE974", "#F6B209"]
      : type === 4
      ? [Theme.lightBlackColor, Theme.lightBlackColor]
      : ["#7F0CFF", "#4D069B"]

    return (
      <TouchableOpacity disabled={disabled ? disabled : false} onPress={handlePress}>
        <LinearGradient
          colors={disabled ? ['grey','grey'] : colors}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );}
export default FullButton;

const styles = StyleSheet.create({
    container: {
        height:52,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    text:{
        fontSize:19,
        color:'#FFF'
    }
});