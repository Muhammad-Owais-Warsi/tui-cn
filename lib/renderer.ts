import { createCliRenderer } from "@opentui/core";

export const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    consoleMode: "disabled",
});
