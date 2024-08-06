import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { DragDropDirective } from './components/drag-drop.directive';

@NgModule({
  declarations: [
    LoaderComponent, DragDropDirective
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropDirective
  ]
})
export class SharedModule { }
