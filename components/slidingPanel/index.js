import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
} from 'react-native';
import style from './slidingpanel.style';
import SlidingPanel from 'react-native-sliding-up-down-panels';


const { width, height } = Dimensions.get('window');

export default function  SlidingUpPanel () {
    return (
        <View style={style.container}>
            <SlidingPanel
                headerLayoutHeight = {100}
                headerLayout = { () =>
                    <View style={style.headerLayoutStyle}>
                        <Text style={style.commonTextStyle}>My Awesome sliding panel</Text>
                    </View>
                }
                slidingPanelLayout = { () =>
                    <View style={style.slidingPanelLayoutStyle}>
                        <Text style={style.commonTextStyle}>The best thing about me is you</Text>
                    </View>
                }
            />
        </View>
    );
}
