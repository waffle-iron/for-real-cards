/**
 * Copyright Ken Ono, Fabrica Technolology 2016
 * Source code license under Creative Commons - Attribution-NonCommercial 2.0 Canada (CC BY-NC 2.0 CA)
 */
import { Component } from '@angular/core';
import * as log from 'loglevel';

import {AccountTools, Credentials, ConnectEvent, ConnectEventType, PlatformTools, UserEvent, UserEventType} from "common-app";

@Component({
  templateUrl: '/imports/for-real-cards/start/start.' + PlatformTools.platformNameSegment() + '.html'
})
export class Start {
  message:string;
  credentials:Credentials;
  active:boolean = true;

  ngOnInit() {
    this.credentials = Credentials.getLastCredentials();
    log.debug("in ngOnInit() of Start")
    ConnectEvent.subscribe(
      (event:ConnectEvent)=>{
        if (event.eventType===ConnectEventType.CONNECTION_ATTEMPT && event.retryCount>1)
          this.message = event.message;
        else if (event.eventType===ConnectEventType.CONNECT_SUCCESS)
          this.message = "";
        else if (event.eventType===ConnectEventType.USER_LOGIN) {
          log.debug("ConnectEventType.USER_LOGIN event detected, pushing login event");
          UserEvent.pushEvent(new UserEvent(UserEventType.LOGIN, {userId: Meteor.userId()})); // Will cause navigation
        }
      }
    );
    ConnectEvent.checkConnection();

  }
  ngOnDestroy() {
    ConnectEvent.stopCheckingConnection();
  }

  ngAfterContentInit() {
    this.reset();
  }
  
  private reset() {
    this.active = false;  // Forces reset as per https://angular.io/docs/ts/latest/guide/forms.html
                          // This is a temporary workaround while we await a proper form reset feature.
    setTimeout(()=> this.active=true, 0);
  }

  login() {
    AccountTools.login(this.credentials).then(
      (user)=>{
        // Login event will cause navigation to enter screen
      }, (error)=> {
        this.message = error.message;
      }
    );
  }

  register() {
    AccountTools.register(this.credentials).then(
      (user)=>{
        // Login event will cause navigation to enter screen
      }, (error)=>{
        this.message = error.message;
      }
    );
  }

  tempUser() {
    AccountTools.createTempUser().then(
      (user)=>{
        // Login event will cause navigation to enter screen
      }, (error)=>{
        this.message = error.message;
      }
    );
  }

  setServer() {
    ConnectEvent.setServer();
  }
} 