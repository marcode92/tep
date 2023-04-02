import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadInfoComponent } from './upload-info/upload-info.component';

const routes: Routes = [
  { path: 'tep', component: UploadInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
