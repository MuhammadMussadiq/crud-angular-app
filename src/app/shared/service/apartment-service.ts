import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Apartment } from '../model/apartment';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppartmentService {


    constructor(private httpClient: HttpClient) { }

    save(apartment: Apartment): Observable<any> {

        let formData: FormData = new FormData();
        let alreadyExistingPhotoIds = [];
        apartment.photos.forEach((photo) => {
            if (photo.id) {
                // let blob = new File([photo.fileBytes], photo.name, { type: photo.mimeType });
                // formData.append("photos", blob);
                alreadyExistingPhotoIds.push(photo.id);

            } else {
                formData.append("photos", photo.fileBytes);
            }
            // formData.append("photos", photo.fileBytes);
        });

        let documentDTO = JSON.stringify({ "id": apartment.id, "address": apartment.address, "noOfRooms": apartment.noOfRooms, "description": apartment.description, "previousIds": alreadyExistingPhotoIds });

        formData.append("metaData", new Blob([documentDTO], {
            type: "application/json"
        }));

        return this.httpClient
            .post(environment.baseUrl + '/apartment/save', formData, { observe: 'response' });

    }

    fetchApartments(): Observable<Apartment[]> {
        return this.httpClient.get<Apartment[]>(environment.baseUrl + "/apartment/list")
            .pipe(
                map(apartments => {
                    if (apartments) {
                        return apartments.map(apartment => {
                            return { ...apartment, thumnailPhoto: "data:image/png;base64," + (apartment.photos.length > 0 ? apartment.photos[0].fileBytes : '') };
                        });
                    } else {
                        return [];
                    }
                })
            );
    }

    fetchApartmentById(id: number): Observable<Apartment> {
        return this.httpClient.get<Apartment>(environment.baseUrl + "/apartment/" + id);
    }

    deleteAparment(id: any) {
        return this.httpClient.delete(environment.baseUrl + "/apartment/" + id, { observe: 'response' });
    }
}