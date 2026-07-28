import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-viewer',
  imports: [],
  templateUrl: './video-viewer.component.html',
  styleUrl: './video-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoViewerComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) videoUrl!: string;
  @Input() title = '';

  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
