import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { LabelComponent, TextAreaComponent } from '@ui5/webcomponents-ngx';
import { ServiceService } from '../../services/service.service';
import { User } from '../../shared/Model/user';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    LabelComponent,
    TextAreaComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  @Input() isOpen: boolean | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() IsOpenToastAlert = new EventEmitter<void>();
  ToastType: string = '';
  loading: boolean = false;
  isSuccess: boolean = false;
  isAddError: boolean = false;

  errorMassage: string = '';
  // name: string = '';
  // gmail: string = '';
  // phone: string = '';
  htmlContent: string = '';
  placeholder: string = '';
  isActive: boolean = true;
  User = new User().deserialize({});

  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '20rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  // };

  constructor(
    private commandService: ServiceService,
    private datepipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  toggleAction($event: any) {
    if ($event.target.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  insertData() {
    if (!this.User.first_name || !this.User.email || !this.User.phone) {
      this.errorMassage = 'Please fill all the fields.';
      return;
    }

    // const data = {
    //   name: this.name,
    //   email: this.gmail, // If gmail is user's email
    //   phone: this.phone, // Make sure to bind this.phone from your form
    //   is_active: this.isActive,
    // };
    // console.log('data', data);

    this.loading = true;
    this.commandService.post('Users', this.User).subscribe(
      (response: any) => {
        console.log('response', response);
        this.loading = false;
        this.isSuccess = true;
        this.ToastType = 'add';
        setTimeout(() => {
          this.IsOpenToastAlert.emit();
        }, 1000);
        this.resetForm();
        this.closeDialog();
      },
      (error: any) => {
        this.loading = false;
        this.errorMassage = 'An error occurred while submitting the data.';
        console.error(error);
      }
    );
  }
  rersetForm() {
    this.errorMassage = '';
    this.User.first_name = '';
    this.User.last_name = '';
    this.User.email = '';
    this.User.phone = '';
    this.User.address = '';
  }
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }
 
  resetForm() {
    this.User.first_name = '';
    this.User.last_name = '';
    this.User.email = '';
    this.User.phone = '';
    this.User.address = '';
    this.htmlContent = '';
    this.isActive = true;
  }
}
