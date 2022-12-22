const vscode = acquireVsCodeApi();
const prefixInput = document.getElementById('prefix');
const errorDiv = document.getElementById('prefix-error');
const saveBtn = document.getElementById('save-btn');
let formInvalid = prefixInput.value.trim().length === 0;

function handleSave() {
  const prefix = document.getElementById('prefix').value;
  const description = document.getElementById('description').value;
  const body = document.getElementById('snippet').value;

  if (formInvalid) {
    errorDiv.classList.remove('d-none');
    return;
  }

  const snippet = {prefix, description, body};
  // send message back to extension
  vscode.postMessage({command: 'save', data: snippet});
}

prefixInput.addEventListener('blur', (event) => {
  const currentValue = event.target.value;
  const hasValue = currentValue.trim().length > 0;

  if (hasValue) {
    errorDiv.classList.add('d-none');
    formInvalid = false;
  } else {
    errorDiv.classList.remove('d-none');
  }
});

prefixInput.addEventListener('keyup', (event) => {
  const currentValue = event.target.value;
  const hasValue = currentValue.trim().length > 0;

  if (hasValue) {
    errorDiv.classList.add('d-none');
    formInvalid = false;
  } else {
    errorDiv.classList.remove('d-none');
  }
});
