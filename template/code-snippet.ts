import {
    Box,
    ScrollBox,
    Text,
    SyntaxStyle,
    RGBA,
    TreeSitterClient,
} from "@opentui/core";
import { Code, Select, init, tokens } from "../index";

const renderer = await init({ exitOnCtrlC: true });

const languageOptions = [
    { name: "JavaScript", description: "Node / Browser", value: "javascript" },
    { name: "TypeScript", description: "Typed JS", value: "typescript" },
    { name: "Zig", description: "Systems", value: "zig" },
];

const codeSamples: Record<
    string,
    { filetype: string; content: string; syntaxStyle: SyntaxStyle }
> = {
    javascript: {
        filetype: "javascript",
        content: `function greet(name) {
  const message = "Hello, " + name;
  return message;
}

console.log(greet("OpenTUI"));`,
        syntaxStyle: SyntaxStyle.fromStyles({
            keyword: { fg: RGBA.fromHex("#FF7B72"), bold: true },
            string: { fg: RGBA.fromHex("#A5D6FF") },
            function: { fg: RGBA.fromHex("#D2A8FF") },
            operator: { fg: RGBA.fromHex("#FF9E64") },
            variable: { fg: RGBA.fromHex("#E6EDF3") },
            comment: { fg: RGBA.fromHex("#8B949E"), italic: true },
            number: { fg: RGBA.fromHex("#79C0FF") },
            default: { fg: RGBA.fromHex("#E6EDF3") },
        }),
    },
    typescript: {
        filetype: "typescript",
        content: `type User = { name: string; active: boolean };

const greet = (user: User): string => {
  const status = user.active ? "active" : "inactive";
  return "Hello, " + user.name + " (" + status + ")";
};

console.log(greet({ name: "OpenTUI", active: true }));`,
        syntaxStyle: SyntaxStyle.fromStyles({
            keyword: { fg: RGBA.fromHex("#FF7B72"), bold: true },
            string: { fg: RGBA.fromHex("#A5D6FF") },
            function: { fg: RGBA.fromHex("#7AA2F7") },
            type: { fg: RGBA.fromHex("#F9E2AF") },
            operator: { fg: RGBA.fromHex("#FF9E64") },
            variable: { fg: RGBA.fromHex("#E6EDF3") },
            comment: { fg: RGBA.fromHex("#8B949E"), italic: true },
            number: { fg: RGBA.fromHex("#79C0FF") },
            default: { fg: RGBA.fromHex("#E6EDF3") },
        }),
    },
    zig: {
        filetype: "zig",
        content: `const std = @import("std");

fn greet(name: []const u8) []const u8 {
    return name;
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}\n", .{greet("OpenTUI")});
}`,
        syntaxStyle: SyntaxStyle.fromStyles({
            keyword: { fg: RGBA.fromHex("#F2C97D"), bold: true },
            string: { fg: RGBA.fromHex("#A6E3A1") },
            function: { fg: RGBA.fromHex("#89B4FA") },
            type: { fg: RGBA.fromHex("#CBA6F7") },
            operator: { fg: RGBA.fromHex("#89DCEB") },
            variable: { fg: RGBA.fromHex("#E6EDF3") },
            comment: { fg: RGBA.fromHex("#7F849C"), italic: true },
            number: { fg: RGBA.fromHex("#FAB387") },
            default: { fg: RGBA.fromHex("#E6EDF3") },
        }),
    },
};

const snippet = codeSamples["javascript"];

const codeBlock = Code({
    id: "snippet-code",
    content: snippet!.content,
    fileType: snippet!.filetype,
    syntaxStyle: snippet!.syntaxStyle,
    width: 60,
    height: 10,
});

const languageSelect = Select({
    id: "snippet-language",
    label: "Language",
    labelDirection: "column",
    options: languageOptions,
    width: 26,
    height: 5,
    showDescription: false,
    showScrollIndicator: true,
    onChange: (_index, option) => {
        const key = option.value as string;
        const next = codeSamples[key];
        if (!next) return;
        codeBlock.filetype = next.filetype;
        codeBlock.content = next.content;
        codeBlock.syntaxStyle = next.syntaxStyle; // ← was commented out
        codeBlock.requestRender();
    },
});
languageSelect.menu.focus();

const card = Box(
    {
        flexDirection: "column",
        rowGap: tokens.spacing.stackGap,
        padding: tokens.spacing.sectionPadding,
        width: 64,
        backgroundColor: tokens.colors.surface,
        border: true,
        borderStyle: "single",
        borderColor: tokens.colors.border,
    },
    Text({ content: "Code Snippet", fg: tokens.colors.text }),
    Text({ content: "Choose a language to preview.", fg: tokens.colors.dim }),
    languageSelect,
    codeBlock,
);

const page = Box(
    {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colors.bg,
    },
    card,
);

renderer.root.add(
    ScrollBox(
        {
            width: "100%",
            height: "100%",
            scrollY: true,
            backgroundColor: tokens.colors.bg,
        },
        page,
    ),
);

languageSelect.focus();
