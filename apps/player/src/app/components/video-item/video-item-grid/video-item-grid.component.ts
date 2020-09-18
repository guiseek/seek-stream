import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { VideoModel } from '@seek-stream/core-entities';
import { GlobalsService } from '../../../services/globals.service';

@Component({
	selector: 'app-video-item-grid',
	templateUrl: './video-item-grid.component.html',
	styleUrls: ['./video-item-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class VideoItemGridComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
	@Input() listID: number;
	@Input() callBack = () => {};

	constructor(public globals: GlobalsService) { }

	ngOnInit() {
	}

}
