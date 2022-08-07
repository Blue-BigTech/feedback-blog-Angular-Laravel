import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';
import { ThemeSwitcherService } from 'src/app/shared/services/theme-switcher.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  lightTheme: string = 'AtomLight';
  darkTheme: string = 'AtomDark';

  // lightThemeName = '';
  // darkThemeName = '';
  lightThemeName = localStorage.getItem('activeLightThemeName');
  darkThemeName = localStorage.getItem('activeDarkThemeName');

  themesLightList = [
    { name: 'Atom Light', value: 'atom-theme' },
    { name: 'Solarized Light', value: 'solarized-theme' },
    { name: 'Tokyo Light', value: 'tokyo-theme' },
  ];

  themesDarkList = [
    { name: 'Atom Dark', value: 'atom-theme' },
    { name: 'Atom Dark 2', value: 'atom-theme-2' },
    { name: 'Solarized Dark', value: 'solarized-theme' },
    { name: 'Tokyo Dark', value: 'tokyo-theme' },
  ];

  constructor(
    private themeRefresher: ThemeService,
    public themeService: ThemeSwitcherService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('themeMode') === 'dark') {
      if (localStorage.getItem('activeDarkTheme') === 'atom-theme') {
        this.darkTheme = 'AtomDark';
      } else if (localStorage.getItem('activeDarkTheme') === 'atom-theme-2') {
        this.darkTheme = 'AtomDark2';
      } else if (
        localStorage.getItem('activeDarkTheme') === 'solarized-theme'
      ) {
        this.darkTheme = 'SolarizedDark';
      } else if (localStorage.getItem('activeDarkTheme') === 'tokyo-theme') {
        this.darkTheme = 'TokyoDark';
      }
    } else if (localStorage.getItem('themeMode') === 'light') {
      if (localStorage.getItem('activeLightTheme') === 'atom-theme') {
        this.lightTheme = 'AtomLight';
      } else if (
        localStorage.getItem('activeLightTheme') === 'solarized-theme'
      ) {
        this.lightTheme = 'SolarizedLight';
      } else if (localStorage.getItem('activeLightTheme') === 'tokyo-theme') {
        this.lightTheme = 'TokyoLight';
      }
    }
  }

  chooseLightTheme(theme: any): void {
    this.lightTheme = theme.value;
    this.lightThemeName = theme.name;

    localStorage.setItem('selected-theme', theme.value);
    localStorage.setItem('activeLightTheme', theme.value);
    localStorage.setItem('activeLightThemeName', theme.name);
    localStorage.setItem('themeMode', 'light');

    this.themeService.selectedTheme = theme.value;
    this.themeService.themeMode = 'light';

    this.themeRefresher.setMessage('theme changes');
  }

  chooseDarkTheme(theme: any): void {
    this.darkTheme = theme.value;
    this.darkThemeName = theme.name;

    localStorage.setItem('selected-theme', theme.value);
    localStorage.setItem('activeDarkTheme', theme.value);
    localStorage.setItem('activeDarkThemeName', theme.name);
    localStorage.setItem('themeMode', 'dark');

    this.themeService.selectedTheme = theme.value;
    this.themeService.themeMode = 'dark';

    this.themeRefresher.setMessage('theme changes');
  }

  change(theme: any, themeMode: 'light' | 'dark') {
    // if (this.themeService.activeLightTheme === theme) {
    //   this.themeService.selectedTheme = theme;
    //   localStorage.setItem('selected-theme', theme);

    //   this.themeService.themeMode = themeMode;
    //   localStorage.setItem('themeMode', themeMode);

    //   this.themeRefresher.setMessage('theme changes');

    //   return;
    // }
    // if (this.themeService.activeDarkTheme === theme) {
    //   this.themeService.selectedTheme = theme;
    //   localStorage.setItem('selected-theme', theme);

    //   this.themeService.themeMode = themeMode;
    //   localStorage.setItem('themeMode', themeMode);

    //   this.themeRefresher.setMessage('theme changes');

    //   return;
    // }

    localStorage.setItem('selected-theme', theme);
    localStorage.setItem('themeMode', themeMode);

    this.themeService.selectedTheme = theme;
    this.themeService.themeMode = themeMode;

    if (themeMode === 'light') {
      if (this.themeService.activeLightTheme === theme) {
        this.themeRefresher.setMessage('theme changes');
        return;
      }

      this.themeService.previousActiveLightTheme =
        this.themeService.activeLightTheme;
      this.themeService.activeLightTheme = theme;
      localStorage.setItem('activeLightTheme', theme);
    } else if (themeMode === 'dark') {
      if (this.themeService.activeDarkTheme === theme) {
        this.themeRefresher.setMessage('theme changes');
        return;
      }

      this.themeService.previousActiveDarkTheme =
        this.themeService.activeDarkTheme;
      this.themeService.activeDarkTheme = theme;
      localStorage.setItem('activeDarkTheme', theme);
    }

    this.themeRefresher.setMessage('theme changes');

    if (localStorage.getItem('themeMode') === 'dark') {
      if (localStorage.getItem('activeDarkTheme') === 'atom-theme') {
        this.darkTheme = 'AtomDark';
      } else if (localStorage.getItem('activeDarkTheme') === 'atom-theme-2') {
        this.darkTheme = 'AtomDark2';
      } else if (
        localStorage.getItem('activeDarkTheme') === 'solarized-theme'
      ) {
        this.darkTheme = 'SolarizedDark';
      } else if (localStorage.getItem('activeDarkTheme') === 'tokyo-theme') {
        this.darkTheme = 'TokyoDark';
      }
    } else if (localStorage.getItem('themeMode') === 'light') {
      if (localStorage.getItem('activeLightTheme') === 'atom-theme') {
        this.lightTheme = 'AtomLight';
      } else if (
        localStorage.getItem('activeLightTheme') === 'solarized-theme'
      ) {
        this.lightTheme = 'SolarizedLight';
      } else if (localStorage.getItem('activeLightTheme') === 'tokyo-theme') {
        this.lightTheme = 'TokyoLight';
      }
    }
  }
}
