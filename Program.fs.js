import { Union } from "./fable/fable_modules/fable-library-js.4.18.0/Types.js";
import { union_type, class_type, int32_type } from "./fable/fable_modules/fable-library-js.4.18.0/Reflection.js";
import { singleton } from "./fable/fable_modules/fable-library-js.4.18.0/List.js";
import { printf, toConsole } from "./fable/fable_modules/fable-library-js.4.18.0/String.js";
import { Cmd_none } from "./fable/fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_either } from "./fable/fable_modules/Fable.Elmish.4.1.0/./cmd.fs.js";
import { singleton as singleton_1 } from "./fable/fable_modules/fable-library-js.4.18.0/AsyncBuilder.js";
import { ProgramModule_mkProgram, ProgramModule_withConsoleTrace, ProgramModule_run } from "./fable/fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { sleep, startImmediate } from "./fable/fable_modules/fable-library-js.4.18.0/Async.js";

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Do", "Done", "Finished", "Error"];
    }
}

export function Msg_$reflection() {
    return union_type("Program.Msg", [], Msg, () => [[], [["Item", int32_type]], [], [["Item", class_type("System.Exception")]]]);
}

export function init(_arg) {
    return [0, singleton((dispatch) => {
        dispatch(new Msg(0, []));
    })];
}

export function update(msg, state) {
    switch (msg.tag) {
        case 1: {
            const i = msg.fields[0] | 0;
            throw new Error("BOOM");
            toConsole(printf("Done: %i"))(i);
            return [i, singleton((dispatch) => {
                dispatch(new Msg(2, []));
            })];
        }
        case 2: {
            toConsole(printf("Finished"));
            return [state, Cmd_none()];
        }
        case 3: {
            toConsole(printf("Error: %A"))(msg.fields[0]);
            return [state, Cmd_none()];
        }
        default: {
            toConsole(printf("Do"));
            return [state, Cmd_OfAsyncWith_either((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, (x) => singleton_1.Delay(() => singleton_1.Return(x + 1)), state, (Item) => (new Msg(1, [Item])), (Item_1) => (new Msg(3, [Item_1])))];
        }
    }
}

export function view(_arg, _arg_1) {
}

ProgramModule_run(ProgramModule_withConsoleTrace(ProgramModule_mkProgram(() => init(undefined), update, (arg00$0040_1, arg10$0040) => {
    view(arg00$0040_1, arg10$0040);
})));

startImmediate(sleep(1000));

