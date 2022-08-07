import { Injectable } from '@angular/core';

interface IProfileButton {
  dataBtn: string;
  iconClass: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileMenuService {
  activeProfileButton: string = '';

  profileBtns: IProfileButton[] = [
    {
      dataBtn: 'my-profile',
      iconClass: 'icon-profile-user',
      title: 'Account',
    },
    {
      dataBtn: 'colors-themes',
      iconClass: 'icon-profile-appearance',
      title: 'Appearance',
    },

    /*{
      dataBtn: 'my-data',
      iconClass: 'bi bi-clouds',
      title: 'My Data',
    },*/
    {
      dataBtn: 'plans-billings',
      iconClass: 'icon-profile-billings',
      title: 'Billings & Plans',
    },
    {
      dataBtn: 'preferences',
      iconClass: 'bi bi-sliders',
      title: 'Preferences',
    },
  ];

  activeProfileTab: string = 'my account';

  constructor() {}

  // open Profile Popup Tabs
  openProfileTab(tab: string): void {
    this.activeProfileTab = tab;
  }
}
