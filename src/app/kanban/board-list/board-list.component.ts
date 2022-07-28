import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from '../model/board.model';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {
  @Output()
  boardDroppedEvent = new EventEmitter<Board[]>();

  @Output()
  boardCreatedEvent = new EventEmitter<{ title: string; priority: number }>();

  @Output()
  boardDeletedEvent = new EventEmitter<string>();

  @Output()
  taskDroppedEvent = new EventEmitter<
    Array<{
      boardId: string;
      tasks: Task[];
    }>
  >();

  @Output()
  taskUpdatedEvent = new EventEmitter<{
    boardId: string;
    tasks: Task[];
  }>();

  @Output()
  taskDeletedEvent = new EventEmitter<{ boardId: string; task: Task }>();

  @Input()
  boards?: Board[];

  previousBoard: Board = {};
  dropped = true;
  subscription?: Subscription;

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  boardDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards!, event.previousIndex, event.currentIndex);
    this.boardDroppedEvent.emit(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boards?.push({ title: result, priority: this.boards?.length! });
        this.boardCreatedEvent.emit({
          title: result,
          priority: this.boards?.length!
        });
      }
    });
  }

  saveExitedBoard(exitedBoard: Board) {
    if (this.dropped) {
      this.previousBoard = exitedBoard;
      this.dropped = false;
    }
  }

  taskDrop({
    event,
    currentBoard
  }: {
    event: CdkDragDrop<string[]>;
    currentBoard: Board;
  }) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        currentBoard.tasks!,
        event.previousIndex,
        event.currentIndex
      );
      this.taskDroppedEvent.emit([
        { boardId: currentBoard.id!, tasks: currentBoard.tasks! }
      ]);
    } else {
      transferArrayItem(
        this.previousBoard.tasks!,
        currentBoard.tasks!,
        event.previousIndex,
        event.currentIndex
      );
      this.taskDroppedEvent.emit([
        { boardId: currentBoard.id!, tasks: currentBoard.tasks! },
        { boardId: this.previousBoard.id!, tasks: this.previousBoard.tasks! }
      ]);
    }
    this.dropped = true;
  }

  taskUpdate({ boardId, tasks }: { boardId: string; tasks: Task[] }) {
    this.taskUpdatedEvent.emit({ boardId: boardId, tasks: tasks });
  }

  boardDelete(boardId: string) {
    this.boards?.forEach((board, idx) => {
      if (board.id === boardId) this.boards?.splice(idx, 1);
    });
    this.boardDeletedEvent.emit(boardId);
  }

  taskDelete({ boardId, task }: { boardId: string; task: Task }) {
    this.taskDeletedEvent.emit({ boardId: boardId, task: task });
  }
}
