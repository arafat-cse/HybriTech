import { Routes } from '@angular/router';
// import { UserComponent } from './user/user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

export const routes: Routes = [
  {
    path: '',component: ListUserComponent,

    // component: UserComponent,
  },
];
