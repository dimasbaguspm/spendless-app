import type { DrawerId } from '../../constants/drawer-id';

export interface DrawerContextType {
  drawerId: string | null;
  openDrawer: (drawerId: DrawerId) => void;
  closeDrawer: () => void;
}
