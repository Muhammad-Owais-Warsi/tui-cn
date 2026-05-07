import { Box, Text } from "@opentui/core";
import { tokens } from "../lib/theme";

export type ButtonVariant = "default" | "secondary" | "destructive" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: () => void;
}

const variantMap: Record<ButtonVariant, { fg: string; borderColor: string }> = {
    default: { fg: tokens.colors.primary, borderColor: tokens.colors.primary },
    secondary: { fg: tokens.colors.text, borderColor: tokens.colors.surface },
    destructive: {
        fg: tokens.colors.danger,
        borderColor: tokens.colors.danger,
    },
    outline: { fg: tokens.colors.text, borderColor: tokens.colors.border },
};
export function Button({
    label,
    variant = "default",
    size = "md",
    disabled = false,
    onClick,
}: ButtonProps) {
    const v = variantMap[variant];
    const sz = tokens.size[size];

    return Box(
        {
            paddingX: sz.paddingX,
            paddingY: sz.paddingY,
            minWidth: sz.minWidth,
            height: 3,
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            flexGrow: 0,
            borderStyle: "single",
            borderColor: disabled ? tokens.colors.border : v.borderColor,
            onMouseDown: disabled ? undefined : onClick,
        },
        Text({
            content: label,
            fg: disabled ? tokens.colors.dim : v.fg,
            selectable: false,
        }),
    );
}
