import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found.component';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
  declarations: [NotFoundComponent, ForbiddenComponent],
  imports: [CommonModule, SharedModule]
})
export class ErrorModule {}
