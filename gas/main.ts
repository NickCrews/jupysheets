import { createBridge } from 'jupyter-iframe-commands-host';

const commandBridge = createBridge({ iframeId: 'jupyterlite-iframe' });

await commandBridge.ready;

async function setTheme(theme: 'JupyterLab Dark' | 'JupyterLab Light') {
    await commandBridge.execute('apputils:change-theme', { theme, });
}

async function listCommands() {
    console.log('Listing available commands...');
    const commands = await commandBridge.listCommands();
    console.log(commands);
}

document.getElementById("set-dark-theme")?.addEventListener("click", () => setTheme('JupyterLab Dark'));
document.getElementById("set-light-theme")?.addEventListener("click", () => setTheme('JupyterLab Light'));
document.getElementById("list-commands")?.addEventListener("click", listCommands);

