import { BoxRenderable, SliderRenderable, TextRenderable } from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

export class SliderField extends BoxRenderable {
    slider!: SliderRenderable;
}

type LabelDirection = "row" | "column";

type SliderProps = {
    id: string;
    label?: string;
    labelDirection?: LabelDirection;
    orientation?: "horizontal" | "vertical";
    min: number;
    max: number;
    defaultValue?: number;
    height?: number;
    width?: number;
    onChange?: (value: number) => void;
};

export function Slider(props: SliderProps): SliderField {
    const ctx = getRenderer();

    const labelDirection = props.labelDirection ?? "row";
    const isColumn = labelDirection === "column";
    const orientation = props.orientation ?? "horizontal";

    const container = new SliderField(ctx, {
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

    const slider = new SliderRenderable(ctx, {
        id: `${props.id}-slider`,
        orientation,
        min: props.min,
        max: props.max,
        value: props.defaultValue ?? props.min,
        backgroundColor: tokens.components.field.background,
        foregroundColor: tokens.components.field.cursor,
        onChange: (value) => {
            props.onChange?.(value);
        },
    });

    slider.width = props.width ?? (orientation === "horizontal" ? 30 : 2);
    slider.height = props.height ?? (orientation === "horizontal" ? 1 : 8);

    container.add(slider);
    container.slider = slider;

    return container;
}
