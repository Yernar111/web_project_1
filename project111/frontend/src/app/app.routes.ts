import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { SignupComponent } from './signup-component/signup-component';
import { CategoriesComponent } from './categories-component/categories-component';
import { RegisterComponent } from './register-component/register-component';
import { ProductComponent } from './product-component/product-component';

export const routes: Routes = [
    { path: '', component: RegisterComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'categories/:id', component: CategoriesComponent },
    { path: 'product/:id', component: ProductComponent },
];
