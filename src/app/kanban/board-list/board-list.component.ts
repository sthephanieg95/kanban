import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from '../model/board.model';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  previousBoard?: Board;
  subscription?: Subscription;

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit() {
    this.subscription = this.boardService
      .getUserBoards()
      .subscribe((boards) => {
        this.boards = boards;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  boardDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length
        });
      }
    });
  }

  handleBoardDelete(board: Board) {
    if (board.id) {
      this.boardService.deleteBoard(board.id);
    }
  }

  saveExitedBoard(currentBoard: Board) {
    this.previousBoard = currentBoard;
  }

  taskDrop(event: CdkDragDrop<string[]>, currentBoard: Board) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        currentBoard.tasks!,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateTasks(currentBoard.id!, currentBoard.tasks!);
    } else {
      transferArrayItem(
        this.previousBoard?.tasks!,
        currentBoard.tasks!,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateTasks(
        this.previousBoard?.id!,
        this.previousBoard?.tasks!
      );
      this.boardService.updateTasks(currentBoard.id!, currentBoard.tasks!);
    }
  }

  openTaskDialog(task?: Task, idx?: number, board?: Board): void {
    const newTask = { description: 'sdfs', label: 'purple' };
    console.log(board?.id);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: board?.id, idx }
        : { task: newTask, isNew: true, boardId: board?.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        if (result.isNew) {
          this.boardService.updateTasks(board?.id!, [
            ...board?.tasks!,
            result.task
          ]);
        } else {
          board?.tasks?.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(board?.id!, board?.tasks!);
        }
      }
    });
  }
}
