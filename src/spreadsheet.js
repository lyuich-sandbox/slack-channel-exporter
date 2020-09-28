const writeSheet = values => {
  SpreadsheetApp.getActiveSheet()
    .getRange('A2:G' + (values.length + 1))
    .setValues(values)
}
