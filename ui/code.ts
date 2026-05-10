import { CodeRenderable, SyntaxStyle } from "@opentui/core";
import { getRenderer } from "../lib/renderer";

type CodeProps = {
    id: string;
    content: string;
    fileType?: string;
    syntaxStyle: SyntaxStyle;
    height?: number;
    width?: number;
};

export function Code(props: CodeProps) {
    const ctx = getRenderer();
    const code = new CodeRenderable(ctx, {
        id: props.id,
        content: props.content,
        filetype: props.fileType,
        syntaxStyle: props.syntaxStyle,
        height: props.height ?? 10,
        width: props.width ?? 50,
    });

    return code;
}
