/**
 * Schedule Visit Modal Component
 * MUI Modal with date picker and time slots (10 AM - 10 PM)
 */

'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Generate time slots from 10 AM to 10 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour <= 21; hour++) {
    const startHour = hour;
    const endHour = hour + 1;
    const startTime = startHour > 12 ? `${startHour - 12}:00 PM` : `${startHour}:00 ${startHour === 12 ? 'PM' : 'AM'}`;
    const endTime = endHour > 12 ? `${endHour - 12}:00 PM` : `${endHour}:00 ${endHour === 12 ? 'PM' : 'AM'}`;
    slots.push({
      value: `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`,
      label: `${startTime} - ${endTime}`,
      disabled: false, // Will be used later for availability
    });
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Generate next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date,
      dayName: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      value: date.toISOString().split('T')[0],
    });
  }
  return dates;
};

export function ScheduleVisitModal({ propertyId, propertyTitle, onClose }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dates = generateDates();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      console.log('Scheduling visit:', { propertyId, selectedDate, selectedTime, notes });
      alert(`Visit scheduled for ${selectedDate} at ${selectedTime}`);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="schedule-visit-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 'calc(100vw - 32px)', sm: 500 },
          maxWidth: '100vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          overflow: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Schedule a Visit
            </Typography>
            {propertyTitle && (
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {propertyTitle}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Date Selection */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Select Date
              </Typography>
            </Stack>
            <Box sx={{ overflowX: 'auto', pb: 1, mx: -0.5 }}>
            <Stack direction="row" spacing={1} sx={{ width: 'max-content', px: 0.5 }}>
              {dates.map((d) => (
                <Box
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  sx={{
                    minWidth: 62,
                    p: 1,
                    flexShrink: 0,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: selectedDate === d.value ? 'primary.main' : 'grey.300',
                    bgcolor: selectedDate === d.value ? 'primary.50' : 'white',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Typography variant="caption" color="grey.600">
                    {d.dayName}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {d.dayNum}
                  </Typography>
                  <Typography variant="caption" color="grey.600">
                    {d.month}
                  </Typography>
                </Box>
              ))}
            </Stack>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Time Selection */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Select Time Slot
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 1,
              }}
            >
              {timeSlots.map((slot) => (
                <Chip
                  key={slot.value}
                  label={slot.label}
                  onClick={() => !slot.disabled && setSelectedTime(slot.value)}
                  disabled={slot.disabled}
                  sx={{
                    height: 40,
                    fontSize: '0.8rem',
                    bgcolor: selectedTime === slot.value ? 'primary.main' : 'grey.100',
                    color: selectedTime === slot.value ? 'white' : 'text.primary',
                    border: '1px solid',
                    borderColor: selectedTime === slot.value ? 'primary.main' : 'grey.300',
                    '&:hover': {
                      bgcolor: selectedTime === slot.value ? 'primary.dark' : 'grey.200',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'grey.100',
                      color: 'grey.400',
                      textDecoration: 'line-through',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Notes */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Additional Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Any special requests or questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              size="small"
            />
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={onClose}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedDate || !selectedTime}
              fullWidth
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              {isSubmitting ? 'Scheduling...' : 'Confirm Visit'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
