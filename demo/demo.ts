import { Box, ScrollBox, Text } from "@opentui/core";
import { init, Button, Input, Select, Textarea, tokens } from "../index";
import { Checkbox } from "../ui/checkbox";

const renderer = await init({ exitOnCtrlC: true });

const sectionBase = {
    flexDirection: "column",
    rowGap: tokens.spacing.stackGap,
    padding: tokens.spacing.sectionPadding,
    backgroundColor: tokens.colors.bg,
    border: true,
    borderStyle: "single",
    borderColor: tokens.colors.border,
} as const;

const buttonSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Buttons", fg: tokens.colors.text }),

    Text({ content: "Variants", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "row", columnGap: tokens.spacing.stackGap * 2 },
        Button({ label: "default" }),
        Button({ label: "secondary", variant: "secondary" }),
        Button({ label: "destructive", variant: "destructive" }),
        Button({ label: "outline", variant: "outline" }),
        Button({ label: "disabled", disabled: true }),
    ),

    Text({ content: "Sizes", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "row", columnGap: tokens.spacing.stackGap * 2 },
        Button({ label: "sm", size: "sm" }),
        Button({ label: "md", size: "md" }),
        Button({ label: "lg", size: "lg" }),
    ),
);

// ── inputs ───────────────────────────────────────────────
const inputSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Inputs", fg: tokens.colors.text }),
    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
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
            defaultValue: "owais",
        }),
    ),
);

// ── textareas ────────────────────────────────────────────
const textareaSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Textareas", fg: tokens.colors.text }),

    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        Textarea({
            id: "ta-row",
            label: "Row:",
            labelDirection: "row",
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
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
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

// ── select ───────────────────────────────────────────────
const selectOptions = [
    {
        name: "Alacritty",
        description: "GPU-accelerated terminal",
        value: "alacritty",
    },
    {
        name: "iTerm2",
        description: "macOS terminal emulator",
        value: "iterm2",
    },
    {
        name: "WezTerm",
        description: "Rust-based terminal",
        value: "wezterm",
    },
    {
        name: "Hyper",
        description: "Electron terminal",
        value: "hyper",
    },
];

const selectSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Select", fg: tokens.colors.text }),

    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        Select({
            id: "sel-row",
            label: "Row:",
            labelDirection: "row",
            options: selectOptions,
            width: 40,
            height: 6,
            showDescription: true,
        }),
        Select({
            id: "sel-col",
            label: "Column:",
            labelDirection: "column",
            options: selectOptions,
            width: 40,
            height: 6,
            showDescription: false,
            showScrollIndicator: true,
        }),
    ),
);

const check = Checkbox({
    id: "text",
    label: "test",
});

// ── root ─────────────────────────────────────────────────
const page = Box(
    {
        flexDirection: "column",
        rowGap: tokens.spacing.stackGap,
        padding: tokens.spacing.sectionPadding,
        backgroundColor: tokens.colors.bg,
    },
    buttonSection,
    inputSection,
    textareaSection,
    selectSection,
    check,
);

renderer.root.add(
    ScrollBox(
        {
            width: "100%",
            height: "100%",
            scrollY: true,
            backgroundColor: tokens.colors.bg,
            scrollbarOptions: {
                trackOptions: {
                    foregroundColor: tokens.colors.primary,
                    backgroundColor: tokens.colors.surface,
                },
            },
        },
        page,
    ),
);
