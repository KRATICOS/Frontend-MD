import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonButton, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { HistorialService } from '../services/historial.service';
import { Registro } from '../interface';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';


@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.page.html',
  styleUrls: ['./tab-admin.page.scss'],
  standalone: true,
  imports: [ IonButtons, IonCardHeader, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonItem, IonLabel,  CommonModule, FormsModule, IonContent,IonHeader,IonToolbar,IonTitle]
})
export class TabAdminPage implements OnInit {
 
  private historialServices = inject(HistorialService);
  registros: any[]=[];
 


  ngOnInit() {
    this.obtenerMaterialUso();
  }

  obtenerMaterialUso() {
    this.historialServices.materialesEnUso().subscribe({
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
  }


 

}
