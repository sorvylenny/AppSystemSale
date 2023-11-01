import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsersComponent } from './Pages/users/users.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ReportComponent } from './Pages/report/report.component';
import { SalesComponent } from './Pages/sales/sales.component';
import { HistorialVentaComponent } from './Pages/historial-venta/historial-venta.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
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
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'historial_venta',
        component: HistorialVentaComponent,
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
