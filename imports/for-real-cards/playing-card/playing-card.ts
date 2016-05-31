/**
 * Created by kenono on 2016-05-06.
 */

import {Meteor} from 'meteor/meteor';
import { Component, Input } from '@angular/core';
import {Card} from '../api/models/card.model'
import {CardImageStyle} from "../api/interfaces/card-image-style.interface";

@Component(
  {
    selector: 'playing-card',
    template:
`
<img 
  [src]="imageURL()"
  [ngStyle]="imgStyle"
  [alt]="encodedCardId()"
  [attr.data-card-rank]="card?.rank"
  [attr.data-card-suit]="card?.suit"
/>
`
})
export class PlayingCard {
  @Input() private card:Card;
  @Input() imgStyle:CardImageStyle;
  imageURL():string {
    if (this.card) {
//      return Meteor.absoluteUrl() + "decks/standard2/" + this.card.encode() + ".svg#svgView(preserveAspectRatio(none))";
      return Meteor.absoluteUrl() + "decks/default/" + this.card.encode() + ".jpg";
    }
  }
  encodedCardId():string {
    if (this.card)
      return this.card.encode();
    return "no card defined";
  }
}