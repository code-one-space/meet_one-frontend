import style from './button.style';
import Button from "../button"

// currently unused; for future buttons
export default function ActionButton ({ onPress, title, white, spamProtection }) {
    return (
        <Button onPress={onPress ?? undefined} title={title ?? ""} white={white} spamProtection={spamProtection} buttonStyle={style.button} textStyle={style.text} />
    )
}
