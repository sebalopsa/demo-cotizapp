import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment"

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'app-proyectos-new',
  templateUrl: './proyectos-new.component.html',
  styleUrls: ['./proyectos-new.component.css']
})
export class ProyectosNewComponent implements OnInit {
  // url = environment.proyectosUrl;
  loading = true;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;

    }, 1000);
  }


}
