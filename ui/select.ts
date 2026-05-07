import {
    BoxRenderable,
    SelectRenderable,
    SelectRenderableEvents,
    TextRenderable,
} from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

export class SelectField extends BoxRenderable {
    menu!: SelectRenderable;
}

type OptionProps = {
    name: string;
    description: string;
    value?: any;
};

type LabelDirection = "row" | "column";

type SelectProps = {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    height?: number;
    width?: number;
    options: OptionProps[];
    showScrollIndicator?: boolean;
    showDescription?: boolean;
    onSelect?: (index: number, option: OptionProps) => void;
    onChange?: (index: number, option: OptionProps) => void;
};

export function Select(props: SelectProps): SelectField {
    const ctx = getRenderer();

    const container = new SelectField(ctx, {
        id: `${props.id}-container`,
        flexDirection: props.labelDirection,
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

    const menu = new SelectRenderable(ctx, {
        id: `${props.id}-select`,
        width: props.width ?? 30,
        height: props.height ?? 8,
        options: props.options,
        backgroundColor: tokens.components.field.background,
        focusedBackgroundColor: tokens.components.field.focusedBackground,
        textColor: tokens.components.field.text,
        focusedTextColor: tokens.components.field.text,
        selectedBackgroundColor: tokens.colors.primary,
        selectedTextColor: tokens.colors.bg,
        descriptionColor: tokens.components.field.placeholder,
        selectedDescriptionColor: tokens.colors.bg,
        showScrollIndicator: props.showScrollIndicator ?? false,
        showDescription: props.showDescription ?? true,
    });

    if (props.onSelect) {
        menu.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) =>
            props.onSelect(index, option),
        );
    }

    if (props.onChange) {
        menu.on(SelectRenderableEvents.SELECTION_CHANGED, (index, option) =>
            props.onChange(index, option),
        );
    }

    container.add(menu);
    container.menu = menu;

    return container;
}
