import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apartment } from '../shared/model/apartment';
import { Photo } from '../shared/model/photo';
import { AppartmentService } from '../shared/service/apartment-service';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-apartment-add',
  templateUrl: './apartment-add.component.html',
  styleUrls: ['./apartment-add.component.css']
})
export class ApartmentAddComponent implements OnInit {

  apartmentForm: FormGroup;
  editMode: boolean = false;
  photos: Photo[] = [];
  // successMsg: string;
  errors: [];
  appartmentId: number;
  noDataFoundMsg: string;
  btnText: string = "Save";
  removedExistingPhotoIds: number[] = [] ;

  constructor(private apartmentService: AppartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.appartmentId = +params['id'];
        this.editMode = params['id'] ? true : false;
      });

    this.initForm();
  }

  initForm() {
    let apartment = new Apartment(null, null, null, null, null);
    this.prepareFormGroup(apartment);

    if (this.editMode) {
      this.btnText = "Update"
      this.apartmentService.fetchApartmentById(this.appartmentId)
        .subscribe(result => {
          if (result) {
            apartment = result;
            this.photos = apartment.photos;
            this.apartmentForm.patchValue(apartment);
            // this.setDataToForm(apartment);
          } else {
            this.noDataFoundMsg = "No Apartment found against provided ID: " + this.appartmentId;
          }
        });
    }
  }

  setDataToForm(apartment) {
    this.apartmentForm.setValue(apartment);
  }
  prepareFormGroup(apartment: Apartment) {
    if (apartment) {
      this.apartmentForm = new FormGroup({
        'id': new FormControl(apartment.id),
        'address': new FormControl(apartment.address, Validators.required),
        'description': new FormControl(apartment.description, [Validators.required, Validators.minLength(150)]),
        'noOfRooms': new FormControl(apartment.noOfRooms, [Validators.required, Validators.min(1)]),
      });
    }
  }


  get controls(): any {
    return this.apartmentForm['controls'];
  }

  onFileChanged(event) {
    Array.from(event.target.files)
      .forEach((file: any) => {
        this.photos.push(new Photo(null, file.type, file.name, file))
      });
    event.target.value = "";
  }

  removeFile(index: number, photoId: number) {
    this.photos.splice(index, 1);
    if(this.editMode){
      this.removedExistingPhotoIds.push(photoId); 
    }
    console.log("deleted");
  }
  resetErrorAlert() {
    this.errors = [];
  }
  onSubmit() {

    let apartment = new Apartment(null, this.apartmentForm.value['address'],
      this.apartmentForm.value['noOfRooms'],
      this.apartmentForm.value['description'],
      this.photos);

    this.resetErrorAlert();

    if (this.editMode) {
      apartment.id = this.apartmentForm.value['id'];
    }
    this.apartmentService.save(apartment)
      .pipe(
        catchError(errorResponse => {
          console.log(errorResponse);
          if (errorResponse.status === 400) {
            this.errors = errorResponse.error.message;
          }
          return throwError(errorResponse);
        })
      ).subscribe((response) => {
        if (response.status === 201) {
          alert("Apartment saved successfully");
        } else if (response.status === 204) {
          alert("Apartment updated successfully");
        }
        this.router.navigate(["/list"]);
      });

  }

  onCancel() {
    this.router.navigate(["/list"]);
  }

}
