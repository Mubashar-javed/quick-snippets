const vscode = acquireVsCodeApi();

function handleSave() {
  const prefix = document.getElementById('prefix').value;
  const description = document.getElementById('description').value;
  const body = document.getElementById('snippet').value;

  // TODO: add validations
  const snippet = {prefix, description, body};

  // send message back to extension
  vscode.postMessage({command: 'save', data: snippet});
}
