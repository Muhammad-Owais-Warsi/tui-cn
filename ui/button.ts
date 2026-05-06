import { BoxRenderable, TextRenderable } from "@opentui/core";
import { renderer } from "../lib/renderer";
import { theme, type Theme } from "../lib/theme";
import { createId } from "../lib/utils";

type ButtonVariant =
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = {
    label?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
};

type ButtonVariantConfig = {
    bg: string;
    hoverBg: string;
    fg: string;
    border?: boolean;
    borderColor?: string;
};

type ButtonSizeConfig = {
    height: number;
    width?: number;
    paddingX: number;
    paddingY: number;
    minWidth?: number;
};

const defaultButtonVariant: ButtonVariant = "default";
const defaultButtonSize: ButtonSize = "md";

const getButtonVariants = (
    t: Theme,
): Record<ButtonVariant, ButtonVariantConfig> => ({
    default: {
        bg: t.colors.primary,
        hoverBg: t.colors.primary,
        fg: t.colors.primaryForeground,
    },
    secondary: {
        bg: t.colors.secondary,
        hoverBg: t.colors.muted,
        fg: t.colors.secondaryForeground,
    },
    destructive: {
        bg: t.colors.destructive,
        hoverBg: t.colors.destructive,
        fg: t.colors.destructiveForeground,
    },
    outline: {
        bg: t.colors.background,
        hoverBg: t.colors.accent,
        fg: t.colors.foreground,
        border: true,
        borderColor: t.colors.border,
    },
    ghost: {
        bg: t.colors.background,
        hoverBg: t.colors.accent,
        fg: t.colors.foreground,
    },
    link: {
        bg: t.colors.background,
        hoverBg: t.colors.background,
        fg: t.colors.primary,
    },
});

const buttonSizes: Record<ButtonSize, ButtonSizeConfig> = {
    sm: { height: 3, paddingX: 1, paddingY: 0, minWidth: 6 },
    md: { height: 3, paddingX: 2, paddingY: 0, minWidth: 8 },
    lg: { height: 3, paddingX: 3, paddingY: 0, minWidth: 12 },
    icon: { height: 3, width: 3, paddingX: 0, paddingY: 0 },
};

const getDisabledVariant = (t: Theme): ButtonVariantConfig => ({
    bg: t.colors.muted,
    hoverBg: t.colors.muted,
    fg: t.colors.mutedForeground,
    border: true,
    borderColor: t.colors.border,
});

const getButtonVariant = (
    variant?: ButtonVariant,
    disabled?: boolean,
): ButtonVariantConfig => {
    if (disabled) return getDisabledVariant(theme);

    const variants = getButtonVariants(theme);
    const key = variant ?? defaultButtonVariant;

    return variants[key] ?? variants.default;
};

const getButtonSize = (size?: ButtonSize): ButtonSizeConfig => {
    const key = size ?? defaultButtonSize;

    return buttonSizes[key] ?? buttonSizes.md;
};

const getButtonWidth = (label: string | undefined, size: ButtonSizeConfig) => {
    if (size.width) return size.width;

    const textLength = label ? label.length : 0;
    const padded = textLength + size.paddingX * 2;
    const minWidth = size.minWidth ?? 0;

    return Math.max(padded, minWidth);
};

const createButtonBase = (
    props: ButtonProps,
    variant: ButtonVariantConfig,
    size: ButtonSizeConfig,
    disabled: boolean,
) => {
    const width = getButtonWidth(props.label, size);

    const buttonBase = new BoxRenderable(renderer, {
        id: createId("button"),
        height: size.height,
        width,
        backgroundColor: variant.bg,
        border: variant.border ?? false,
        borderColor: variant.borderColor,
        paddingX: size.paddingX,
        paddingY: size.paddingY,
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 0,
        flexShrink: 0,
        focusable: !disabled,
        opacity: disabled ? 0.6 : 1,
        onMouseDown: () => {
            if (disabled) return;
            if (props.onClick) props.onClick();
            console.log("Button clicked!");
        },
        onMouseOver: () => {
            if (disabled) return;
            buttonBase.backgroundColor = variant.hoverBg;
        },
        onMouseOut: () => {
            if (disabled) return;
            buttonBase.backgroundColor = variant.bg;
        },
    });

    return buttonBase;
};

export function Button(props: ButtonProps) {
    const disabled = props.disabled ?? false;
    const variant = getButtonVariant(props.variant, disabled);
    const size = getButtonSize(props.size);

    // 1. Create the Base Container
    const buttonBase = createButtonBase(props, variant, size, disabled);

    const buttonText = new TextRenderable(renderer, {
        content: props.label || "Click Me",
        fg: variant.fg,
    });

    buttonBase.add(buttonText);

    return buttonBase;
}
