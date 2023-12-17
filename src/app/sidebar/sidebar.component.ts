import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Certificación',
      icon: 'fa-solid fa-certificate',
      href: './botadero.component.html'

    },
    {
      number: '2',
      name: 'Reportes',
      icon: 'fa-solid fa-file-lines',
      href: './botadero.component.html'

    },
    {
      number: '3',
      name: 'Administración',
      icon: 'fa-solid fa-user-tie',
      href: './botadero.component.html'

    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
