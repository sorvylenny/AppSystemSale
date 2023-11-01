import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/SystemSale/Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  totalIngresos: string="0";
  totalVentas: string="0";
  totalProductos:string="0";
  constructor( private dashboardService: DashBoardService) {}
  
  ngOnInit(): void {
    this.dashboardService.GetDashBoard().subscribe({
      next:(data)=>{
        if(data.status){
          this.totalIngresos= parseFloat(data.value.totalIngresos).toFixed(2);
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProducts;
          const arrayDate : any[]= data.value.saleslastweek;
          console.log(arrayDate)
          

          const labelTemp=arrayDate.map((value)=>value.fecha);
          const dataTemp=arrayDate.map((value)=>value.total);

          this.mostrarGrafico(labelTemp,dataTemp);
        }
      },
      error:(e)=>{}
    })
  }

  mostrarGrafico(labelGrafico:any[], dataGrafico:any[]){
    const chartBarras= new Chart('chartBarras',{
      type:'bar',
      data:{
       labels: labelGrafico,
       datasets:[{
        label:"# de Ventas",
        data:dataGrafico,
        backgroundColor:['rgba(26,188,156,40)'],
        borderColor:['rgba(11,83,69,30)'],
        borderWidth:1
       }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero: true,
          }
        }
      }
    });
  }
}
