import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HistorialService } from '../services/historial.service';
import { Registro } from '../interface';

@Component({
  selector: 'app-tab2-admin',
  templateUrl: './tab2-admin.page.html',
  styleUrls: ['./tab2-admin.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonList, IonLabel, IonItem, IonButton, IonContent, CommonModule, FormsModule,IonHeader,IonToolbar,IonTitle]
})
export class Tab2AdminPage implements OnInit {

 private historialServices = inject(HistorialService);
  registros: any[]=[];
 


  ngOnInit() {
    this.obtenerMaterialUso();
  }

  obtenerMaterialUso() {
    this.historialServices.obtenerHistorial().subscribe({
      next: (Response) => {
        this.registros = Response
        console.log('Equipos cargados:', this.registros); // Para verificar
      },
      error: (err) => {
        console.error('Error al obtener los equipos:', err);
      }
    });
  }


  constructor() {
    addIcons({ ellipsisVerticalOutline });
  }


  verDetalles(equipo: any) {
    console.log('Equipo seleccionado:', equipo);
    // Aquí puedes abrir un modal o redirigir a otra página
  }


 

}
