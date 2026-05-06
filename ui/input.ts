import { InputRenderable, type InputRenderableOptions } from "@opentui/core";
import { renderer } from "../lib/renderer";
import { theme, type Theme } from "../lib/theme";

type InputVariantConfig = {
    backgroundColor: string;
    focusedBackgroundColor: string;
    textColor: string;
    focusedTextColor: string;
    placeholderColor: string;
};

export function Input(props) {
    return new InputRenderable(renderer, {
        width: 24,
        placeholder: props.placeholder,
        cursorColor: theme.colors.ring,
    });
}
