import { Component } from '@angular/core';

import { NavController, AlertController,ActionSheetController  } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { HomePage } from '../home/home';

/*
  Generated class for the Completed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html'
})
export class CompletedPage {

    todoList: FirebaseListObservable<any>;
    completedList: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.todoList = af.database.list('/todoList');
      this.completedList = af.database.list('/completedList');

  }

  addTodo(){
  let prompt = this.alertCtrl.create({
    title: 'New Todo',
    message: "Enter a name for this new item you're so keen on adding",
    inputs: [
      {
        name: 'Name',
        placeholder: 'Name'
      },
      {
        name: 'StartDate',
        placeholder: 'StartDate'
      },
      {
        name: 'StartTime',
        placeholder: 'StartTime'
      },
       {
        name: 'StartPoint',
        placeholder: 'StartPoint'
      },
      {
        name: 'EndPoint',
        placeholder: 'EndPoint'
      },
      {
        name: 'Remarks',
        placeholder: 'Remarks'
      },
      
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.todoList.push({
            Name: data.Name,
            StartDate: data.StartDate,
            StartTime: data.StartTime,
            StartPoint: data.StartPoint,
            EndPoint: data.EndPoint,
            Remarks : data.Remarks,
            IsCompleted : false,
          });
        }
      }
    ]
  });
  prompt.present();
}


addCompleted(todoName,todoStartDate,todoStartTime,todoStartPoint,todoEndPoint,todoRemarks){
  
          this.completedList.push({
            Name: todoName,
            StartDate: todoStartDate,
            StartTime: todoStartTime,
            StartPoint: todoStartPoint,
            EndPoint: todoEndPoint,
            Remarks :todoRemarks,
            IsCompleted : true,
          });
}
addIncomplete(todoName,todoStartDate,todoStartTime,todoStartPoint,todoEndPoint,todoRemarks){
  
          this.todoList.push({
            Name: todoName,
            StartDate: todoStartDate,
            StartTime: todoStartTime,
            StartPoint: todoStartPoint,
            EndPoint: todoEndPoint,
            Remarks :todoRemarks,
            IsCompleted : false,
          });
} 


removeTodo(todoId: string){
  this.todoList.remove(todoId);
}

removeCompleted(todoId: string){
  this.completedList.remove(todoId);
}


updateTodo(todoId, todoName,todoStartDate, todoStartTime,todoStartPoint,todoEndPoint,todoRemarks){
  let prompt = this.alertCtrl.create({
    title: 'Todo Name',
    message: "Update the details for this item",
    inputs: [
      {
        name: 'Name',
        placeholder: 'Name',
        value: todoName
      },
       {
        name: 'StartDate',
        placeholder: 'StartDate',
        value: todoStartDate
      },
       {
        name: 'StartTime',
        placeholder: 'StartTime',
        value: todoStartTime
      },
      {
        name: 'StartPoint',
        placeholder: 'StartPoint',
        value: todoStartPoint
      },
      {
        name: 'EndPoint',
        placeholder: 'EndPoint',
        value: todoEndPoint
      },
      {
        name: 'Remarks',
        placeholder: 'Remarks',
        value: todoRemarks
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.todoList.update(todoId, {
            Name: data.Name,
            StartDate: data.StartDate,
            StartTime: data.StartTime,
            StartPoint: data.StartPoint,
            EndPoint: data.EndPoint,
            Remarks: data.Remarks,
          });
        }
      }
    ]
  });
  prompt.present();
}


showOptions(todoId, todoName,todoStartDate,todoStartTime,todoStartPoint,todoEndPoint,todoRemarks) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete item',
        role: 'destructive',
        handler: () => {
          this.removeTodo(todoId);
        }
      },{
        text: 'Update Name',
        handler: () => {
          this.updateTodo(todoId, todoName,todoStartDate,todoStartTime,todoStartPoint,todoEndPoint,todoRemarks);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },{
        text: 'Incomplete',
        handler: () => {
          this.addIncomplete(todoName,todoStartDate,todoStartTime,todoStartPoint,todoEndPoint,todoRemarks)
          this.removeCompleted(todoId);
          console.log('Cancel clicked');
        }
      }
      
    ]
  });
  actionSheet.present();
}
 viewHome(){
    this.navCtrl.push(HomePage, {
    });
  }
}


