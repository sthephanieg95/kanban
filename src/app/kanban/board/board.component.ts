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
  @Output() boardExitedEvent = new EventEmitter<Board>();

  @Output() taskDroppedEvent = new EventEmitter<{
    event: CdkDragDrop<string[]>;
    currentBoard: Board;
  }>();

  @Input() board: Board = {};

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
        ? { task: { ...task }, isNew: false, boardId: board?.id, idx }
        : { task: newTask, isNew: true, boardId: board?.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(board.id!, [
            ...board.tasks!,
            result.task
          ]);
        } else {
          board.tasks?.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(board.id!, board.tasks!);
        }
      }
    });
  }

  handleBoardDelete(board: Board) {
    this.boardService.deleteBoard(board.id!);
  }
}
