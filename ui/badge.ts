import { BoxRenderable, TextRenderable } from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

type BadgeProps = {
    id: string;
    label: string;
};

export function Badge(props: BadgeProps) {
    const ctx = getRenderer();

    const box = new BoxRenderable(ctx, {
        paddingX: 1,
        paddingY: 0,
        minWidth: 6,
        height: 3,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        flexGrow: 0,
        borderStyle: "single",
        borderColor: tokens.colors.border,
    });

    const text = new TextRenderable(ctx, {
        content: props.label,
        fg: tokens.colors.text,
        selectable: false,
    });

    box.add(text);
    return box;
}
