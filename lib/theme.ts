const colors = {
    bg: "#09090b",
    surface: "#18181b",
    surfaceFocused: "#222222",
    border: "#27272a",
    text: "#fafafa",
    dim: "#71717a",
    primary: "#ffffff",
    danger: "#ef4444",
    success: "#22c55e",
    warning: "#eab308",
} as const;

const size = {
    sm: { paddingX: 1, paddingY: 0, minWidth: 6 },
    md: { paddingX: 2, paddingY: 0, minWidth: 8 },
    lg: { paddingX: 3, paddingY: 0, minWidth: 9 },
} as const;

const spacing = {
    stackGap: 1,
    sectionPadding: 2,
    labelWidth: 12,
} as const;

const components = {
    label: {
        color: colors.dim,
        width: spacing.labelWidth,
    },
    field: {
        background: colors.surface,
        focusedBackground: colors.surfaceFocused,
        text: colors.text,
        placeholder: colors.dim,
        cursor: colors.primary,
        border: colors.border,
        focusedBorder: colors.primary,
    },
} as const;

export const tokens = {
    colors,
    size,
    spacing,
    components,
} as const;

export type Tokens = typeof tokens;
