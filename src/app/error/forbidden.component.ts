import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="container">
      <mat-card>
        <h1><mat-icon class="icon">warning</mat-icon> 403</h1>
        <mat-card-content>
          <h2>Forbidden</h2>
          <p>The page you're trying to access has restricted access.</p>

          <button routerLink="/login" mat-raised-button color="primary">
            Sign In
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./error.scss']
})
export class ForbiddenComponent {}
