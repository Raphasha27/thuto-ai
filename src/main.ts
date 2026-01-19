import Phaser from 'phaser';
import { Chess } from 'chess.js';

const COLORS = {
  background: 0x0F172A,
  boardDark: 0x1E293B,
  boardLight: 0x334155,
  highlight: 0x38BDF8,
  primary: 0x38BDF8,
  secondary: 0x818CF8,
  accent: 0xF472B6,
  whitePiece: 0xF8FAFC,
  blackPiece: 0x94A3B8,
  tutorialBg: 0x1E293B
};

const PIECE_SYMBOLS: Record<string, string> = {
  'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
  'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
};

const PUZZLES = [
  {
    name: "BACK RANK PROTOCOL",
    fen: "4r1k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: ["d1d8", "e8d8"],
    hint: "Identify the unprotected rank. Your Rook can reach the terminal line.",
    tutorial: [
      "Welcome to CHESSX Academy. In chess, a 'Back Rank Mate' happens when a King is trapped behind its own pawns.",
      "Notice the black King cannot move up because of the pawns at f7, g7, and h7.",
      "MOVE: Click your White Rook at d1 and slide it to d8 to initiate the back rank strike."
    ]
  },
  {
    name: "SMOTHERED NODE",
    fen: "6k1/5ppp/2N5/2N5/8/8/5PPP/6K1 w - - 0 1",
    solution: ["c6e7"],
    hint: "The King is claustrophobic. Use your Knight to jump the perimeter.",
    tutorial: [
      "Knights are the only pieces that can jump over others.",
      "A 'Smothered Check' occurs when the King is surrounded by its own pieces.",
      "MOVE: Select your Knight at c6 and move it to e7. Watch how it targets the King directly from the shadows."
    ]
  },
  {
    name: "FORK INITIALIZATION",
    fen: "r3k2r/ppq2ppp/2n5/8/3N4/2P5/PP3PPP/R2QK2R w KQkq - 0 1",
    solution: ["d1e2"],
    hint: "Attack the King and develop your piece simultaneously.",
    tutorial: [
      "A 'Fork' is a single move that attacks two pieces at once.",
      "By moving the Queen, we check the King while preparing to strike the Rook.",
      "MOVE: Move your Queen from d1 to e2 to force the black defensive sequence."
    ]
  }
];

class ChessScene extends Phaser.Scene {
  private chess: Chess;
  private boardContainer!: Phaser.GameObjects.Container;
  private selectedSquare: string | null = null;
  private currentPuzzleIndex: number = 0;
  private statusText!: Phaser.GameObjects.Text;
  private puzzleNameText!: Phaser.GameObjects.Text;
  private tutorialText!: Phaser.GameObjects.Text;
  private tutorialPanel!: Phaser.GameObjects.Container;
  private markers: Phaser.GameObjects.Arc[] = [];
  private isTutoring: boolean = true;
  private tutorStep: number = 0;

  constructor() {
    super('ChessScene');
    this.chess = new Chess();
  }

  create() {
    // Background
    this.add.rectangle(400, 350, 800, 700, COLORS.background);

    // Sidebar UI
    this.createSidebar();

    // Board
    this.createBoard();

    // Tutorial Panel
    this.createTutorialPanel();

    // Initialize Game
    this.loadPuzzle(0);
  }

  createSidebar() {
    this.add.text(400, 40, 'CHESSX', { 
      fontSize: '48px', color: '#38BDF8', fontStyle: '900', letterSpacing: 8 
    }).setOrigin(0.5);
    
    this.puzzleNameText = this.add.text(400, 100, '', { 
      fontSize: '24px', color: '#F472B6', fontStyle: 'bold' 
    }).setOrigin(0.5);

    this.statusText = this.add.text(400, 660, '', { 
      fontSize: '18px', color: '#F8FAFC', fontStyle: 'bold' 
    }).setOrigin(0.5);

    // Academy Button
    const academyBtn = this.add.container(680, 50);
    const abg = this.add.rectangle(0, 0, 120, 40, 0x1E293B).setStrokeStyle(1, 0x38BDF8);
    const atxt = this.add.text(0, 0, 'ACADEMY', { fontSize: '14px', color: '#FFFFFF' }).setOrigin(0.5);
    academyBtn.add([abg, atxt]);
    academyBtn.setInteractive(new Phaser.Geom.Rectangle(-60, -20, 120, 40), Phaser.Geom.Rectangle.Contains);
    academyBtn.on('pointerdown', () => this.toggleTutoring());
  }

