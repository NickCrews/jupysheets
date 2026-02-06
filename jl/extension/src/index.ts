import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupysheets',
  description: 'Communication bridge for jupysheets',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const { commands } = app;

    // placeholder for no
    let registeredHandler = (args: any) => {
      console.log('Received message from iframe:', args);
    }

    commands.addCommand('pyframe:register-host-handler', {
      label: 'Message iframe',
      execute: args => {
        console.log('Registering host handler from iframe...');
        console.log('Handler args:', args);
        const hostHandler = args as unknown as (commandArgs?: any) => void;
        registeredHandler = hostHandler;
      }
    });

    commands.addCommand('pyframe:message-iframe', {
      label: 'Message iframe',
      execute: args => {
        console.log('Sending message to iframe...', args);
        registeredHandler(args);
      }
    });
  }
};

export default extension;
