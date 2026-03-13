import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef("");
  listObservers$: Array<Subscription> = [];
  state:string = "paused";
  constructor(public multimediaService: MultimediaService) { }


  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status);

    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(observer => observer.unsubscribe());
  }

  handlePosition(event: MouseEvent): void{
    const {clientX} = event;
    const {offsetWidth} = this.progressBar.nativeElement;
    const clickX = clientX - this.progressBar.nativeElement.getBoundingClientRect().left;
    const percentageFromClick = clickX / offsetWidth;
    const percentageToSeconds = this.multimediaService.audio.duration * percentageFromClick;
    this.multimediaService.audio.currentTime = percentageToSeconds;
  }

}
