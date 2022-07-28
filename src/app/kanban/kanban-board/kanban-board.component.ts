import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { BoardService } from '../board.service';
import { Board } from '../model/board.model';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  boards?: Board[];
  subscription?: Subscription;

  constructor(
    private boardService: BoardService,
    public angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.subscription = this.boardService
      .getUserBoards()
      .subscribe((boards) => {
        this.boards = boards;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  sortBoards(boards: Board[]) {
    this.boardService.sortBoards(boards);
  }

  createBoard({ title, priority }: { title: string; priority: number }) {
    this.boardService.createBoard({
      title: title,
      priority: priority
    });
  }

  deleteBoard(boardId: string) {
    this.boardService.deleteBoard(boardId);
  }

  sortTasks(boardsToSort: { boardId: string; tasks: Task[] }[]) {
    boardsToSort.forEach((board) => {
      this.boardService.updateTasks(board.boardId, board.tasks);
    });
  }

  updateTasks({ boardId, tasks }: { boardId: string; tasks: Task[] }) {
    this.boardService.updateTasks(boardId, tasks);
  }

  removeTask({ boardId, task }: { boardId: string; task: Task }) {
    this.boardService.removeTask(boardId, task);
  }
}
