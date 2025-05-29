import type { DrawerId } from '../../constants/drawer-id';

export interface DrawerContextType {
  drawerId: string | null;
  openDrawer: <Data extends object>(drawerId: DrawerId, data?: Data) => Promise<void>;
  closeDrawer: () => void;
}
