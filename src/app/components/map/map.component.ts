import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ LeafletModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent  {


  public options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '...' })
    ],
    zoom: 17,
    center: Leaflet.latLng(38.95605332297384, -77.14795980908717)
  };
  public layers = [
    Leaflet.circle([ 38.95605332297384, -77.14795980908717 ], { radius: 100 }),
    Leaflet.marker([ 38.95605332297384, -77.14795980908717 ])
  ];

}
