export const tokens = {
    colors: {
        bg: "#09090b",
        surface: "#18181b",
        border: "#27272a",
        text: "#fafafa",
        dim: "#71717a",
        primary: "#ffffff",
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#eab308",
    },
    size: {
        sm: { paddingX: 1, paddingY: 0, minWidth: 6 },
        md: { paddingX: 2, paddingY: 0, minWidth: 8 },
        lg: { paddingX: 3, paddingY: 0, minWidth: 9 },
    },
} as const;

export type Tokens = typeof tokens;
