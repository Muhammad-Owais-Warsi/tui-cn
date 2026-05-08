import {
    BoxRenderable,
    TabSelectRenderable,
    TabSelectRenderableEvents,
    TextRenderable,
} from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

export class TabSelectField extends BoxRenderable {
    menu!: TabSelectRenderable;
}

type OptionProps = {
    name: string;
    description: string;
    value?: any;
};

type LabelDirection = "row" | "column";

type TabSelectProps = {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    height?: number;
    width?: number;
    options: OptionProps[];
    showScrollIndicator?: boolean;
    showDescription?: boolean;
    showUnderline?: boolean;
    onSelect?: (index: number, option: OptionProps) => void;
    onChange?: (index: number, option: OptionProps) => void;
};

export function TabSelect(props: TabSelectProps): TabSelectField {
    const ctx = getRenderer();

    const labelDirection = props.labelDirection ?? "row";
    const isColumn = labelDirection === "column";

    const container = new TabSelectField(ctx, {
        id: `${props.id}-container`,
        flexDirection: labelDirection,
        columnGap: isColumn ? undefined : tokens.spacing.stackGap,
        rowGap: isColumn ? tokens.spacing.stackGap : undefined,
        marginBottom: tokens.spacing.stackGap,
        alignItems: isColumn ? "flex-start" : "center",
    });

    if (props.label) {
        const labelText = new TextRenderable(ctx, {
            id: `${props.id}-label`,
            content: isColumn
                ? props.label
                : props.label.padEnd(tokens.components.label.width),
            fg: tokens.components.label.color,
        });
        container.add(labelText);
    }

    const menu = new TabSelectRenderable(ctx, {
        id: `${props.id}-select`,
        options: props.options,
        backgroundColor: tokens.components.field.background,
        focusedBackgroundColor: tokens.components.field.focusedBackground,
        textColor: tokens.components.field.text,
        focusedTextColor: tokens.components.field.text,
        selectedBackgroundColor: tokens.colors.primary,
        selectedTextColor: tokens.colors.bg,
        selectedDescriptionColor: tokens.colors.bg,
        showDescription: props.showDescription ?? true,
        showScrollArrows: props.showScrollIndicator ?? false,
        showUnderline: props.showUnderline ?? true,
    });

    menu.width = props.width ?? 50;
    menu.height = props.height ?? ((props.showDescription ?? true) ? 5 : 3);

    if (props.onSelect) {
        menu.on(TabSelectRenderableEvents.ITEM_SELECTED, (index, option) =>
            props.onSelect(index, option),
        );
    }

    if (props.onChange) {
        menu.on(TabSelectRenderableEvents.SELECTION_CHANGED, (index, option) =>
            props.onChange(index, option),
        );
    }

    container.add(menu);
    container.menu = menu;

    return container;
}
