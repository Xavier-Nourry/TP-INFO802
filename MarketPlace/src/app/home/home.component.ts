import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [ // TODO : voir si meilleure manière de faire
    { picture: '', title: 'Card 1', cols: 2, rows: 1 },
    { picture: '', title: 'Card 2', cols: 2, rows: 1 },
    { picture: '', title: 'Card 3', cols: 2, rows: 1 },
    { picture: '', title: 'Card 4', cols: 2, rows: 1 }
  ];
  cardsForHandset = [];
  cardsForWeb = [];
  
  isHandset: boolean = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService: AppService) {}

  ngOnInit(){
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();
    });
    this.appService.getDeals().subscribe(
      response => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
      },
      error => {
        alert("Une erreur s'est produite lors de la réception des données du serveur. Veuillez réessayer plus tard.");
      }
    );
  }

  loadCards(){ // Carte correspondante à l'écran (responsive)
    this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
  }

  getImage(picture: string): string{
    return 'url('+ picture +')';
  }
}
