open Elmish

type Msg =
    | Do
    | Done of int
    | Finished
    | Error of exn

let init _ = 0, Cmd.ofMsg Do

let update msg state =
    match msg with
    | Do -> 
        printfn "Do"
        // this correctly raise exception
        //state, Cmd.ofMsg (Done state) 
        // exception is not raised for Cmd.OfAsync.* functions
        state, Cmd.OfAsync.either (fun x -> async { return x + 1 }) state Done Error
    | Done i -> 
        failwith "BOOM"
        printfn "Done: %i" i
        i, Cmd.ofMsg Finished
    | Finished -> 
        printfn "Finished"
        state, Cmd.none
    | Error e ->
        printfn "Error: %A" e
        state, Cmd.none

let view _ _ = ()

// uncomment to print out the exception
//Program.mkProgram init (fun msg state -> try update msg state with e -> printfn "Exception: %A" e; raise e) view
Program.mkProgram init update view
|> Program.withConsoleTrace
|> Program.run

Async.Sleep 1000 |> Async.StartImmediate
