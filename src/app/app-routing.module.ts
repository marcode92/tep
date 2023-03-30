import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstProjectComponent } from './first-project/first-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'tep', component: FirstProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
