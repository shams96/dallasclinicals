import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Locations from './Locations';

describe('Locations Page', () => {
  it('renders the main heading', () => {
    render(<Locations />);
    expect(screen.getByText('Our Locations')).toBeInTheDocument();
  });

  it('renders both facility locations', () => {
    render(<Locations />);
    expect(screen.getByText('Plano Facility')).toBeInTheDocument();
    expect(screen.getByText('Greenville Facility')).toBeInTheDocument();
  });

  it('renders contact information for facilities', () => {
    render(<Locations />);
    expect(screen.getByText('Collin County')).toBeInTheDocument();
    expect(screen.getByText('Hunt County')).toBeInTheDocument();
    expect(screen.getAllByText(/Mon-Fri:/i).length).toBe(2);
  });
});
