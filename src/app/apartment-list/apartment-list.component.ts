import { Component, OnInit } from '@angular/core';
import { AppartmentService } from '../shared/service/apartment-service';
import { Apartment } from '../shared/model/apartment';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {

  apartments: Apartment[];
  pageOfItems: Array<any>;
  pageSize = 3;
  searchText:any;

  constructor(private apartmentService: AppartmentService) { }


  ngOnInit() {
    this.fetchApartments();
  }

  deleteApartment(id) {
      this.apartmentService.deleteAparment(id)
      .subscribe(response => {
        if(response.status === 200) {
          this.fetchApartments();
        } else {
          console.error("ERROR!" + JSON.stringify(response))
        }
      });
  }

  fetchApartments() {
    this.apartmentService.fetchApartments()
      .subscribe((apartments) => {
        console.log(apartments);
        this.apartments = apartments;
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}
}
