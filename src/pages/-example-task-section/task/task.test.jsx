import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Task } from './task';

// Mock react-router-dom to simulate URL parameters
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '2' })
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn()
  }
}));

describe('Task Component Integration Tests', () => {
  it('should mount', async () => {
    render(<Task />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('should load data and display with option text on form', async () => {
    render(<Task />); //url: /dev/tasks/2 set in mockNavigate

    // First wait for loading to disappear and Task title to appear
    await waitFor(() => {
      expect(screen.getByText('Task')).toBeVisible();
    }, { timeout: 5000 });

    expect(screen.getByDisplayValue('Subject b')).toBeInTheDocument();
    expect(screen.getByDisplayValue('in progress')).toBeInTheDocument();
  });

  it('should call taskUpsert when continue button is clicked', async () => {
    // Import the store to spy on taskUpsert
    const { store } = await import('../../../store');
    const taskUpsertSpy = vi.spyOn(store.getState(), 'taskUpsert');
    
    render(<Task />);
    
    // Wait for form to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Subject b')).toBeInTheDocument();
    });
    
    // Find and click the continue button
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    
    await userEvent.click(continueButton);
    
    // Verify that taskUpsert was called
    await waitFor(() => {
      expect(taskUpsertSpy).toHaveBeenCalled();
    });
    
    // Clean up the spy
    taskUpsertSpy.mockRestore();
  });
/*  

  it('should show validation message for empty subject and not call onSubmit', async () => {
    render(<Task />);
    
    // Wait for form to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('subject a')).toBeInTheDocument();
    });
    
    // Clear the subject field
    const subjectInput = screen.getByDisplayValue('subject a');
    await userEvent.clear(subjectInput);
    
    // Try to submit the form
    const continueButton = screen.getByText('Continue');
    await userEvent.click(continueButton);
    
    // Verify validation message appears
    await waitFor(() => {
      expect(screen.getByText('please provide a subject')).toBeInTheDocument();
    });
    
    // Verify the toast with form data is NOT shown due to validation failure
    expect(screen.queryByText('Submit clicked')).not.toBeInTheDocument();
  });
  */
}); 