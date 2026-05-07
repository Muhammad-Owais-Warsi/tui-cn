import { createCliRenderer } from "@opentui/core";

type Renderer = Awaited<ReturnType<typeof createCliRenderer>>;

let _renderer: Renderer | null = null;

export async function init(options?: Parameters<typeof createCliRenderer>[0]) {
    _renderer = await createCliRenderer(options ?? { exitOnCtrlC: true });
    return _renderer;
}

export function getRenderer(): Renderer {
    if (!_renderer)
        throw new Error("[tui-cn] Call init() before using any component.");
    return _renderer;
}
