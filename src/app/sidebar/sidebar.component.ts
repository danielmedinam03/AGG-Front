import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      href: '/certificaciones'

    },
    {
      number: '2',
      name: 'Reportes',
      icon: 'fa-solid fa-file-lines',
      href: '/reportes'

    },
    {
      number: '3',
      name: 'Administración',
      icon: 'fa-solid fa-user-tie',
      href: '/botadero'

    }
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
