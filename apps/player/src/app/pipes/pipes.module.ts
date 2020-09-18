import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortNumPipe } from './short-num.pipe';

@NgModule({
  declarations: [ShortNumPipe],
  imports: [CommonModule],
  exports: [ShortNumPipe],
})
export class PipesModule {}
