import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Patients from './Patients';

describe('Patients Page', () => {
  it('renders the main heading', () => {
    render(<Patients />);
    expect(screen.getByText('The Patient Experience')).toBeInTheDocument();
  });

  it('renders the Trust & Safety section', () => {
    render(<Patients />);
    expect(screen.getByText('A Culture of Responsibility')).toBeInTheDocument();
  });

  it('renders all clinical trial phases', () => {
    render(<Patients />);
    expect(screen.getByText('Phase I')).toBeInTheDocument();
    expect(screen.getByText('Phase II')).toBeInTheDocument();
    expect(screen.getByText('Phase III')).toBeInTheDocument();
    expect(screen.getByText('Phase IV')).toBeInTheDocument();
  });
});
