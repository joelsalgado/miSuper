import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {SqliteService} from '../bd/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareas: any[] = [];

  constructor(public alertCtrl: AlertController,
              public service: SqliteService) {
    this.getAllTareas();
    console.log(this.tareas);
  }

  getAllTareas() {
    this.service.getAll()
        .then(tareas => {
          alert(tareas);
          this.tareas = tareas;
        })
        .catch( error => {
          alert( error );
        });
  }

  async openAlertNewTask() {
    const alert = await this.alertCtrl.create({
      message: 'Tienda comercial',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar el nombre de la tienda',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            data.completed = false;
            this.service.create(data)
                .then(response => {
                  this.getAllTareas();
                })
                .catch( error => {
                  console.error( error );
                });
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTarea(tarea) {
    this.service.delete(tarea)
        .then(response => {
          console.log( response );
          this.getAllTareas();
        })
        .catch( error => {
          console.error( error );
        });
  }

  async updateTarea(tienda) {
    const alert = await this.alertCtrl.create({
      message: 'Tienda comercial',
      inputs: [
        {
          value: tienda.nombre,
          name: 'title',
          placeholder: 'Edita el nombre de la tienda',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            tienda.completed = false;
            tienda.nombre = data.title;
            this.service.update(tienda)
                .then(response => {
                  this.getAllTareas();
                })
                .catch( error => {
                  console.error( error );
                });
          }
        }
      ]
    });
    await alert.present();
  }

}
