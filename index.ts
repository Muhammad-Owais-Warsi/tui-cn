import { BoxRenderable, TextRenderable } from "@opentui/core";
import { renderer } from "./lib/renderer";
import { theme } from "./lib/theme";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const root = new BoxRenderable(renderer, {
    id: "demo-root",
    flexDirection: "column",
    rowGap: 1,
    padding: 1,
    backgroundColor: theme.colors.background,
});

renderer.root.add(root);

const title = new TextRenderable(renderer, {
    content: "Buttons",
    fg: theme.colors.foreground,
});

root.add(title);

const variantsTitle = new TextRenderable(renderer, {
    content: "Variants",
    fg: theme.colors.mutedForeground,
});

root.add(variantsTitle);

const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
] as const;

variants.forEach((variant) => {
    const row = new BoxRenderable(renderer, {
        id: `row-${variant}`,
        flexDirection: "row",
        columnGap: 2,
        alignItems: "center",
    });

    row.add(Button({ label: "disabled", variant, disabled: true }));
    root.add(row);
});

const sizesTitle = new TextRenderable(renderer, {
    content: "Sizes",
    fg: theme.colors.mutedForeground,
});

root.add(sizesTitle);

const sizesRow = new BoxRenderable(renderer, {
    id: "row-sizes",
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
});

const sizes = ["sm", "md", "lg", "icon"] as const;

sizes.forEach((size) => {
    const label = size === "icon" ? "•" : size;
    sizesRow.add(Button({ label, size }));
});

root.add(sizesRow);

const inputTitle = new TextRenderable(renderer, {
    content: "Inputs",
    fg: theme.colors.foreground,
});

root.add(inputTitle);

const inputVariantsTitle = new TextRenderable(renderer, {
    content: "Variants",
    fg: theme.colors.mutedForeground,
});

root.add(inputVariantsTitle);

const inputVariantsRow = new BoxRenderable(renderer, {
    id: "row-input-variants",
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
});

inputVariantsRow.add(
    Input({
        placeholder: "default",
    }),
);

inputVariantsRow.add(
    Input({
        variant: "ghost",
        placeholder: "ghost",
    }),
);

root.add(inputVariantsRow);

const inputSizesTitle = new TextRenderable(renderer, {
    content: "Sizes",
    fg: theme.colors.mutedForeground,
});

root.add(inputSizesTitle);

const inputSizesRow = new BoxRenderable(renderer, {
    id: "row-input-sizes",
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
});

const inputSizes = ["sm", "md", "lg"] as const;

inputSizes.forEach((size) => {
    inputSizesRow.add(
        Input({
            size,
            placeholder: size,
        }),
    );
});

root.add(inputSizesRow);
