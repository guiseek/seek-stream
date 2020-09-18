#!/bin/bash

ng generate @schematics/angular:component --name=components/search --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/player --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/player/buttons --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/player-mini --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/room --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/playlist --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/related --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/settings --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/video-item --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/youtube-iframe --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/modal --project=player --style=scss --displayBlock --export --no-interactive
ng generate @schematics/angular:component --name=components/category --project=player --style=scss --displayBlock --export --no-interactive
