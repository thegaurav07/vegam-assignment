import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { User } from '@/types';

interface Props {
  user: User;
  onToggleStatus: (userId: string, status: 'active' | 'inactive') => void;
  isUpdating: boolean;
}

export const UserActions: React.FC<Props> = ({
  user,
  onToggleStatus,
  isUpdating,
}) => {
  const [open, setOpen] = useState(false);

  const isActive = user.status === 'active';

  const handleConfirm = () => {
    onToggleStatus(user.userId, isActive ? 'inactive' : 'active');
    setOpen(false);
  };

  return (
    <>
      <IconButton
        disabled={isUpdating}
        color={isActive ? 'error' : 'success'}
        onClick={() => (isActive ? setOpen(true) : handleConfirm())}
      >
        {isActive ? <CancelIcon /> : <CheckCircleIcon />}
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Deactivate User</DialogTitle>
        <DialogContent>
          Are you sure you want to deactivate <b>{user.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirm}>
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
