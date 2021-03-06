import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getToken } from "../store/state/auth.state";
import { first, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private store$: Store,
  ) {
  }
  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
        select(getToken),
        first(),
        mergeMap( (token) => {
          const authRequest = token ? request.clone({
            setHeaders: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Authorization: token,
            }
          }) : request;

          return next.handle(authRequest);
        }),
    );
  }
}
