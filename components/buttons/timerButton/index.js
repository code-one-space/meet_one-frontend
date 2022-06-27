import {View, Text,TouchableOpacity} from 'react-native';
import style from './timerButton.style';



export default function TimerButton ({ onPress,time}) {


    return (
        <TouchableOpacity onPress={onPress}>

            <View style={style.container}>

                <View style={style.text}>
                    <Text style={style.text}>{time}</Text>
                </View>

            </View>

        </TouchableOpacity>

    );
}
