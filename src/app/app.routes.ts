import { Routes } from '@angular/router';
import path from 'path';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {path:'',component:HeaderComponent},
    {path:'add',component:UserComponent},
    {path:'update/:userId',component:UserComponent}
];
