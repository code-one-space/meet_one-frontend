import style from "./answerSurveyModal.style";
import {ScrollView, Text, View, TextInput} from "react-native";
import Button from "../../buttons/button"
import SurveyAnswerCheckbox from "../../buttons/surveyAnswerCheckbox";
import Modal from "react-native-modal";
import {useState} from "react";
import * as HttpClient from "../../../shared/httpClient/httpClient";

export default function AnswerSurveyModal({ onRequestClose, userName, survey, ...rest }) {
    let title = "Submit answers";

    const [answerTextField, setAnswerTextField] = useState("");
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    let choicesComponents = survey.choices.map((choice, index) => {
        return <SurveyAnswerCheckbox
            key={index}
            white={true}
            title={choice}
            selectedAnswers={selectedAnswers}
            onPress={() => handleAnswerSelect(choice)}/>
    })

    function handleAnswerSelect(answer) {
        if (selectedAnswers.filter(current => answer == current).length == 0)
            setSelectedAnswers([...selectedAnswers, answer]);
        else
            setSelectedAnswers(selectedAnswers.filter(current => answer != current))
    }

    function handleSubmitAnswers() {
        let answersToSubmit = selectedAnswers; // due to state vars refreshing at end of function
        if (answerTextField.length != 0)
            answersToSubmit = [...answersToSubmit, answerTextField];
        if (answersToSubmit.length != 0)
            HttpClient.submitAnswer(survey.id, answersToSubmit.map(current => { return { memberName: userName, answer: current }}))
        setSelectedAnswers([]);
        setAnswerTextField("");
        onRequestClose();
    }

    return (
        <Modal
            onRequestClose={onRequestClose}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={1.0}
            style={{ margin: 0 }}
            {...rest}>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Text style={style.title}>{title}</Text>
                    <ScrollView contentContainerStyle={style.listItems} style={style.list}>
                        {choicesComponents}
                        <TextInput
                            key={-1}
                            style={style.textInput}
                            value={answerTextField}
                            onChangeText={setAnswerTextField}
                            placeholder={"Other Choice"}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={100}
                        />
                    </ScrollView>
                    <View style={style.buttonContainer}>
                        <Button
                            title={"Cancel"}
                            white={true}
                            onPress={() => { setAnswerTextField(""); setSelectedAnswers([]); onRequestClose(); }}
                            buttonStyle={style.button}/>
                        <Button title={"Submit"} white={true} onPress={handleSubmitAnswers} buttonStyle={style.button}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
