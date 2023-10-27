import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsersComponent } from './Pages/users/users.component';
import { ProductsComponent } from './Pages/products/products.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { DetailsSaleComponent } from './Pages/details-sale/details-sale.component';
import { ReportComponent } from './Pages/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashBoard',
        component: DashBoardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'sale',
        component: SaleComponent,
      },
      {
        path: 'detailsSale',
        component: DetailsSaleComponent,
      },
      {
        path: 'report',
        component: ReportComponent ,
      },     
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
