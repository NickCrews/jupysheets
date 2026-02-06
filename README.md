# Jupysheets - jupyterlite in google sheets

The vision is jupyterlite running in google sheets sidebar,
allowing for reading, modifying, and writing sheet data with your favorite
python tools such as polars.

This isn't working yet, but I have prototypes for several of the necessary parts of
communication.

I can pass a message from the python kernel all the way out to the js client host.
The tricky thing I'm running into now is that jupyterlab uses a messaging paradigm,
not call and response, so while I can send a message from python out to js,
I haven't yet figured out how to get a message back.

This isn't quite what is happening currently, but large scale this is the idea:

```mermaid
sequenceDiagram
    participant python
    participant jupyterlite frontend
    participant iframe boundary
    participant js client host
    participant Apps Script Backend
    note right of python: user calls jupysheets.readRange("A1:C4")
    note right of python: generate a request ID and block python code
    python->>+jupyterlite frontend: sends a command "jupysheets:rpcCall" with <br/> {requestId: 123, name: "readRange", args: {range: "A1:C4"}}
    jupyterlite frontend->>+js client host:Sends a message across the iframe boundary with<br>window.parent.postMessage('jupysheets:rpcCall', <br>{requestId: 123, name: "readRange", args: {range: "A1:C4"}});
    js client host->>Apps Script Backend: Makes an RPC call with eg <br>google.script.run.serverHandler({name: "readRange", args: {range: "A1:C4"}})
    Apps Script Backend->>js client host: Returns [[1,2,3], ...]
    js client host->>jupyterlite frontend: Sends a message across the iframe boundary with<br>window.parent.postMessage('jupysheets:rpcResponse', <br>{requestId: 123, result: [[1,2,3], ...]});
    jupyterlite frontend->>+python: sends a command "jupysheets:rpcResponse" with <br/> {requestId: 123, result: [[1,2,3], ...]}
    note right of python: finds the waiting function with that request ID<br>and return the result

```

## Dependencies and Related Work
- https://github.com/jtpio/ipylab: a jupyterlab extension that enables the two-way communication
of arbitrary commands from the python kernel back and forth to the jupyterlab frontend.