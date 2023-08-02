import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public countries$ = new BehaviorSubject<any[]>([]);
  public userUpdate$ = new BehaviorSubject<any>({});
  public searchLanding$ = new BehaviorSubject<any>({});
  public routePage$ = new BehaviorSubject<any>('');
  constructor() { }
}
