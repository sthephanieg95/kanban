import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { Board } from '../model/board.model';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Output()
  boardExitedEvent = new EventEmitter<Board>();

  @Output()
  boardDeletedEvent = new EventEmitter<string>();

  @Output()
  taskDroppedEvent = new EventEmitter<{
    event: CdkDragDrop<string[]>;
    currentBoard: Board;
  }>();

  @Output()
  taskUpdatedEvent = new EventEmitter<{
    boardId: string;
    tasks: Task[];
  }>();

  @Output()
  taskDeletedEvent = new EventEmitter<{ boardId: string; task: Task }>();

  @Input()
  board: Board = {};

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  notifyBoardExited(exitedBoard: Board) {
    this.boardExitedEvent.emit(exitedBoard);
  }

  notifyTaskDropped(event: CdkDragDrop<string[]>, currentBoard: Board) {
    this.taskDroppedEvent.emit({ event, currentBoard });
  }

  openTaskDialog(board: Board, task?: Task, idx?: number) {
    const newTask = { description: '', label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? {
            task: { ...task },
            isNew: false,
            toDelete: false,
            boardId: board?.id,
            idx
          }
        : { task: newTask, isNew: true, toDelete: false, boardId: board?.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.toDelete) {
          board.tasks?.forEach((task, idx) => {
            if (
              task.description === result.task.description &&
              task.label === result.task.label
            )
              this.board?.tasks?.splice(idx, 1);
          });
          this.taskDeletedEvent.emit({ boardId: board.id!, task: result.task });
        } else {
          if (result.isNew) {
            board.tasks?.push(result.task);
            this.taskUpdatedEvent.emit({
              boardId: board.id!,
              tasks: board.tasks!
            });
          } else {
            board.tasks?.splice(result.idx, 1, result.task);
            this.taskUpdatedEvent.emit({
              boardId: board.id!,
              tasks: board.tasks!
            });
          }
        }
      }
    });
  }

  handleBoardDelete(board: Board) {
    this.boardDeletedEvent.emit(board.id);
  }
}
