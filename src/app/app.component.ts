import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Person } from '../../types'
import { FormsModule } from '@angular/forms'; // Add this import

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'name-game';
  currentPerson!: Person;
  guessIsCorrect: boolean | null = null;
  nameGuess = '';
  guessHasBeenSubmitted = false;
  userErrors = 0;
  isNewPerson = true;
  gameIsRunning = false;
  slidesShown = 1;

  people: Person[] = [
    {
      name: 'Alejandro',
      image: 'asia_man.png',
      hasBeenMet: false,
    },
    {
      name: 'Jess',
      image: 'black_dude.jpeg',
      hasBeenMet: false,
    },
    {
      name: 'Gretchen',
      image: 'black_girl.jpg',
      hasBeenMet: false,
    },
    {
      name: 'Hiroshi',
      image: 'bro.png',
      hasBeenMet: false,
    },
    {
      name: 'Jaquavius',
      image: 'fat.png',
      hasBeenMet: false,
    },
    {
      name: 'Ngozi',
      image: 'girl.png',
      hasBeenMet: false,
    },
    {
      name: 'Ingrid',
      image: 'jamaican.png',
      hasBeenMet: false,
    },
    {
      name: 'Elsa',
      image: 'mamacita.png',
      hasBeenMet: false,
    },
    {
      name: 'Carlos',
      image: 'whiteboi.png',
      hasBeenMet: false,
    },
    {
      name: 'Lashonda',
      image: 'woman.png',
      hasBeenMet: false,
    },
    {
      name: 'Qiang',
      image: 'jew.png',
      hasBeenMet: false,
    },
  ]

  constructor() {
    this.currentPerson = this.people[Math.floor(Math.random() * this.people.length)];
  }

  startGame(){
    this.gameIsRunning = true;
  }

  //run this at the end of when a person is met
  markAsMet(name: string): void {
    let person = this.people.find(person => person.name === name);
    if (person) {
      person.hasBeenMet = true;
    }
  }

  getNewPerson(): Person {
    //randomly select a card that has not been met
    let randomIndex = Math.floor(Math.random() * this.people.length);
    let randomPerson = this.people[randomIndex];
    if (randomPerson.hasBeenMet) {
      return this.getNewPerson();
    }
    return randomPerson;
  }

  getOldPerson(): Person {
    //randomly select a card that has been met
    let randomIndex = Math.floor(Math.random() * this.people.length);
    let randomPerson = this.people[randomIndex];
    if (!randomPerson.hasBeenMet) {
      return this.getOldPerson();
    }
    return randomPerson;
  }

  getNextPerson() {
    this.slidesShown+=1;
    this.markAsMet(this.currentPerson.name);
    this.nameGuess = '';
    this.guessHasBeenSubmitted = false;
    let random = Math.random();
    if (random < 0.8) {
      this.isNewPerson = true;
      this.currentPerson = this.getNewPerson();
    } else {
      this.isNewPerson = false;
      this.currentPerson = this.getOldPerson();
    }
  }

  hasBeenMet(): boolean {
    return this.people.every(person => person.hasBeenMet);
  }

  validateGuess() {
    this.guessHasBeenSubmitted = true;
    if (this.currentPerson.name.toLowerCase() !== this.nameGuess.toLowerCase()){
      this.guessIsCorrect = false;
      this.userErrors +=1;
      return false;
    }
    this.guessIsCorrect = true;
    return true;
  }

  didYouLose() {
    if (this.userErrors > 4){
      this.gameIsRunning = false;
      return true;
    }
    return false;
  }

  resetGame(): void {
    this.people.forEach(person => person.hasBeenMet = false);
  }

  getImagePath(relativePath: string): string {
    console.log('Image path: ', relativePath);
    return relativePath;
  }

}


