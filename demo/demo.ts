import { Box, ScrollBox, Text, SyntaxStyle, RGBA } from "@opentui/core";
import {
    init,
    Button,
    Input,
    Select,
    Slider,
    TabSelect,
    Textarea,
    Badge,
    Code,
    tokens,
} from "../index";
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

// ── tab select ───────────────────────────────────────────
const tabSelectOptions = [
    {
        name: "General",
        description: "Core settings",
        value: "general",
    },
    {
        name: "Editor",
        description: "Font and layout",
        value: "editor",
    },
    {
        name: "Theme",
        description: "Colors and style",
        value: "theme",
    },
    {
        name: "Keymap",
        description: "Shortcuts",
        value: "keymap",
    },
];

const tabSelectSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Tab Select", fg: tokens.colors.text }),

    Text({ content: "Label direction", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        TabSelect({
            id: "tab-row",
            label: "Row:",
            labelDirection: "row",
            options: tabSelectOptions,
            width: 50,
            height: 5,
            showDescription: true,
            showUnderline: true,
        }),
        TabSelect({
            id: "tab-col",
            label: "Column:",
            labelDirection: "column",
            options: tabSelectOptions,
            width: 50,
            height: 5,
            showDescription: false,
            showScrollIndicator: true,
        }),
    ),
);

// ── slider ───────────────────────────────────────────────
const sliderSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Slider", fg: tokens.colors.text }),

    Text({ content: "Orientation", fg: tokens.colors.dim }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        Slider({
            id: "sl-h",
            label: "Horizontal:",
            labelDirection: "row",
            orientation: "horizontal",
            min: 0,
            max: 100,
            defaultValue: 35,
            width: 40,
        }),
        Slider({
            id: "sl-v",
            label: "Vertical:",
            labelDirection: "column",
            orientation: "vertical",
            min: 0,
            max: 10,
            defaultValue: 4,
            height: 6,
            width: 2,
        }),
    ),
);

// ── badge ───────────────────────────────────────────────
const codeSyntax = SyntaxStyle.fromStyles({
    keyword: { fg: RGBA.fromHex("#FF7B72"), bold: true },
    string: { fg: RGBA.fromHex("#A5D6FF") },
    comment: { fg: RGBA.fromHex("#8B949E"), italic: true },
    number: { fg: RGBA.fromHex("#79C0FF") },
    function: { fg: RGBA.fromHex("#D2A8FF") },
    default: { fg: RGBA.fromHex("#E6EDF3") },
});

const codeSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Code", fg: tokens.colors.text }),

    Code({
        id: "code-sample",
        content: `function greet(name: string) {
  // Demo sample
  const message = "Hello, " + name
  return message
}

greet("OpenTUI")`,
        fileType: "typescript",
        syntaxStyle: codeSyntax,
        width: 60,
        height: 8,
        lineNumber: true,
    }),
);

const badgeSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Badge", fg: tokens.colors.text }),

    Box(
        { flexDirection: "row", columnGap: tokens.spacing.stackGap },
        Badge({ id: "badge-new", label: "New" }),
        Badge({ id: "badge-beta", label: "Beta" }),
        Badge({ id: "badge-pro", label: "Pro" }),
    ),
);

// ── checkbox ────────────────────────────────────────────
const checkboxSection = Box(
    {
        ...sectionBase,
    },

    Text({ content: "Checkbox", fg: tokens.colors.text }),

    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        Checkbox({
            id: "chk-news",
            label: "Subscribe to newsletter",
            checked: true,
        }),
        Checkbox({
            id: "chk-terms",
            label: "Accept terms and conditions",
        }),
        Checkbox({
            id: "chk-updates",
            label: "Receive product updates",
        }),
    ),
);

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
    tabSelectSection,
    sliderSection,
    codeSection,
    badgeSection,
    checkboxSection,
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
