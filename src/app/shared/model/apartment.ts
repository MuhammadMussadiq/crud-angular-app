import { Photo } from './photo';

export class Apartment {
    constructor(public id: number,
        public address: string,
        public noOfRooms: number,
        public description: string,
        public photos: Photo[]) {

    }
}