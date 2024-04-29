import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpHandler,
	HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	private requests: HttpRequest<any>[] = [];

	constructor(
		private router: Router,
		private commonService: CommonService
	) { }

	/**
	 * 
	 * @param req - parameter to handle http request
	 * @param next - parameter for http handler
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.requests.push(req);
		this.commonService.toggleLoading(true);

		return Observable.create((observer: any) => {
			const subscription = next.handle(req)
				.subscribe(
					event => {
						if (event instanceof HttpResponse) {
							this.removeRequest(req);
							observer.next(event);
						}
					},
					err => {
						this.removeRequest(req);
						observer.error(err);
					},
					() => { this.removeRequest(req); observer.complete(); });
			// teardown logic in case of cancelled requests
			return () => {
				this.removeRequest(req);
				subscription.unsubscribe();
			};
		});
	}

	/**
	 * This method is use to check whether request are running or not
	 * @param req - Http request
	 */
	removeRequest(req: HttpRequest<any>) {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
		}
		this.commonService.toggleLoading(this.requests.length > 0);
	}


}