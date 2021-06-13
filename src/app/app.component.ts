import { Component } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private translateService: TranslateService) {

  }

  get isKa() {
    return this.isLanguage('ge');
  }

  get isEn() {
    return this.isLanguage('en');
  }


  isLanguage(lang: String) {
    const defaultLang = this.translateService.defaultLang;
    const currentLanguage = this.translateService.currentLang;

    return currentLanguage ? currentLanguage == lang : defaultLang == lang;
  }


  useGe() {
    this.translateService.use("ge");
  }

  useEn() {
    this.translateService.use("en");
  }

  todoIcon = faThList;

  levelOfTask: Level[] = [Level.Easy, Level.Medium, Level.Difficult];

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  isVisible: boolean = false;

  makeVisible(): void {
    this.isVisible = !this.isVisible;
  }

  onSubmit(data: Task): void {
    this.todo.push(data);
    this.makeVisible();
  }

  removeTodo(i: number): void {
    this.todo = this.todo.filter((_, index) => index !== i);
  }

  getStyle(i: Level): Style {
    return {
      red: i == Level.Difficult,
      green: i == Level.Easy,
      blue: i == Level.Medium
    };
  }

  pushInArr<T>(arr1: T[], arr2: T[], index: number): void {
    arr1.push(arr2[index]);
  }

  sendInProgress(i: number): void {
    this.pushInArr<Task>(this.inProgress, this.todo, i);
    this.todo = this.todo.filter((_, index) => index !== i);
  }

  backInTodo(i: number): void {
    this.pushInArr<Task>(this.todo, this.inProgress, i);
    this.inProgress = this.inProgress.filter((_, index) => index !== i);
  }

  sendInDone(i: number): void {
    this.pushInArr<Task>(this.done, this.inProgress, i);
    this.inProgress = this.inProgress.filter((_, index) => index !== i);
  }

  backInProgress(i: number): void {
    this.pushInArr<Task>(this.inProgress, this.done, i);
    this.done = this.done.filter((_, index) => index !== i);
  }

}


enum Level {
  Easy = "Easy",
  Medium = "Medium",
  Difficult = "Difficult"
}

interface Task {
  name: string;
  level: Level;
}

interface Style {
  red: boolean;
  green: boolean;
  blue: boolean;
}
