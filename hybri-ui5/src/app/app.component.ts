import { Component } from '@angular/core';
// import { UserComponent } from "./user/user.component";
import { ListUserComponent } from './user/list-user/list-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListUserComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hybri-ui5';
}
