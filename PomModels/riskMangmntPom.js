

class rmPage{


    constructor(page){
        this.page =  page;

    }


    // Fill cell by column header name and row index, scoped to a wrapper div
    async fillCellByHeader(wrapperId, headerName, rowIndex, value) {
    const section = this.page.locator(`#${wrapperId}`);
    
    // Find the index of the column with the given header text
    const headers = section.locator('thead tr th');
    const count = await headers.count();
    let colIndex = -1;

    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).innerText();
      if (text.trim() === headerName) {
        colIndex = i;
        break;
      }
    }

    if (colIndex === -1) {
      throw new Error(`Column header "${headerName}" not found in section #${wrapperId}`);
    }

    // Fill the cell under the correct column
    const cell = section.locator('tbody tr').nth(rowIndex).locator('td').nth(colIndex);
    const input = cell.locator('textarea, input, [contenteditable="true"]');
    await input.click(); // to focus
    await input.fill(value);
  }


}

module.exports = { rmPage }