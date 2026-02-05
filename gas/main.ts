import { createBridge } from 'jupyter-iframe-commands-host';

// Create a bridge to the JupyterLite instance
const commandBridge = createBridge({ iframeId: 'jupyter-iframe' });

// Example: Toggle the left sidebar
async function toggleLeftSidebar() {
    await commandBridge.execute('application:toggle-left-area');
}

// Example: Change the theme
async function setDarkTheme() {
    await commandBridge.execute('apputils:change-theme', {
        theme: 'JupyterLab Dark',
    });
}

// List all available JupyterLab commands
async function listCommands() {
    const commands = await commandBridge.listCommands();
    console.log(commands);
}

document.getElementById("toggle-left-sidebar")?.addEventListener("click", toggleLeftSidebar);
document.getElementById("set-dark-theme")?.addEventListener("click", setDarkTheme);
document.getElementById("list-commands")?.addEventListener("click", listCommands);
