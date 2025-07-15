import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonBadge, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonImg, IonCard, IonCol, IonButton, IonIcon, IonItem, IonSelectOption, IonLabel, IonText, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { InventarioService } from '../services/inventario.service';
import { Router } from '@angular/router';
import { IonSelect, IonSearchbar } from '@ionic/angular/standalone';
import { ellipsisVerticalOutline, trashOutline, filter, createOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3-admin',
  templateUrl: './tab3-admin.page.html',
  styleUrls: ['./tab3-admin.page.scss'],
  standalone: true,
  imports: [ IonSearchbar,IonSelect,IonText, IonLabel, IonItem, IonIcon, IonButton, IonCol, IonCard,IonContent, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonBadge, IonRow, IonGrid,  CommonModule, FormsModule,IonSelectOption,FormsModule,ReactiveFormsModule]
})
export class Tab3AdminPage implements OnInit {
equipos: any[] = [];
estadoSeleccionado = '';
  searchTerm = '';
  equiposOriginales: any[] = []


  private inventarioServices = inject(InventarioService);
  private router = inject(Router);
    private route = inject(ActivatedRoute);

  ngOnInit() {
    this.obtenerEquipos();

  }

obtenerEquipos() {
  this.inventarioServices.Equipos().subscribe({
    next: (res) => {
      this.equiposOriginales = res;
      this.equipos = [...this.equiposOriginales];
      console.log('Equipos cargados:', this.equipos);
    },
    error: (err) => {
      console.error('Error al obtener los equipos:', err);
    }
  });
}

filtrarEquipos() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.equipos = [...this.equiposOriginales];
    return;
  }

  this.equipos = this.equiposOriginales.filter(e => {
    return (
      (e.nombre && e.nombre.toLowerCase().includes(term)) ||
      (e.descripcion && e.descripcion.toLowerCase().includes(term)) ||
      (e.categoria && e.categoria.toLowerCase().includes(term)) ||
      (e.estado && e.estado.toLowerCase().includes(term))
    );
  });
}


editarMaterial(id: string) {
  // Si Tab3Admin está ya dentro de tabs-Admin, basta con:
  this.router.navigate(['../edit-material', id], { relativeTo: this.route });
  }

  constructor() {
  addIcons({filter, trashOutline, ellipsisVerticalOutline, createOutline});
}

  eliminarEquipo(id: string) {
  if (!id) return;

  if (confirm('¿Seguro que deseas eliminar este equipo?')) {
    this.inventarioServices.eliminarEquipo(id).subscribe({
      next: () => {
        console.log('Equipo eliminado:', id);
        this.equipos = this.equipos.filter(e => e._id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar el equipo:', err);
        alert('Error al eliminar el equipo. Intente de nuevo.');
      }
    });
  }
}

filtrarPorEstado(estado: string) {
  this.estadoSeleccionado = estado;

  if (!estado) {
    this.obtenerEquipos();
    return;
  }

  const estadoNormalizado = estado.trim().toLowerCase();

  this.inventarioServices.Equipos().subscribe({
    next: (res) => {
      this.equipos = res.filter(e =>
        e.estado && e.estado.trim().toLowerCase() === estadoNormalizado
      );
      console.log(`Filtrado local por ${estado}:`, this.equipos);
    },
    error: (err) => {
      console.error(`Error al filtrar por ${estado}:`, err);
    }
  });
}

  verDetalles(equipo: any) {
    console.log('Equipo seleccionado:', equipo);

  }


}
