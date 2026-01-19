export const GRID_SIZE = 8;

export const SHAPES = [
  // Single
  [[1]],
  // Square 2x2
  [[1, 1], [1, 1]],
  // Line 2
  [[1, 1]],
  [[1], [1]],
  // Line 3
  [[1, 1, 1]],
  [[1], [1], [1]],
  // L-Shapes
  [[1, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 1], [1, 1]],
  [[1, 1, 1], [1, 0, 0]],
  // T-Shape
  [[1, 1, 1], [0, 1, 0]],
];

export const SHAPE_COLORS = [
  '#38BDF8', // Cyan
  '#818CF8', // Indigo
  '#F472B6', // Pink
  '#FBBF24', // Amber
  '#34D399', // Emerald
];

export const initGrid = () => {
  return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(null));
};

export const getRandomShapes = (count = 3) => {
  return Array(count).fill(0).map(() => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    const colorIndex = Math.floor(Math.random() * SHAPE_COLORS.length);
    return {
      id: Math.random().toString(36).substr(2, 9),
      matrix: SHAPES[shapeIndex],
      color: SHAPE_COLORS[colorIndex],
      used: false,
    };
  });
};

export const canPlace = (grid, shape, startRow, startCol) => {
  const matrix = shape.matrix;
  if (startRow < 0 || startCol < 0) return false;
  if (startRow + matrix.length > GRID_SIZE || startCol + matrix[0].length > GRID_SIZE) return false;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) {
        if (grid[startRow + r][startCol + c] !== null) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (grid, shape, startRow, startCol) => {
  const newGrid = grid.map(row => [...row]);
  const matrix = shape.matrix;
  
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) {
        newGrid[startRow + r][startCol + c] = shape.color;
      }
    }
  }
  return newGrid;
};

export const clearLines = (grid) => {
  let newGrid = grid.map(row => [...row]);
  const rowsToClear = [];
  const colsToClear = [];

  // Check rows
  for (let r = 0; r < GRID_SIZE; r++) {
    if (newGrid[r].every(cell => cell !== null)) {
      rowsToClear.push(r);
    }
  }

  // Check columns
  for (let c = 0; c < GRID_SIZE; c++) {
    const isColFull = newGrid.every(row => row[c] !== null);
    if (isColFull) {
      colsToClear.push(c);
    }
  }

  // Perform clear
  rowsToClear.forEach(r => {
    for (let c = 0; c < GRID_SIZE; c++) newGrid[r][c] = null;
  });
  colsToClear.forEach(c => {
    for (let r = 0; r < GRID_SIZE; r++) newGrid[r][c] = null;
  });

  return {
    grid: newGrid,
    clearedCount: rowsToClear.length + colsToClear.length
  };
};

export const isGameOver = (grid, shapes) => {
  const activeShapes = shapes.filter(s => !s.used);
  if (activeShapes.length === 0) return false; // Hand empty, about to refresh

  for (const shape of activeShapes) {
    for (let r = 0; r <= GRID_SIZE - shape.matrix.length; r++) {
      for (let c = 0; c <= GRID_SIZE - shape.matrix[0].length; c++) {
        if (canPlace(grid, shape, r, c)) return false;
      }
    }
  }
  return true;
};
