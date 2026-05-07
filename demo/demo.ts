import { Box, Text } from "@opentui/core";
import { init, Button, Input, tokens } from "../index";

const renderer = await init({ exitOnCtrlC: true });

const buttonSection = Box(
    {
        flexDirection: "column",
        rowGap: 1,
        padding: 2,
        backgroundColor: tokens.colors.bg,
    },

    Text({ content: "Buttons", fg: tokens.colors.text }),

    Text({ content: "Variants", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "row", columnGap: 2 },
        Button({ label: "default" }),
        Button({ label: "secondary", variant: "secondary" }),
        Button({ label: "destructive", variant: "destructive" }),
        Button({ label: "outline", variant: "outline" }),
        Button({ label: "disabled", disabled: true }),
    ),

    Text({ content: "Sizes", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "row", columnGap: 2 },
        Button({ label: "sm", size: "sm" }),
        Button({ label: "md", size: "md" }),
        Button({ label: "lg", size: "lg" }),
    ),
);

// ── inputs ───────────────────────────────────────────────
const inputSection = Box(
    {
        flexDirection: "column",
        rowGap: 1,
        padding: 2,
        backgroundColor: tokens.colors.bg,
    },

    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: 1 },
        Input({
            id: "d-row",
            label: "Row:",
            placeholder: "label left",
            labelDirection: "row",
        }),
        Input({
            id: "d-col",
            label: "Column:",
            placeholder: "label above",
            labelDirection: "column",
        }),
    ),
);

// ── root ─────────────────────────────────────────────────
renderer.root.add(
    Box({ flexDirection: "column" }, buttonSection, inputSection),
);
