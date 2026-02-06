# jupyter-Pyframe - python <-> iframe host communication

You can host a jupyterlite instance in an iframe.
This jupyterlab extension allows you to communicate from the host js
that holds the iframe, across the iframe boundary to the jupyterlab frontend
typescript code. Then, this sends the message from the jupyterlab frontend to the backend python kernel