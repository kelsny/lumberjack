import {
    ArrayExpr,
    CallExpr,
    Expr,
    ExprVisitor,
    GroupingExpr,
    LiteralExpr,
    ObjectExpr,
    OptionalExpr,
    PropExpr,
    TupleExpr,
    UnaryExpr,
} from "../base/expr.js";
import { TokenType } from "../base/tokentype.js";
import type { createBaseProvider } from "../generators/generators.js";
import * as generators from "../generators/index.js";

// ...
export class TSGenerator implements ExprVisitor<string> {
    constructor(/* more shit here */) {}

    generate(expr: Expr) {
        return expr.accept(this);
    }

    visitArrayExpr(expr: ArrayExpr): string {
        return `ArrayNode<${expr.accept(this)}>`;
    }

    visitCallExpr(expr: CallExpr): string {
        const generator = generators[expr.identifier.lexeme as keyof typeof generators];

        if (generator.isModifier)
            throw new Error(`Synthesizer should not have to generate a node for a single call expression.`);

        return generator.types(
            Object.fromEntries([...expr.raw.entries()].map(([k, v]) => [k, (v as LiteralExpr).value])) as any,
        );
    }

    visitLiteralExpr(expr: LiteralExpr): string {
        if (expr.value instanceof RegExp) return generators.string.types({ boxed: true });

        return `LiteralNode<${typeof expr.value === "undefined" ? "undefined" : JSON.stringify(expr.value)}>`;
    }

    visitGroupingExpr(expr: GroupingExpr): string {
        if (expr.expr.length === 1) {
            const provider = expr.expr[0];

            return provider.accept(this);
        }

        const validators = [] as CallExpr[];

        expr.expr.forEach((e) => {
            if (e instanceof CallExpr) {
                validators.push(e);
            }

            // ...
        });

        // Only need the provider
        const provider = validators.find(
            (v) => !generators[v.identifier.lexeme as keyof typeof generators].isModifier,
        )!!;

        return (
            generators[provider.identifier.lexeme as keyof typeof generators] as ReturnType<typeof createBaseProvider>
        ).types(Object.fromEntries([...provider.raw.entries()].map(([k, v]) => [k, (v as LiteralExpr).value])) as any);
    }

    visitObjectExpr(expr: ObjectExpr): string {
        return `ObjectNode<[${expr.props
            .map(
                (p) =>
                    `[${p.name instanceof RegExp ? `/${p.name.source}/` : JSON.stringify(p.name)}, ${p.value.accept(
                        this,
                    )}, ${p.optional}]`,
            )
            .join(", ")}], ${expr.unstrict}>`;
    }

    visitOptionalExpr(expr: OptionalExpr): string {
        return `OptionalNode<${expr.expr.accept(this)}>`;
    }

    visitPropExpr(expr: PropExpr): string {
        return expr.value.accept(this);
    }

    visitTupleExpr(expr: TupleExpr): string {
        return `TupleNode<[${expr.elements.map((e) => e.accept(this)).join(", ")}>`;
    }

    visitUnaryExpr(expr: UnaryExpr): string {
        if (expr.operator.type === TokenType.Minus)
            throw new Error("No negations should be left after the resolution step.");

        throw new Error("Unknown unary operator received.");
    }
}
