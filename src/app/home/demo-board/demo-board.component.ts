import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/kanban/model/board.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-demo-board',
  templateUrl: './demo-board.component.html',
  styleUrls: ['./demo-board.component.scss']
})
export class DemoBoardComponent {
  boards: Board[] = [
    {
      id: uuid.v4(),
      title: 'Todo',
      priority: 0,
      tasks: [
        {
          description: 'Define architecture 🏛',
          label: 'blue'
        },
        {
          description: 'Call back investor 💰',
          label: 'purple'
        },
        {
          description: 'Set up cloud infrastructure ☁️',
          label: 'green'
        }
      ]
    },
    {
      id: uuid.v4(),
      title: 'In progress',
      priority: 1,
      tasks: [
        {
          description: 'Plan my next awesome project 🔥',
          label: 'yellow'
        },
        {
          description: 'Get more coffee ☕️',
          label: 'red'
        }
      ]
    },
    {
      id: uuid.v4(),
      title: 'Done',
      priority: 2,
      tasks: [
        {
          description: 'Get some coffee ☕️',
          label: 'gray'
        },
        { description: 'Reschedule my meeting 🗓', label: 'gray' }
      ]
    }
  ];

  constructor() {}
}
