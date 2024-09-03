import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/audditions/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/forgetpassword/forgetpassword.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';
import { ProductDetailsComponent } from './layout/audditions/product-details/product-details.component';
import { AllordersComponent } from './layout/audditions/allorders/allorders.component';
import { OrdersComponent } from './layout/audditions/orders/orders.component';
import { BrandsdetailsComponent } from './shared/layout/audditions/brandsdetails/brandsdetails/brandsdetails.component';


export const routes: Routes = [

    {path:'',  redirectTo:'home' , pathMatch:'full'},
    {path:'home', component:HomeComponent , canActivate:[authGuard]},
    {path:'carts', component:CartComponent , canActivate:[authGuard]},
    {path:'brands', component:BrandsComponent , canActivate:[authGuard]},
    {path:'categories', component:CategoriesComponent , canActivate:[authGuard]},
    {path:'products', component:ProductsComponent , canActivate:[authGuard]},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'forget', component:ForgetpasswordComponent},
    {path:'wishlist', component:WishlistComponent , canActivate: [authGuard]},
    {path:'productdetails/:id', component:ProductDetailsComponent , canActivate : [authGuard]},
    {path:'allorders', component:AllordersComponent , canActivate : [authGuard]},
    {path:'brandsdetails/:id', component:BrandsdetailsComponent , canActivate : [authGuard]},
    {path:'orders/:id', component:OrdersComponent , canActivate : [authGuard]},
    {path:'**', component:NotfoundComponent},
];
