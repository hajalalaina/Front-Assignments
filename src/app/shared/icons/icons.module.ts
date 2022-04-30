import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Book,
  BookOpen,
  Briefcase,
  CheckSquare,
  Clock,
  Edit,
  Edit2,
  Home,
  List,
  LogIn,
  LogOut,
  PlusCircle,
  Trash2,
  User,
} from 'angular-feather/icons';

const icons = {
  Briefcase,
  Home,
  Edit,
  List,
  LogIn,
  PlusCircle,
  Book,
  Edit2,
  LogOut,
  Clock,
  User,
  BookOpen,
  CheckSquare,
  Trash2,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
