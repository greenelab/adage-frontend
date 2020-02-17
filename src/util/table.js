export class Table {
  constructor(array, rowKey, colKey, valueKey) {
    const rows = [...new Set([...array.map((element) => element[rowKey])])];
    const cols = [...new Set([...array.map((element) => element[colKey])])];
    const table = [];
    for (const row of rows) {
      if (!table[row])
        table[row] = [];
      for (const col of cols)
        table[row][col] = [];
    }
    for (const element of array) {
      const row = element[rowKey];
      const col = element[colKey];
      const value = element[valueKey];
      table[row][col] = value;
    }

    this.rows = rows;
    this.cols = cols;
    this.table = table;
  }
  rows() {
    return this.rows;
  }
  cols() {
    return this.cols;
  }
  cell(row, col) {
    
  }
}