  createBoard() {
    this.boardContainer = this.add.container(400, 380);
    const size = 60;
    const offset = -size * 3.5;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const x = offset + c * size;
        const y = offset + r * size;
        const sq = this.add.rectangle(x, y, size, size, (r + c) % 2 === 0 ? COLORS.boardLight : COLORS.boardDark);
        sq.setInteractive();
        const squareName = String.fromCharCode(97 + c) + (8 - r);
        sq.on('pointerdown', () => this.handleSquareClick(squareName));
        this.boardContainer.add(sq);
      }
    }
  }

  createTutorialPanel() {
    this.tutorialPanel = this.add.container(400, 600);
    const bg = this.add.rectangle(0, 0, 700, 100, COLORS.tutorialBg, 0.9)
      .setStrokeStyle(2, COLORS.primary, 0.5);
    this.tutorialText = this.add.text(0, 0, '', { 
      fontSize: '16px', color: '#FFFFFF', align: 'center', wordWrap: { width: 650 } 
    }).setOrigin(0.5);
    
    this.tutorialPanel.add([bg, this.tutorialText]);
    this.tutorialPanel.setAlpha(0);
  }

  toggleTutoring() {
    this.isTutoring = !this.isTutoring;
    this.tutorStep = 0;
    this.updateTutorial(this.currentPuzzleIndex);
  }

  loadPuzzle(index: number) {
    this.currentPuzzleIndex = index;
    this.tutorStep = 0;
    const puzzle = PUZZLES[index];
    this.chess.load(puzzle.fen);
    this.puzzleNameText.setText(puzzle.name);
    this.statusText.setText('INITIALIZING GAUNTLET...');
    this.statusText.setColor('#F8FAFC');
    this.renderPieces();
    this.updateTutorial(index);
  }

  updateTutorial(index: number) {
    if (this.isTutoring) {
      this.tutorialPanel.setAlpha(1);
      const puzzle = PUZZLES[index];
      this.tutorialText.setText(puzzle.tutorial[this.tutorStep]);
      
      // Highlight source square of move in tutorial
      const targetMove = puzzle.solution[0];
      const source = targetMove.substring(0, 2);
      this.highlightSquare(source);
    } else {
      this.tutorialPanel.setAlpha(0);
      this.clearHighlights();
    }
  }

  renderPieces() {
    while (this.boardContainer.length > 64) this.boardContainer.removeAt(64, true);
    this.markers.forEach(m => m.destroy());
    this.markers = [];

    const board = this.chess.board();
    const size = 60;
    const offset = -size * 3.5;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          const x = offset + c * size;
          const y = offset + r * size;
          const symbol = PIECE_SYMBOLS[piece.color === 'w' ? piece.type.toUpperCase() : piece.type];
          const text = this.add.text(x, y, symbol, { fontSize: '42px', color: piece.color === 'w' ? '#FFFFFF' : '#94A3B8' }).setOrigin(0.5);
          if (piece.color === 'w') text.setShadow(0, 0, '#38BDF8', 10, true, true);
          this.boardContainer.add(text);
        }
      }
    }
  }

  highlightSquare(sqName: string) {
    this.clearHighlights();
    const c = sqName.charCodeAt(0) - 97;
    const r = 8 - parseInt(sqName[1]);
    const size = 60;
    const offset = -size * 3.5;
    const highlight = this.add.rectangle(offset + c * size, offset + r * size, size, size, COLORS.primary, 0.3);
    this.boardContainer.addAt(highlight, 64);
  }

  clearHighlights() {
    while (this.boardContainer.length > 64 && this.boardContainer.getAt(64) instanceof Phaser.GameObjects.Rectangle) {
        this.boardContainer.removeAt(64, true);
    }
  }

  handleSquareClick(square: string) {
    if (this.selectedSquare === square) {
      this.selectedSquare = null;
      this.renderPieces();
      return;
    }

    if (this.selectedSquare) {
      const moveStr = this.selectedSquare + square;
      try {
        const move = this.chess.move({ from: this.selectedSquare, to: square, promotion: 'q' });
        if (move) {
          this.renderPieces();
          this.checkSolution(moveStr);
        }
      } catch (e) {
        this.selectedSquare = square;
        this.showMoves(square);
      }
    } else {
      const piece = this.chess.get(square as any);
      if (piece && piece.color === 'w') {
        this.selectedSquare = square;
        this.showMoves(square);
      }
    }
  }

  showMoves(square: string) {
    this.renderPieces();
    const moves = this.chess.moves({ square: square as any, verbose: true });
    const size = 60;
    const offset = -size * 3.5;

    moves.forEach(m => {
      const c = m.to.charCodeAt(0) - 97;
      const r = 8 - parseInt(m.to[1]);
      const marker = this.add.circle(offset + c * size, offset + r * size, 8, COLORS.highlight, 0.5);
      this.boardContainer.add(marker);
      this.markers.push(marker);
    });
  }

  checkSolution(move: string) {
    const puzzle = PUZZLES[this.currentPuzzleIndex];
    if (move === puzzle.solution[0]) {
      this.statusText.setText('CRITICAL HIT: SEQUENCE SYNCED');
      this.statusText.setColor('#38BDF8');
      
      this.time.delayedCall(1500, () => {
        if (this.isTutoring && this.tutorStep < puzzle.tutorial.length - 1) {
            this.tutorStep++;
            this.updateTutorial(this.currentPuzzleIndex);
        } else {
            const next = (this.currentPuzzleIndex + 1) % PUZZLES.length;
            this.loadPuzzle(next);
        }
      });
    } else {
      this.statusText.setText('ERROR: RECOVERY INITIALIZED');
      this.statusText.setColor('#F472B6');
      this.time.delayedCall(1000, () => this.loadPuzzle(this.currentPuzzleIndex));
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 700,
  backgroundColor: '#0F172A',
  parent: 'game-container',
  scene: ChessScene,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

new Phaser.Game(config);
