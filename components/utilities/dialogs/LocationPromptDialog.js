import * as React from 'react';
import ConfirmationDialog from './ConfirmationDialog';

/**
 * @todo Handle location permissions
 */
export default function LocationPromptDialog({ open }) {
  return (
    <ConfirmationDialog
      open={open}
      title={"Use Google's location service?"}
      text={`Let Google help apps determine location. This means sending
    anonymous location data to Google, even when no apps are running.`}
    />
  );
}
