const vscode = acquireVsCodeApi();

function handleSave() {
  const prefix = document.getElementById("prefix").value;
  const description = document.getElementById("description").value;
  const body = document.getElementById("snippet").value;

  const snippet = { prefix, description, body };

  // send message back to extension
  vscode.postMessage({ command: "save", data: snippet });
}

function showTextArea() {
  document.getElementById("snippet-text-area").style.display = "block";
  document.getElementById("snippet-text-area").focus();
  document.getElementById('snippet-area').style.display = "none";
}
