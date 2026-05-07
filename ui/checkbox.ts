import { BoxRenderable, TextRenderable } from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

type CheckboxProps = {
    id: string;
    label: string;
    value: any;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
};

export function Checkbox({
    id,
    label,
    value,
    checked = false,
    onChange,
}: CheckboxProps) {
    const ctx = getRenderer();

    const container = new BoxRenderable(ctx, {
        id: `${id}-container`,
        flexDirection: "row",
        columnGap: tokens.spacing.stackGap,
        alignItems: "center",
        focusable: true,
    });

    const indicator = new TextRenderable(ctx, {
        id: `${id}-indicator`,
        content: checked ? "[x]" : "[ ]",
        fg: tokens.components.field.text,
        onMouseDown: () => {
            toggle();
            container.focus();
        },
    });

    const labelText = new TextRenderable(ctx, {
        id: `${id}-label`,
        content: label,
        fg: tokens.components.label.color,
    });

    if (onChange) {
    }

    const toggle = () => {
        checked = !checked;
        indicator.content = checked ? "[x]" : "[ ]";
        onChange?.(checked);
        container.requestRender();
    };

    container.add(indicator);
    container.add(labelText);
    return container;
}
