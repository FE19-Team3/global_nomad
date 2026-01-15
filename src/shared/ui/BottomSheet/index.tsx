import { BottomSheet } from './BottomSheet';
import { BottomSheetContent } from './BottomSheetContent';
import { BottomSheetFooter } from './BottomSheetFooter';
import { BottomSheetHeader } from './BottomSheetHeader';

export default Object.assign(BottomSheet, {
  Content: BottomSheetContent,
  Header: BottomSheetHeader,
  Footer: BottomSheetFooter,
});

export { BottomSheetContent, BottomSheetHeader, BottomSheetFooter };
