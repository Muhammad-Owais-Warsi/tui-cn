import { Box, Text } from "@opentui/core";
import { init, Button, Input, Textarea, tokens } from "../index";

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
            labelDirection: "column",
        }),
        Input({
            id: "d-col",
            label: "Column:",
            placeholder: "label above",
            labelDirection: "column",
            defaultValue: "owais",
        }),
    ),
);

// ── textareas ────────────────────────────────────────────
const textareaSection = Box(
    {
        flexDirection: "column",
        rowGap: 1,
        padding: 2,
        backgroundColor: tokens.colors.bg,
    },

    Text({ content: "Textareas", fg: tokens.colors.text }),

    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: 1 },
        Textarea({
            id: "ta-row",
            label: "Row:",
            labelDirection: "column",
            placeholder: "label left",
            width: 50,
            height: 4,
        }),
        Textarea({
            id: "ta-col",
            label: "Column:",
            labelDirection: "column",
            defaultValue: "multi-line\nvalue",
            width: 50,
            height: 4,
        }),
    ),

    Text({ content: "Wrap mode", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: 1 },
        Textarea({
            id: "ta-word",
            label: "Word:",
            labelDirection: "row",
            wrapMode: "word",
            defaultValue: "Word wrap keeps whole words together.",
            width: 50,
            height: 4,
        }),
        Textarea({
            id: "ta-char",
            label: "Char:",
            labelDirection: "row",
            wrapMode: "char",
            defaultValue: "Char wrap breaks lines at any character.",
            width: 50,
            height: 4,
        }),
        Textarea({
            id: "ta-none",
            label: "None:",
            labelDirection: "row",
            wrapMode: "none",
            defaultValue: "No wrap keeps long lines unbroken.",
            width: 50,
            height: 4,
        }),
    ),
);

// ── root ─────────────────────────────────────────────────
renderer.root.add(
    Box(
        { flexDirection: "column" },
        buttonSection,
        inputSection,
        textareaSection,
    ),
);
