/**
 * @OnlyCurrentDoc
 */

// This function lives on the server and is run every time a user opens a notebook.
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('jupyter')
        .addItem('Show jupyter', 'showSidebar')
        .addToUi();
}

// This is run on the server every time someone clicks the "Show jupyter" button in the menu bar
async function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('index')
    SpreadsheetApp.getUi().showSidebar(html);
}

// This function lives on the server and is called from the client code above via RPC
function readRange(rangeString) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getRange(rangeString);
    const values = range.getValues();
    return values;
}