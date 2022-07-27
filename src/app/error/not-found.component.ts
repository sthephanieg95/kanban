import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container">
      <mat-card>
        <h1><mat-icon class="icon">error</mat-icon> 404</h1>
        <mat-card-content>
          <h2>Not Found</h2>
          <p>The requested page was not found.</p>

          <a routerLink="/" mat-raised-button color="primary">Go Back Home</a>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./error.scss']
})
export class NotFoundComponent {}
