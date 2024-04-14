import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

const modules = [
  TableModule,
  InputTextModule,
  ButtonModule,
  FileUploadModule,
  ConfirmDialogModule,
  ToastModule,
  SidebarModule,
  CalendarModule,
  AccordionModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class PrimengModule { }
