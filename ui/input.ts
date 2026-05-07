import {
    BoxRenderable,
    TextRenderable,
    InputRenderable,
    InputRenderableEvents,
} from "@opentui/core";

export class InputField extends BoxRenderable {
    input!: InputRenderable;
}

import { tokens } from "../lib/theme";
import { getRenderer } from "../lib/renderer";

export type InputVariant = "default" | "ghost";
export type LabelDirection = "row" | "column";

export interface InputProps {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    placeholder?: string;
    variant?: InputVariant;
    width?: number;
    defaultValue?: string;
    onInput?: (value: string) => void;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
}

const variantMap: Record<
    InputVariant,
    {
        textColor: string;
        backgroundColor: string;
        focusedBackgroundColor: string;
        cursorColor: string;
        placeholderColor: string;
    }
> = {
    default: {
        textColor: tokens.components.field.text,
        backgroundColor: tokens.components.field.background,
        focusedBackgroundColor: tokens.components.field.focusedBackground,
        cursorColor: tokens.components.field.cursor,
        placeholderColor: tokens.components.field.placeholder,
    },
    ghost: {
        textColor: tokens.colors.dim,
        backgroundColor: "transparent",
        focusedBackgroundColor: "transparent",
        cursorColor: tokens.colors.dim,
        placeholderColor: tokens.colors.dim,
    },
};

export function Input({
    id,
    label,
    labelDirection = "row",
    placeholder = "",
    variant = "default",
    width = 24,
    defaultValue = "",
    onInput,
    onChange,
    onSubmit,
}: InputProps): InputField {
    const v = variantMap[variant];
    const ctx = getRenderer();

    const container = new InputField(ctx, {
        id: `${id}-container`,
        flexDirection: labelDirection,
        columnGap: 1,
        marginBottom: tokens.spacing.stackGap,
        alignItems: labelDirection === "column" ? "flex-start" : "center",
    });

    if (label) {
        const labelText = new TextRenderable(ctx, {
            id: `${id}-label`,
            content: label.padEnd(tokens.components.label.width),
            fg: tokens.components.label.color,
        });
        container.add(labelText);
    }

    const input = new InputRenderable(ctx, {
        id: `${id}-input`,
        placeholder,
        width: width,
        textColor: v.textColor,
        backgroundColor: v.backgroundColor,
        focusedBackgroundColor: v.focusedBackgroundColor,
        focusedTextColor: v.textColor,
        cursorColor: v.cursorColor,
        placeholderColor: v.placeholderColor,
    });

    if (defaultValue) {
        input.value = defaultValue;
    }

    if (onInput) {
        input.on(InputRenderableEvents.INPUT, (value: string) =>
            onInput(value),
        );
    }

    if (onChange) {
        input.on(InputRenderableEvents.CHANGE, (value: string) =>
            onChange(value),
        );
    }

    if (onSubmit) {
        input.on(InputRenderableEvents.ENTER, (value: string) =>
            onSubmit(value),
        );
    }

    container.add(input);
    container.input = input;

    return container;
}
