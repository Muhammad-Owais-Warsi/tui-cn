import { BoxRenderable, TextRenderable } from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

type ToastVariant = "default" | "success" | "warning" | "danger";

type ToastProps = {
    id: string;
    content: string;
    variant?: ToastVariant;
    width?: number;
};

const variantMap: Record<
    ToastVariant,
    { theme: string; title: string; description: string }
> = {
    default: {
        theme: tokens.colors.primary,

        title: tokens.colors.text,
        description: tokens.colors.dim,
    },
    success: {
        theme: tokens.colors.success,
        title: tokens.colors.text,
        description: tokens.colors.dim,
    },
    warning: {
        theme: tokens.colors.warning,

        title: tokens.colors.text,
        description: tokens.colors.dim,
    },
    danger: {
        theme: tokens.colors.danger,
        title: tokens.colors.text,
        description: tokens.colors.dim,
    },
};

export function Toast({ id, content, variant = "default", width }: ToastProps) {
    const ctx = getRenderer();
    const v = variantMap[variant];

    const container = new BoxRenderable(ctx, {
        id: `${id}-toast`,
        flexDirection: "row",
        columnGap: tokens.spacing.stackGap,
        paddingX: tokens.spacing.sectionPadding,
        paddingY: 1,
        border: true,
        borderStyle: "single",
        borderColor: v.theme,
        height: 3,
        width: width ?? 40,
    });

    const textColumn = new BoxRenderable(ctx, {
        id: `${id}-content`,
        flexDirection: "column",
        rowGap: 0,
        alignItems: "flex-start",
    });

    const titleText = new TextRenderable(ctx, {
        id: `${id}-title`,
        content: content,
        fg: v.theme,
    });

    textColumn.add(titleText);

    container.add(textColumn);

    return container;
}
