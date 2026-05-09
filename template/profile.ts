import { Box, ScrollBox, Text, TextRenderable } from "@opentui/core";
import {
    Badge,
    Button,
    Checkbox,
    Input,
    Select,
    Textarea,
    init,
    tokens,
} from "../index";

const renderer = await init({ exitOnCtrlC: true });

const roleOptions = [
    { name: "Admin", description: "Full access", value: "admin" },
    { name: "Editor", description: "Can edit content", value: "editor" },
    { name: "Viewer", description: "Read-only", value: "viewer" },
];

const statusText = new TextRenderable(renderer, {
    id: "profile-status",
    content: "",
    fg: tokens.colors.dim,
});

const nameInput = Input({
    id: "profile-name",
    label: "Name",
    labelDirection: "column",
    placeholder: "Jane Doe",
    defaultValue: "Jane Doe",
    width: 40,
});

const emailInput = Input({
    id: "profile-email",
    label: "Email",
    labelDirection: "column",
    placeholder: "jane@example.com",
    defaultValue: "jane@example.com",
    width: 40,
});

const bioTextarea = Textarea({
    id: "profile-bio",
    label: "Bio",
    labelDirection: "column",
    defaultValue: "Product designer who loves building calm interfaces.",
    width: 52,
    height: 4,
});

const roleSelect = Select({
    id: "profile-role",
    label: "Role",
    labelDirection: "column",
    options: roleOptions,
    width: 40,
    height: 4,
    showDescription: false,
    showScrollIndicator: true,
});

const publicCheckbox = Checkbox({
    id: "profile-public",
    label: "Public profile",
    checked: true,
    onChange: (checked) => {
        statusText.content = checked
            ? "Profile visibility: public"
            : "Profile visibility: private";
        statusText.requestRender();
    },
});

const handleSave = () => {
    const role = roleSelect.menu.getSelectedOption()?.name ?? "Unknown";
    statusText.content = `Saved ${nameInput.input.value} · ${role}`;
    statusText.requestRender();
};

const handleCancel = () => {
    statusText.content = "Changes discarded.";
    statusText.requestRender();
};

const header = Box(
    {
        flexDirection: "column",
        columnGap: tokens.spacing.stackGap,
        justifyContent: "center",
        alignItems: "flex-start",
        flexGrow: 0,
    },
    Text({ content: "User Profile", fg: tokens.colors.text }),
    Badge({ id: "profile-badge", label: "Pro" }),
);

const form = Box(
    {
        flexDirection: "column",
        rowGap: tokens.spacing.stackGap,
        padding: tokens.spacing.sectionPadding,
        width: 60,
        backgroundColor: tokens.colors.surface,
        border: true,
        borderStyle: "single",
        borderColor: tokens.colors.border,
    },
    header,
    Text({
        content: "Update your personal details and visibility.",
        fg: tokens.colors.dim,
    }),
    Box(
        { flexDirection: "column", rowGap: tokens.spacing.stackGap },
        nameInput,
        emailInput,
        roleSelect,
        bioTextarea,
    ),
    publicCheckbox,
    Box(
        {
            flexDirection: "row",
            justifyContent: "flex-end",
            columnGap: tokens.spacing.stackGap,
        },
        Button({
            label: "Cancel",
            variant: "secondary",
            onClick: handleCancel,
        }),
        Button({ label: "Save changes", onClick: handleSave }),
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

nameInput.focus();
