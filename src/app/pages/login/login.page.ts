import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel,
  IonButton, IonText, IonInput, IonCard, IonCardHeader, IonAvatar,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon,
  ToastController, LoadingController
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Usuario } from 'src/app/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonAvatar, IonCardHeader, IonCard,
    CommonModule, FormsModule, IonContent, IonItem, IonButton, IonInput, IonLabel,
    RouterModule, IonText
  ]
})
export class LoginPage implements OnInit {

  /* --------- propiedades del formulario ---------- */
  email = '';
  password = '';
  showPassword = false;
  passwordFieldType: 'text' | 'password' = 'password';

  /* --------- dependencias ---------- */
  private authService = inject(ServiceService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  /* --------- carrusel ---------- */
  currentImage = 0;
  carouselImages: string[] = [
    'assets/KITSdeherramientas.png',
    'assets/multimetros.png',
    'assets/proyector1.png',
    'assets/festo.jpg',
    'assets/fuenteV.png'
  ];
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    autoplay: { delay: 5000 },
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true }
  };

  /* --------- ciclo ---------- */
  ngOnInit() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.carouselImages.length;
    }, 3000);
  }

  /* --------- helpers ---------- */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  private async presentToast(msg: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000, color });
    await toast.present();
  }

  /* --------- login ---------- */
  async onLogin() {
    if (!this.email || !this.password) {
      this.presentToast('Correo y contraseña son requeridos', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'circles'
    });
    await loading.present();

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: async (response) => {
          await loading.dismiss();

          console.log('Login exitoso', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('User', JSON.stringify(response.usuario));

          const rol = response.usuario.rol?.trim();

          if (rol === 'admin') {
            this.router.navigate(['/tabs-Admin/tab1']);
          } else {
            this.router.navigate(['/tabs/tab1']);
          }

          this.presentToast('¡Bienvenido!', 'success');
        },
        error: async (err) => {
          await loading.dismiss();
          console.error('Error al iniciar sesión:', err);
          this.presentToast('Correo o contraseña incorrectos', 'danger');
        }
      });
  }
}
