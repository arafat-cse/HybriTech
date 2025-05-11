import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { LabelComponent, TextAreaComponent } from '@ui5/webcomponents-ngx';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,AngularEditorModule,LabelComponent,TextAreaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
@Input() isOpen: boolean = false;
@Input() userId: number | null = null;
@Input() userData: any = null;
@Output() close: EventEmitter<void> = new EventEmitter<void>();
@Output() refreshTable: EventEmitter<void> = new EventEmitter<void>();

isSuccess: boolean = false;
isEditError: boolean = false;
SuccessMessage: string = '';
loading: boolean = false;
errorMessage: string = '';
formloading: boolean = false;
isActive: boolean = true;
name: string = '';
phone: string = '';
email: string = '';

odata: boolean = false;
 user: any = {};
//  editorConfig: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: '20rem',
//     minHeight: '5rem',
//     placeholder: 'Enter text here...',
//     translate: 'no',
//     defaultParagraphSeparator: 'p',
//     defaultFontName: 'Arial',
//   };
  constructor(
    private commonService: ServiceService,
    private datePipe: DatePipe
  ) {
    this.odata = this.commonService.odata;
    
  }
  ngOnInit(): void {
    if (this.userData) {
      this.name = this.userData.name;
      this.email = this.userData.email;
      this.phone = this.userData.phone;
      this.loadUserData();
    }
  }


   ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      if (this.userData) {
        this.loadUserData();
      } else if (this.userId) {
        this.getUserInfo();
      }
    }
  }
  loadUserData(): void {

    this.name = this.userData.name || '';
    this.email = this.userData.email || '';
    this.phone = this.userData.phone || '';
    this.isActive = this.user.is_active === true;
  }

  getUserInfo(): void {
    if (!this.userId) return;

    this.loading = true;
    this.commonService.get(`Users/${this.userId}`).subscribe({
      next: (response: any) => {
        this.userData = response;
        this.loadUserData();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
  updateUser() {
    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      is_active: this.isActive,

    };
    console.log('formData:', formData);

    this.formloading = true;
    this.commonService
      .put(`Users(${this.userId!})`, formData, true)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.formloading = false;
          this.isSuccess = true;
          this.SuccessMessage = 'User updated successfully';
          this.closeDialog();
        },
        error: (error: any) => {
          this.formloading = false;
          this.isEditError = true;
          this.errorMessage = error.error?.message || 'Error updating FAQ';
        },
      });
  }
  toggleActive($event: any) {
    this.isActive = $event.target.checked;
  }
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }


}
