import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  selectedTheme: any = localStorage.getItem('selected-theme');
  themeMode: any = localStorage.getItem('themeMode'); // 'light' or 'dark'

  // activeLightTheme = 'default-theme';
  // activeDarkTheme = 'midnight-blue';

  activeLightTheme: any = localStorage.getItem('activeLightTheme');
  activeDarkTheme: any = localStorage.getItem('activeDarkTheme');

  previousActiveLightTheme: any = '';

  previousActiveDarkTheme: any = '';

  constructor() {}
}
