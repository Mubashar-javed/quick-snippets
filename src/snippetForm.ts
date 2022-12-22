import * as fs from 'fs';
import * as vscode from 'vscode';
import {Uri} from 'vscode';
import {Utils} from './utils';
import {DefaultError, Snippet} from './utils/constants';

export default function openSnippetForm(context: vscode.ExtensionContext) {
  // passing active language from here because after openeing the webview
  // the active language will be undefine as its not a
  const activeLanguage = Utils.editorActiveLanguage();
  if (!activeLanguage) {
    vscode.window.showErrorMessage(DefaultError.UNKNOWN_LANGUAGE);
    return;
  }

  const selectedText = Utils.getSelectedText();
  if (!selectedText) {
    vscode.window.showErrorMessage(DefaultError.NO_TEXT);
    return;
  }

  const panel = vscode.window.createWebviewPanel(
    'snippetForm',
    'Snippet Form',
    vscode.ViewColumn.One,
    {enableScripts: true}
  );

  panel.webview.html = getWebviewContent(context, panel.webview, selectedText);
  listenWebviewChanges(panel, activeLanguage);

  panel.onDidDispose(() => {}, null, context.subscriptions);
}

function listenWebviewChanges(
  panel: vscode.WebviewPanel,
  activeLanguage: string
) {
  panel.webview.onDidReceiveMessage((message) => {
    switch (message.command) {
      case 'save':
        Utils.saveSnippet(message.data as Snippet, panel, activeLanguage);
    }
  });
}

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  selectedText: string
) {
  const stylePath = webview.asWebviewUri(
    Uri.joinPath(context.extensionUri, 'assets', 'public', 'styles.css')
  );
  const mainPath = webview.asWebviewUri(
    Uri.joinPath(context.extensionUri, 'assets', 'public', 'main.js')
  );

  const htmlFile = webview.asWebviewUri(
    Uri.joinPath(context.extensionUri, 'assets', 'public', 'form.html')
  );

  const html = fs.readFileSync(htmlFile.fsPath, 'utf-8');

  // put selected text, style path, as well as main path in the html file
  //TODO: use a template string approach to do this
  return html
    .replace('__selectedText', selectedText)
    .replace('__stylePath', stylePath.toString())
    .replace('__mainPath', mainPath.toString());
}
