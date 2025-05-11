import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  @Input() userId: number | null = null;
  @Input() UserData: any = {};
  @Input() isOpen: boolean = true;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  
  ngOnInit(): void {
    console.log('isOpen:', this.isOpen);
    console.log('UserData:', this.UserData);
  }
  formloding: boolean = false;
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }
}
