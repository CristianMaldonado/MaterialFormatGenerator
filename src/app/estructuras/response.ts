import { ResponseRowset } from './responseRowset';
import { MapValues } from './map.values';

export class ResponseStruct {
    idResponse: string;
    responseClassName: string;
    data: MapValues[];
    tieneRowset: boolean = false;
    rowset: ResponseRowset;
}