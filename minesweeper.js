// rows: number of rows
// columns: number of columns
// n_mines: number of mines
function Minesweeper(rows, columns, n_mines) {
    
    "use strict";
    
    var i, j, k, q, aux_n_mines, r_row, r_column, previous_blank_space;
    
    // Box of the grid
    function Box() {
    
        // State of the box; if it is undisclosed (0), revealed(1), flagged(2) or in doubt(3).
        this.state = 0;
    
        // No mines around(0), 1 mine around(1), 2 mines around(2), ... it's a mine(9)
        this.mine = 0;
        
        // It shows what blank space it belongs to, 0 if it does not belong to any.
        this.blank_space = 0;
    }
    
    // Number of rows
    this.rows = rows;
    // Number of columns
    this.columns = columns;
    // Number of mines
    this.n_mines = n_mines;
    // Grid of the minesweeper
    this.grid = [];
    // Number of blank spaces
    this.n_blank_spaces = 0;
    
    // Creation of the grid
    for (i = 0; i < this.rows; i += 1) {
        this.grid[i] = [];
        for (j = 0; j < this.columns; j += 1) {
            this.grid[i][j] = new Box();
        }
    }
    // End of the creation of the grid
    
    // Creation of the mines
    aux_n_mines = this.n_mines;
    while (aux_n_mines > 0) {
        r_row = Math.floor(Math.random() * (this.rows - 1));
        r_column = Math.floor(Math.random() * (this.columns - 1));
        // [0][0]
        if (this.grid[r_row][r_column].mine !== 9) {
            this.grid[r_row][r_column].mine = 9;
            aux_n_mines -= 1;
            // [-1][-1]
            if (r_row - 1 >= 0 && r_column - 1 >= 0 && this.grid[r_row - 1][r_column - 1].mine !== 9) {
                this.grid[r_row - 1][r_column - 1].mine += 1;
            }
            // [-1][0]
            if (r_row - 1 >= 0 && this.grid[r_row - 1][r_column].mine !== 9) {
                this.grid[r_row - 1][r_column].mine += 1;
            }
            // [-1][+1]
            if (r_row - 1 >= 0 && r_column + 1 < this.columns && this.grid[r_row - 1][r_column + 1].mine !== 9) {
                this.grid[r_row - 1][r_column + 1].mine += 1;
            }
            // [0][-1]
            if (r_column - 1 >= 0 && this.grid[r_row][r_column - 1].mine !== 9) {
                this.grid[r_row][r_column - 1].mine += 1;
            }
            // [0][+1]
            if (r_column + 1 < this.columns && this.grid[r_row][r_column + 1].mine !== 9) {
                this.grid[r_row][r_column + 1].mine += 1;
            }
            // [+1][-1]
            if (r_row + 1 < this.rows && r_column - 1 >= 0 && this.grid[r_row + 1][r_column - 1].mine !== 9) {
                this.grid[r_row + 1][r_column - 1].mine += 1;
            }
            // [+1][0]
            if (r_row + 1 < this.rows && this.grid[r_row + 1][r_column].mine !== 9) {
                this.grid[r_row + 1][r_column].mine += 1;
            }
            // [+1][+1]
            if (r_row + 1 < this.rows && r_column + 1 < this.columns && this.grid[r_row + 1][r_column + 1].mine !== 9) {
                this.grid[r_row + 1][r_column + 1].mine += 1;
            }
        }
    }
    // End of mines's creation
    
    // Creation of blank spaces
    
    // First row
    previous_blank_space = false;
    for (j = 0; j < this.columns; j += 1) {
        if (this.grid[0][j].mine === 0) {
            if (previous_blank_space === true) {
                this.grid[0][j].blank_space = this.grid[0][j - 1].blank_space;
            } else {
                this.n_blank_spaces += 1;
                this.grid[0][j].blank_space = this.n_blank_spaces;
            }
            previous_blank_space = true;
        } else {
            previous_blank_space = false;
        }
    }
    // End of first row
    
    for (i = 1; i < this.rows; i += 1) {
        previous_blank_space = false;
        for (j = 0; j < this.columns; j += 1) {
            if (this.grid[i][j].mine === 0) {
                if (this.grid[i - 1][j].blank_space !== 0) {
                    this.grid[i][j].blank_space = this.grid[i - 1][j].blank_space;
                    if (previous_blank_space === true) {
                        if (this.grid[i][j - 1].blank_space !== this.grid[i][j].blank_space) {
                            // From the beginning to row i
                            for (k = 0; k < i; k += 1) {
                                for (q = 0; q < this.columns; q += 1) {
                                    if (this.grid[k][q].blank_space === this.grid[i][j - 1].blank_space) {
                                        this.grid[k][q].blank_space = this.grid[i][j].blank_space;
                                    }
                                }
                            }
                            // From the beginning of the row i to j - 1
                            for (k = 0; k < j - 1; k += 1) {
                                if (this.grid[i][k].blank_space === this.grid[i][j - 1].blank_space) {
                                    this.grid[i][k].blank_space = this.grid[i][j].blank_space;
                                }
                            }
                            this.grid[i][j - 1].blank_space = this.grid[i][j].blank_space;
                            this.n_blank_spaces -= 1;
                        }
                    }
                } else if (previous_blank_space === true) {
                    this.grid[i][j].blank_space = this.grid[i][j - 1].blank_space;
                } else {
                    this.n_blank_spaces += 1;
                    this.grid[i][j].blank_space = this.n_blank_spaces;
                }
                previous_blank_space = true;
            } else {
                previous_blank_space = false;
            }
        }
    }
    // End of the creation of blank spaces
}
