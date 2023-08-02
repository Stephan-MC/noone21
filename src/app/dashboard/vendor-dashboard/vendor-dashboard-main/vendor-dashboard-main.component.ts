import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-vendor-dashboard-main',
  templateUrl: './vendor-dashboard-main.component.html',
  styleUrls: ['./vendor-dashboard-main.component.scss']
})
export class VendorDashboardMainComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
