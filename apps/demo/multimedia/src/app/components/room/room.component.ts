import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { NotifyService } from '../../services/notify.service';
import { GlobalsService } from '../../services/globals.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { SharedService } from '../../services/shared.service';
import { RoomService } from '../../services/room.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoomComponent implements OnInit {
  modalID = 'room-modal';
  sessionKeyInput: any;
  clientNameInput: any;

  showGuests = false;

  constructor(
    private notify: NotifyService,
    public globals: GlobalsService,
    private session: SessionManagerService,
    private shared: SharedService,
    public room: RoomService,
    public modal: ModalService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.socket.on('username_changed', ({ name, clients }) => {
      this.globals.clients = clients;
      this.shared.updateClientName(name);
      this.notify.triggerNotify(37);
      this.clientNameInput = '';
      this.modal.close(this.modalID);
    });

    this.socket.on('download_playlist', (data) => {
      this.globals.playlistVideos =
        data[this.globals.getCurrentSessionKeys().tempSession].playlist;
      this.shared.findPlaylistItem();
    });

    this.socket.on('user_left', ({ name, clients }) => {
      this.globals.clients = clients;
      if (name !== localStorage.getItem('clientName')) {
        this.notify.triggerNotify(31);
      }
    });

    this.socket.on('user_joined', ({ name, clients }) => {
      this.globals.clients = clients;
      if (name !== localStorage.getItem('clientName')) {
        this.notify.triggerNotify(30);
      }
    });
  }

  toggleGuests() {
    this.showGuests = !this.showGuests;
  }

  leave() {
    this.socket.emit(
      'leave_session',
      this.globals.getCurrentSessionKeys().tempSession
    );
    this.globals.sessionValue = localStorage.getItem('session_key');
    this.sessionKeyInput = '';
    this.globals.isTempSessionActive = false;
    this.room.join();
  }

  updateName() {
    if (this.clientNameInput) {
      this.clientNameInput = this.clientNameInput.trim();
      this.socket.emit('change_username', { name: this.clientNameInput });
    }
  }

  updateRoom() {
    if (this.sessionKeyInput) {
      this.sessionKeyInput = this.sessionKeyInput.trim();
      this.room.leave();

      // If the session is not the same as the host
      if (
        this.sessionKeyInput === localStorage.getItem('session_key') ||
        this.sessionKeyInput === ''
      ) {
        this.globals.isTempSessionActive = false;
      } else {
        this.globals.isTempSessionActive = true;
        this.globals.sessionValue = this.sessionKeyInput;
      }

      this.room.join();
      this.modal.close(this.modalID);
      this.notify.triggerNotify(34);
    }
  }

  updateSession() {
    this.session.updateSession('playlist', this.globals.playlistVideos);
    this.notify.triggerNotify(2);
  }
}
