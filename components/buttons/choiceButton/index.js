import style from './button.style';
import Button from "../button"

export default function ChoiceButton ({ onPress, title, white }) {
    return (
        <Button onPress={onPress ?? undefined} title={title ?? ""} white={white} spamProtection={true} buttonStyle={style.button} textStyle={style.text} />
    )
}
