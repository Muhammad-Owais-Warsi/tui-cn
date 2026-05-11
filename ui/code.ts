import {
    BoxRenderable,
    CodeRenderable,
    LineNumberRenderable,
    SyntaxStyle,
} from "@opentui/core";
import { getRenderer } from "../lib/renderer";
import { tokens } from "../lib/theme";

export class CodeField extends BoxRenderable {
    code!: CodeRenderable;
    lineNumbers?: LineNumberRenderable;
}

type CodeProps = {
    id: string;
    content: string;
    fileType?: string;
    syntaxStyle: SyntaxStyle;
    height?: number;
    width?: number;
    lineNumber?: boolean;
};

export function Code(props: CodeProps): CodeField {
    const ctx = getRenderer();

    const container = new CodeField(ctx, {
        id: `${props.id}-container`,
        flexDirection: "row",
        columnGap: 1,
    });

    const code = new CodeRenderable(ctx, {
        id: props.id,
        content: props.content,
        filetype: props.fileType,
        syntaxStyle: props.syntaxStyle,
        height: props.height ?? 10,
        width: props.width ?? 50,
    });

    container.code = code;

    if (props.lineNumber) {
        const lineNumbers = new LineNumberRenderable(ctx, {
            id: `${props.id}-lines`,
            target: code,
            minWidth: 3,
            paddingRight: 1,
            fg: tokens.colors.dim,
            bg: tokens.colors.surface,
        });
        container.add(lineNumbers);
        container.lineNumbers = lineNumbers;
    } else {
        container.add(code);
    }

    return container;
}
