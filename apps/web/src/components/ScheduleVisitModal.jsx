/**
 * Schedule Visit Modal Component
 */

'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { visitAPI } from '@/services/api/client';
import { Button } from '@rent-lessly/ui';

export function ScheduleVisitModal({ propertyId, onClose }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    visitDate: '',
    timeSlot: '09:00-10:00',
    notes: '',
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      visitAPI.scheduleVisit({ propertyId, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      alert('Visit scheduled successfully!');
      onClose();
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to schedule visit');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm w-full max-w-md mx-4 p-6">
        <h2 className="text-2xl font-bold mb-6">Schedule a Visit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Visit Date</label>
            <input
              type="date"
              required
              value={formData.visitDate}
              onChange={(e) =>
                setFormData({ ...formData, visitDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Slot</label>
            <select
              value={formData.timeSlot}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-sm"
            >
              <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
              <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
              <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
              <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
              <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-sm"
              rows="3"
              placeholder="Any special requests..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={mutation.isPending}
              type="submit"
            >
              {mutation.isPending ? 'Scheduling...' : 'Schedule'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
