import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadInfoComponent } from './upload-info/upload-info.component';
import { TepCalculateComponent } from './tep-calculate/tep-calculate.component';

const routes: Routes = [
  { path: 'tep', component: TepCalculateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
