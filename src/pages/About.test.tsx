import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';

describe('About Us Page', () => {
  it('renders the main heading', () => {
    render(<About />);
    expect(screen.getByText('About Dallas Clinicals')).toBeInTheDocument();
  });

  it('renders the mission statement', () => {
    render(<About />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText(/To accelerate the development of life-saving therapies/i)).toBeInTheDocument();
  });

  it('renders leadership information', () => {
    render(<About />);
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Hassan Farooq, MD')).toBeInTheDocument();
    expect(screen.getByText('Shams Islam')).toBeInTheDocument();
  });
});
