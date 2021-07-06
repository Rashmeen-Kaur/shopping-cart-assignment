import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  banners: Banner[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getBanners();
  }

  getBanners() {
    this.dataService.fetchBanners().subscribe(
      data => ( this.banners = data ),
      error => ( this.banners = [] )
    );
  }

 
}
