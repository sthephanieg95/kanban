import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/kanban/model/board.model';

@Component({
  selector: 'app-demo-board',
  templateUrl: './demo-board.component.html',
  styleUrls: ['./demo-board.component.scss']
})
export class DemoBoardComponent {
  boards: Board[] = [
    {
      id: '0',
      title: 'Todo',
      priority: 0,
      tasks: [
        {
          description: 'Plan my next awesome project',
          label: 'yellow'
        },
        { description: 'Reschedule my meeting', label: 'blue' }
      ]
    },
    {
      id: '1',
      title: 'In progress',
      priority: 1,
      tasks: [
        {
          description: 'Plan my next awesome project',
          label: 'yellow'
        },
        { description: 'Reschedule my meeting', label: 'blue' }
      ]
    },
    {
      id: '2',
      title: 'Done',
      priority: 2,
      tasks: [
        {
          description: 'Plan my next awesome project',
          label: 'yellow'
        },
        { description: 'Reschedule my meeting', label: 'blue' }
      ]
    }
  ];

  constructor() {}
}
