import { Box, Text, Input as TuiInput, delegate } from "@opentui/core";
import { tokens } from "../lib/theme";

export type InputVariant = "default" | "ghost";
export type InputSize = "sm" | "md" | "lg";
export type LabelDirection = "row" | "column";

export interface InputProps {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    placeholder?: string;
    variant?: InputVariant;
    size?: InputSize;
}

const variantMap: Record<
    InputVariant,
    {
        textColor: string;
        backgroundColor: string;
        focusedBackgroundColor: string;
        cursorColor: string;
    }
> = {
    default: {
        textColor: tokens.colors.text,
        backgroundColor: tokens.colors.surface,
        focusedBackgroundColor: "#222222",
        cursorColor: tokens.colors.primary,
    },
    ghost: {
        textColor: tokens.colors.dim,
        backgroundColor: "transparent",
        focusedBackgroundColor: "transparent",
        cursorColor: tokens.colors.dim,
    },
};

const sizeMap: Record<InputSize, { width: number }> = {
    sm: { width: 16 },
    md: { width: 24 },
    lg: { width: 32 },
};

export function Input({
    id,
    label,
    labelDirection = "row",
    placeholder = "",
    variant = "default",
    size = "md",
}: InputProps) {
    const v = variantMap[variant];
    const sz = sizeMap[size];

    return delegate(
        { focus: `${id}-input` },
        Box(
            {
                flexDirection: labelDirection,
                columnGap: 1,
                marginBottom: 1,
                alignItems:
                    labelDirection === "column" ? "flex-start" : "center",
            },
            ...(label
                ? [Text({ content: label.padEnd(12), fg: tokens.colors.dim })]
                : []),
            TuiInput({
                id: `${id}-input`,
                placeholder,
                width: sz.width,
                textColor: v.textColor,
                backgroundColor: v.backgroundColor,
                focusedBackgroundColor: v.focusedBackgroundColor,
                cursorColor: v.cursorColor,
            }),
        ),
    );
}
