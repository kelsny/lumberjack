/**
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * 
 * Generated by @kelsny/synth v0.0.1 on 6/18/2022
 */

import { MaxConstraint, MinConstraint, RangeConstraint, RegexConstraint } from "./dist/core/validators/index.js";
import { ArrayNode, BigIntNode, BooleanNode, FunctionNode, LiteralNode, NoopNode, NullNode, NumberNode, ObjectNode, StringNode, SymbolNode, TupleNode, UndefinedNode, ValidationNode } from "./dist/core/providers/index.js";
import { Synthesized } from "./dist/core/synthesize.js";

// /Users/tht/Documents/projects/synth/examples/BinaryExpression.synth
export const BinaryExpression = new Synthesized(new ObjectNode([["type", new StringNode(false), false], ["lhs", new ObjectNode([["type", new LiteralNode("CONSTANT"), false], ["value", new NumberNode(false).constraint(new StringNode(false)), false]]), false], ["rhs", new ObjectNode([["type", new LiteralNode("CONSTANT"), false], ["value", new NumberNode(false), false]]), false]]));

// /Users/tht/Documents/projects/synth/examples/CoordinatePair.synth
export const CoordinatePair = new Synthesized(new TupleNode([new NumberNode(false), new NumberNode(false)]));

// /Users/tht/Documents/projects/synth/examples/Options.synth
export const Options = new Synthesized(new ObjectNode([["type", new SymbolNode(), false], ["mode", new StringNode(false).constraint(new RegexConstraint({"pattern":"development|production|testing","flags":""})), false], ["dev", new BooleanNode(false), true], ["logLevel", new NumberNode(false), true], ["stdio", new TupleNode([new StringNode(false), new StringNode(false), new StringNode(false)]), true], ["override", new ObjectNode([[/.+/, new BooleanNode(false), false]]), true]]));

// /Users/tht/Documents/projects/synth/examples/PositiveNumber.synth
export const PositiveNumber = new Synthesized(new NumberNode(false).constraint(new MinConstraint({"length":0,"value":0,"exclusive":false})));

// /Users/tht/Documents/projects/synth/examples/ServerError.synth
export const ServerError = new Synthesized(new ObjectNode([["code", new NumberNode(false), false], ["message", new StringNode(false), false]]));