import { Component, OnInit } from '@angular/core';
import { AppartmentService } from '../shared/service/apartment-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Photo } from '../shared/model/photo';
import { Apartment } from '../shared/model/apartment';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: Apartment;
  noDataFoundMsg: string;
  photos: string[];

  constructor(private apartmentService: AppartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apartment = new Apartment(null, null, null, null, null);
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const appartmentId = +params['id'];
        this.fetchApartmentDetail(appartmentId);
      });
  }

  fetchApartmentDetail(appartmentId: number) {
    this.apartmentService.fetchApartmentById(appartmentId)
      .subscribe(apartment => {
        if (apartment) {
          console.log(apartment);
          this.apartment = apartment;
          this.photos = this.getBase64Photos(apartment.photos);
          console.log(this.apartment);
          console.log(this.photos);
        } else {
          this.noDataFoundMsg = "No data Found against given ID: " + appartmentId;
        }
      })
  }
  getBase64Photos(photos: Photo[]) {
    return photos.map(photo => {
      return "data:image/png;base64," + photo.fileBytes;
    });
  }

  // onFileChanged(event) {
  //   Array.from(event.target.files)
  //     .forEach((file: any) => {
  //       let reader = new FileReader();
  //       reader.onload = (e: any) => { this.imgURLs.push(e.target.result); }
  //       reader.readAsDataURL(file);
  //     });
  // }
}
