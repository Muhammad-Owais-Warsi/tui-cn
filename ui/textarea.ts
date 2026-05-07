import {
    TextareaRenderable,
    BoxRenderable,
    TextRenderable,
} from "@opentui/core";

export class TextareaField extends BoxRenderable {
    textarea!: TextareaRenderable;
}

import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

type LabelDirection = "row" | "column";

type TextareaProps = {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    width?: number;
    height?: number;
    placeholder?: string;
    defaultValue?: string;
    wrapMode?: "none" | "word" | "char";
};
export function Textarea(props: TextareaProps): TextareaField {
    const ctx = getRenderer();

    const container = new TextareaField(ctx, {
        id: `${props.id}-container`,
        flexDirection: props.labelDirection ?? "row",
        columnGap: 1,
        marginBottom: tokens.spacing.stackGap,
        alignItems: props.labelDirection === "column" ? "flex-start" : "center",
    });

    if (props.label) {
        const labelText = new TextRenderable(ctx, {
            id: `${props.id}-label`,
            content: props.label.padEnd(tokens.components.label.width),
            fg: tokens.components.label.color,
        });
        container.add(labelText);
    }

    const textarea = new TextareaRenderable(ctx, {
        id: `${props.id}-textarea`,
        width: props.width ?? 50,
        height: props.height ?? 6,
        placeholder: props.placeholder ?? undefined,
        backgroundColor: tokens.components.field.background,
        focusedBackgroundColor: tokens.components.field.focusedBackground,
        textColor: tokens.components.field.text,
        focusedTextColor: tokens.components.field.text,
        cursorColor: tokens.components.field.cursor,
        placeholderColor: tokens.components.field.placeholder,
        initialValue: props.defaultValue,
        wrapMode: props.wrapMode ?? "word",
    });

    container.add(textarea);
    container.textarea = textarea;

    return container;
}
