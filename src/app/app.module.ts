import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadInfoComponent } from './upload-info/upload-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,  
    FormsModule, 
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
