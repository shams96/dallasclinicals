import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sponsors from './Sponsors';

describe('Sponsors Page', () => {
  it('renders the main heading', () => {
    render(<Sponsors />);
    expect(screen.getByText('The DFW Sponsor Portal')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<Sponsors />);
    expect(screen.getByText(/Company \/ CRO/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Protocol Details \/ Message/i)).toBeInTheDocument();
  });

  it('submits the form and shows success message', async () => {
    render(<Sponsors />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Pharma Corp/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/jane@pharmacorp.com/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Brief description/i), { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit Inquiry to Director/i }));

    // Check for success message
    expect(await screen.findByText(/Inquiry Received/i, {}, { timeout: 2000 })).toBeInTheDocument();
  });
});
