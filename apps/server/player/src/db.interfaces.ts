export interface DB {
  sessions: { [key: string]: DBSession }[];
}

export interface DBSession {
  playlist: DBPlaylist[];
  player: any[];
}

export interface DBPlaylist {
  id: string;
  title: string;
  channelTitle: string;
  channelId: string;
  categoryId: string;
  stats: DBStats;
  thumbnails: DBThumbnails;
}

export interface DBStats {
  likes: string;
  dislikes: string;
  views: string;
}

export interface DBThumbnails {
  default: string;
  high: string;
  medium: string;
}
