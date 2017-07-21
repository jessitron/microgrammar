import { AbstractStateMachine } from "../../../support/AbstractStateMachine";
import { LangState, LangStateMachine } from "../LangStateMachine";
import { JavaContentStateMachine } from "./java/JavaContentStateMachine";
import { Normal } from "./States";

/**
 * Track depth of curlies and parentheses in C family languages
 */
export class NestingDepthStateMachine extends AbstractStateMachine<LangState> {

    private readonly push: string;

    private readonly pop: string;

    private stateMachine: LangStateMachine;

    constructor(private kind: "block" | "parens" = "block",
                private factory: () => LangStateMachine = () => new JavaContentStateMachine(),
                state: LangState = Normal,
                public depth = 0) {
        super(state);
        this.stateMachine = this.factory();
        switch (kind) {
            case "block":
                [this.push, this.pop] = ["{", "}"];
                break;
            case "parens":
                [this.push, this.pop] = ["(", ")"];
                break;
        }
    }

    public clone(): NestingDepthStateMachine {
        return new NestingDepthStateMachine(this.kind, this.factory, this.state, this.depth);
    }

    public consume(char: string): void {
        this.stateMachine.consume(char);
        this.state = this.stateMachine.state;
        if (this.state.normal()) {
            switch (char) {
                case this.push:
                    this.depth++;
                    break;
                case this.pop:
                    this.depth--;
                    break;
                default:
            }
        }
    }
}
