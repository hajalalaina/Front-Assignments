import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FeatherModule } from 'angular-feather';
import { Briefcase,BookOpen,User,Home,List,LogIn,LogOut,PlusCircle,Book,Edit2,Clock} from 'angular-feather/icons';
const icons = {
  Briefcase,
  Home,
  List,
  LogIn,
  PlusCircle,
  Book,
  Edit2,
  LogOut,
  Clock,
  User,
  BookOpen
};


@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
