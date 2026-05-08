import { Box, ScrollBox, Text, TextRenderable } from "@opentui/core";
import { Button, Checkbox, Input, init, tokens } from "../index";

const renderer = await init({ exitOnCtrlC: true });

let remember = false;

const statusText = new TextRenderable(renderer, {
    id: "login-status",
    content: "",
    fg: tokens.colors.dim,
});

const handleSubmit = () => {
    statusText.content = `Submitted: ${emailInput.input.value}`;
    statusText.requestRender();
};

const emailInput = Input({
    id: "login-email",
    label: "Email",
    labelDirection: "column",
    placeholder: "you@example.com",
    width: 36,
});

const passwordInput = Input({
    id: "login-password",
    label: "Password",
    labelDirection: "column",
    placeholder: "••••••••",
    width: 36,
    onSubmit: handleSubmit,
});

const rememberCheckbox = Checkbox({
    id: "login-remember",
    label: "Remember me",
    checked: false,
    onChange: (checked) => {
        remember = checked;
        statusText.content = `Remember me: ${remember ? "on" : "off"}`;
        statusText.requestRender();
    },
});

const form = Box(
    {
        flexDirection: "column",
        rowGap: tokens.spacing.stackGap,
        padding: tokens.spacing.sectionPadding,
        width: 52,
        backgroundColor: tokens.colors.surface,
        border: true,
        borderStyle: "single",
        borderColor: tokens.colors.border,
    },
    Text({ content: "Sign in", fg: tokens.colors.text }),
    Text({ content: "Use your email and password.", fg: tokens.colors.dim }),
    emailInput,
    passwordInput,
    rememberCheckbox,
    Box(
        {
            flexDirection: "row",
            justifyContent: "center",
            columnGap: tokens.spacing.stackGap,
        },
        Button({ label: "Sign in", onClick: handleSubmit }),
    ),
    statusText,
);

const page = Box(
    {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colors.bg,
    },
    form,
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

emailInput.input.focus();
