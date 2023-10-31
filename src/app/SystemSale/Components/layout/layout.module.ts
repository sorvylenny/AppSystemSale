import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsersComponent } from './Pages/users/users.component';
import { ProductsComponent } from './Pages/products/products.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { DetailsSaleComponent } from './Pages/details-sale/details-sale.component';
import { ReportComponent } from './Pages/report/report.component';
import { SharedModule } from '../../Shared/shared/shared.module';
import { ModelUserComponent } from './Models/model-user/model-user.component';
import { ModelProductComponent } from './Models/model-product/model-product.component';
import { ModelDetailsSaleComponent } from './Models/model-details-sale/model-details-sale.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    UsersComponent,
    ProductsComponent,
    SaleComponent,
    DetailsSaleComponent,
    ReportComponent,
    ModelUserComponent,
    ModelProductComponent,
    ModelDetailsSaleComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ]
})
export class LayoutModule { }
