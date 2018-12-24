import { Injectable } from '@angular/core';
import { ResponseStruct } from '../estructuras/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStruct } from '../estructuras/request';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    //request
    observerRequest: BehaviorSubject<RequestStruct> = new BehaviorSubject<RequestStruct>(new RequestStruct());
    //response
    observerResponse: BehaviorSubject<ResponseStruct> = new BehaviorSubject<ResponseStruct>(new ResponseStruct());
    //Modal
    observerModalWarning: BehaviorSubject<string> = new BehaviorSubject<string>('');

    //request
    getRequest(): Observable<RequestStruct> {
        return this.observerRequest.asObservable();
    }

    notificarRequest(request: RequestStruct): void {
        this.observerRequest.next(request);
    }
    
    //response
    getResponse(): Observable<ResponseStruct> {
        return this.observerResponse.asObservable();
    }
    
    notificarResponse(response: ResponseStruct): void {
        this.observerResponse.next(response);
    }

    //Modal
    getModalWarning(): Observable<string> {
        return this.observerModalWarning.asObservable();
    }

    notificarModalWarning(warning: string): void {
        this.observerModalWarning.next(warning);
    }
}